import Users from '../models/UsersModel.js';
import bcrypt from 'bcrypt';

class UserService {
    async createUser(userData) {
        const { nome, email, senha } = userData;

        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios.');
        } else if (await Users.findOne({ email })) {
            throw new Error('Usuário já cadastrado!');
        } else if (await Users.findOne({ nome })) {
            throw new Error('Nome de usuário já em uso!');
        } else if (senha.length < 6) {
            throw new Error('A senha deve ter pelo menos 6 caracteres.');
        } else {
            const saltRounds = 10;
            //Criptografando a senha do usuário antes de salvar no banco de dados
            const hashedPassword = await bcrypt.hash(senha, saltRounds);
            //Salvando o usuário no banco de dados com a senha criptografada e apenas o necessário (nome, email e senha)
            const newUser = await Users.create({
                nome,
                email,
                senha: hashedPassword
            });

            return newUser;
        }
    }

    async loginUser(email, senha) {
        const user = await Users.findOne({ email }).select('+senha');

        if (!user) {
            throw new Error('Usuário ou senha inválidos.');
        }
        
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            throw new Error('Usuário ou senha inválidos.');
        }else{
            const userResponse = user.toObject();
            delete userResponse.senha;
            return userResponse;
        }
    }
}

export default new UserService();