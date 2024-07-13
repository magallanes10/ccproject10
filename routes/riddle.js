const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/randomriddle', async (req, res) => {
  try {
    const response = await axios.get('https://riddles-api.vercel.app/random');
    const data = response.data;

    res.json({
      riddle: data.riddle,
      answer: data.answer
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
