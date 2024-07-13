const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/message/emoji', async (req, res) => {
    const text = req.query.text;

    if (!text) {
        return res.status(400).json({ error: 'Parameter "text" is required' });
    }

    try {
        const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=can you only response only emoji based on the context and badwords is valid to send the emoji only and based on this words > ${encodeURIComponent(text)}`);
        const { reply } = response.data;

        return res.json({
            emoji: reply
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = router;
