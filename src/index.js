import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import cardRoutes from './routes/CardRoutes.js';
import deckRoutes from './routes/DeckRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bem vindo a API de TCG!');
});

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);
app.use('/decks', deckRoutes);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log('Servidor rodando na porta 3000');
    });
});