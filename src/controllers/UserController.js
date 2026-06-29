import Users from '../models/UsersModel.js';
import UserService from '../services/UserService.js';

class UserController {
    async create(req, res) {
        try {
            const user = req.body;
            const newUser = await UserService.createUser(user);
            res.status(201).json(newUser);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            let { page = 1, limit = 20 } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);

            let query = Users.find().select('nome ranking -_id');

            if (limit > 0) {
                const skip = (page - 1) * limit;
                query = query.skip(skip).limit(limit);
            }

            const users = await query.exec();
            const total = await Users.countDocuments();

            res.status(200).json({
                total,
                page,
                limit,
                data: users
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const user = await UserService.loginUser(email, senha);

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                user
            });
        } catch (err) {
            // Retorna 401 para erros de autenticação e 500 para erros internos
            const statusCode = err.message === 'Usuário ou senha inválidos.' ? 401 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }

    async update(req, res) {
        try {
            const userId = req.body.id;
            const updateData = req.body;

            const user = await Users.findById(userId);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }
            if (updateData.senhaAtual) {
                const isMatch = await UserService.loginUser(user.email, updateData.senhaAtual);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Senha atual incorreta.' });
                } else {
                    if (updateData.senha && updateData.senha.length < 6) {
                        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres.' });
                    }else if (updateData.senha) {
                        const saltRounds = 10;
                        const hashedPassword = await bcrypt.hash(updateData.senha, saltRounds);
                        updateData.senha = hashedPassword;
                    }

                    if (updateData.nome) {
                        const existingUserByName = await Users.findOne({ nome: updateData.nome });
                        if (existingUserByName && existingUserByName._id.toString() !== userId) {
                            return res.status(400).json({ error: 'Nome de usuário já em uso!' });
                        }
                    }

                    if (updateData.email) {
                        const existingUserByEmail = await Users.findOne({ email: updateData.email });
                        if (existingUserByEmail && existingUserByEmail._id.toString() !== userId) {
                            return res.status(400).json({ error: 'Email já em uso!' });
                        }
                    }
                    await user.save();

                    res.status(200).json({ message: 'Usuário atualizado com sucesso.', user });
                }
            } else {
                return res.status(400).json({ error: 'Senha atual é obrigatória para atualização.' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getRanking(req, res) {
        try {
            const ranking = await UserService.getUserRanking();
            res.status(200).json(ranking);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new UserController();