import Cards from '../models/CardsModel.js';

class CardService {
    async createCard(cardData) {
        const tiposPermitidos = ['criatura', 'magia', 'campo', 'armadilha'];
        try {
            if (!cardData.nome || !cardData.descricao || !cardData.tipo || !cardData.custo || !cardData.cores || !cardData.efeitos) {
                throw new Error('Todos os campos são obrigatórios.');
            } else if (await Cards.findOne({ nome: cardData.nome })) {
                throw new Error('Card já cadastrado!');
            } else if (!tiposPermitidos.includes(cardData.tipo.toLowerCase())) {
                throw new Error('Tipo de carta inválido. Use: criatura, magia, campo ou armadilha.');
            } else {
                const newCard = await Cards.create(cardData);
                return newCard;
            }
        } catch (err) {
            throw new Error(`Erro ao criar o card: ${err.message}`);
        }
    }
}

export default new CardService();