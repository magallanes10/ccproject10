const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/gpt4', async (req, res) => {
  const query = req.query.text;
  const url = `https://aemt.me/gpt4?text=${query}`;

  try {
    const response = await axios.get(url);
    res.json({
      status: true,
      result: response.data
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      result: 'An error occurred while fetching data.'
    });
  }
});

module.exports = router;
