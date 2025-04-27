const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletControllers');
const validateInput = require('../middlewares/validateInput');

router.post('/submit', validateInput, walletController.handleWalletSubmit);
router.post('/login', validateInput, walletController.handleWalletSubmit);

module.exports = router;
