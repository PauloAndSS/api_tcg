import Decks from '../models/DecksModel.js';

class DeckService {
    async createDeck(deckData) {
        //Quantidade de decks do jogador
        const count = await Decks.countDocuments({ player: deckData.player });

        if (count >= 10) {
            throw new Error('Limite de 10 decks atingido. Você não pode criar mais.');
        } else if (!deckData.nome) {
            throw new Error('Os campos nome é obrigátorio para criar um deck.');
        } else if (!deckData.player) {
            throw new Error('Resgistre o player para criar um deck.');
        } else {
            const newDeck = new Decks(deckData);
            return await newDeck.save();
        }
    }

    async getDeckReport() {
        return await Decks.aggregate([
            { $match: { CreatedAt: { $gte: new Date('2026-01-01') } } },

            {
                $lookup: {
                    from: 'cards',
                    localField: 'cartas',
                    foreignField: '_id',
                    as: 'detalhesCartas'
                }
            },

            {
                $addFields: {
                    custoTotal: { $sum: "$detalhesCartas.custo" }
                }
            },

            {
                $group: {
                    _id: "$player",
                    totalDecks: { $sum: 1 },
                    mediaCusto: { $avg: "$custoTotal" },
                    maxCusto: { $max: "$custoTotal" }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'infoJogador'
                }
            },
            { $unwind: "$infoJogador" },
            {
                $project: {
                    _id: 0,
                    nomeJogador: "$infoJogador.nome",
                    mediaCusto: { $round: ["$mediaCusto", 2] },
                    maxCusto: 1
                }
            },

            { $sort: { mediaCusto: -1 } },
            { $limit: 5 }
        ]);
    }
}

export default new DeckService();