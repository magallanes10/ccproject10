const express = require('express');
const router = express.Router();
const AiRateMyPhoto = require('../routes/data/rate.js'); 

router.get('/ratephoto', async (req, res) => {
  const { url } = req.originalUrl.split('/api/ratephoto?url=')[1];
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const result = await AiRateMyPhoto(url);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing the image.' });
  }
});

module.exports = router;
