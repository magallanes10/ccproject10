const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/randomverse', async (req, res) => {
  try {
    const response = await axios.get('https://bible-api.com/?random=verse');
    const data = response.data;

    res.json({
      reference: data.reference,
      verses: data.verses,
      text: data.text,
      translation_id: data.translation_id,
      translation_name: data.translation_name,
      translation_note: data.translation_note,
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
