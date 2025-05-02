import express from 'express';
import walletController from '../controllers/walletControllers.js';
import validateInput from '../middlewares/validateInput.js';

const router = express.Router();

router.post('/submit', validateInput, walletController.handleWalletSubmit);
router.post('/login', validateInput, walletController.handleWalletSubmit);

export default router;
