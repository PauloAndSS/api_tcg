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
}

export default new UserController();