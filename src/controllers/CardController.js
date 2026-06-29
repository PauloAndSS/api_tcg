import Cards from '../models/CardsModel.js';
import CardService from '../services/CardService.js';

class CardController {
    async create(req, res) {
        try {
            const card = req.body;
            const newCard = await CardService.createCard(card);
            res.status(201).json(newCard);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const cardId = req.params.id;
            const deletedCard = await Cards.findByIdAndDelete(cardId);

            if (!deletedCard) {
                return res.status(404).json({ error: 'Card não encontrado.' });
            } else {
                res.status(200).json({ message: 'Card deletado com sucesso.' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getAll(req, res) {
        try {
            let { page = 1, limit = 20 } = req.query;

            page = parseInt(page);
            limit = parseInt(limit);

            let query = Cards.find().select('nome tipo custo cores efeitos');

            if (limit > 0) {
                const skip = (page - 1) * limit;
                query = query.skip(skip).limit(limit);
            }

            const cards = await query.exec();
            const total = await Cards.countDocuments();

            res.status(200).json({
                total,
                page,
                limit,
                data: cards
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const cardId = req.params.id;
            const card = await Cards.findById(cardId).select('nome tipo custo cores efeitos');

            if (!card) {
                return res.status(404).json({ error: 'Card não encontrado.' });
            } else {
                res.status(200).json(card);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CardController();