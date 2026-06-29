import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.getAll);
router.put('/', UserController.update);
router.post('/register', UserController.create);
router.post('/login', UserController.login);

export default router;