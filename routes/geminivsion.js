const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/geminivision', async (req, res) => {
  const { ask, url } = req.query;

  if (!ask || !url) {
    return res.status(400).json({ error: 'Please provide both ask and url as query parameters' });
  }

  try {
    const response = await axios.get(`https://joshweb.click/gemini?prompt=${ask}&url=${url}`);
    const data = response.data;

    res.json({
      gemini: data.gemini
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
