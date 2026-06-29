import Decks from '../models/DecksModel.js';

class DeckService {
    async createDeck(deckData) {
        //Quantidade de decks do jogador
        const count = await Decks.countDocuments({ player: deckData.player });

        if (count >= 10) {
            throw new Error('Limite de 10 decks atingido. Você não pode criar mais.');
        }else if(!deckData.nome){
            throw new Error('Os campos nome é obrigátorio para criar um deck.');
        }else if (!deckData.player){
            throw new Error('Resgistre o player para criar um deck.');
        }else{
            const newDeck = new Decks(deckData);
            return await newDeck.save();
        }
    }
}

export default new DeckService();