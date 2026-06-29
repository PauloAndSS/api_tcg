import Deck from '../models/DecksModel.js';
import DeckService from '../services/DeckService.js';

class DeckController {
    async create(req, res) {
        try {
            const deck = req.body;
            const newDeck = await DeckService.createDeck(deck);
            res.status(201).json(newDeck);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const deckId = req.params.id;
            const deletedDeck = await Deck.findByIdAndDelete(deckId);

            if (!deletedDeck) {
                return res.status(404).json({ error: 'Deck não encontrado.' });
            } else {
                res.status(200).json({ message: 'Deck deletado com sucesso.' });
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

            let query = Deck.find()
                .populate('cartas', 'nome tipo custo cores efeitos')
                .populate('player', 'nome -_id')
                .select('nome descricao cartas player');

            if (limit > 0) {
                const skip = (page - 1) * limit;
                query = query.skip(skip).limit(limit);
            }

            const decks = await query.exec();

            const total = await Deck.countDocuments();

            res.status(200).json({
                total,
                page,
                limit,
                data: decks
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const deckId = req.params.id;
            const deck = await Deck.findById(deckId).select('nome descricao cartas');

            if (!deck) {
                return res.status(404).json({ error: 'Deck não encontrado.' });
            } else {
                res.status(200).json(deck);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    async getByPlayer(req, res) {
        try {
            const playerId = req.params.playerId;
            const decks = await Deck.find({ player: playerId })
                .populate('cartas', 'nome tipo custo cores efeitos')
                .select('nome descricao cartas');
            if (!decks || decks.length === 0) {
                return res.status(404).json({ error: 'Nenhum deck encontrado para este jogador.' });
            } else {
                res.status(200).json(decks);
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new DeckController();