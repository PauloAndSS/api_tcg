import express from 'express';
import DeckController from '../controllers/DeckController.js';

const router = express.Router();

router.post('/', DeckController.create);
router.delete('/:id', DeckController.delete);
router.get('/', DeckController.getAll);
router.get('/:id', DeckController.getById);
router.get('/player/:playerId', DeckController.getByPlayer);

export default router;