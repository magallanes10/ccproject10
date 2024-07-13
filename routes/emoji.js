const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/text', async (req, res) => {
  try {
    const content = req.query.emoji;
    const response = await axios.get(`https://jonellccprojectapis10.adaptable/api/chatgpt?input=${encodeURIComponent(content)}`);

    const gptResponse = response.data.result.gptResult.gpt;
    const emojiOnly = gptResponse.match(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu).join('');

    const modifiedResponse = {
      status: 200,
      creator: "Jonell Magallanes",
      result: emojiOnly
    };

    res.json(modifiedResponse);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
