import express from 'express';
import CardController from '../controllers/CardController.js';

const router = express.Router();

router.post('/', CardController.create);
router.delete('/:id', CardController.delete);
router.put('/:id', CardController.update);
router.get('/', CardController.getAll);
router.get('/:id', CardController.getById);

export default router;