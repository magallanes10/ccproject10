const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/ai', async (req, res) => {
    const ask = req.query.ask;

    if (!ask) {
        return res.status(400).json({ error: 'Parameter "ask" is required' });
    }

    try {
        const response = await axios.get(`https://hercai.onrender.com/v3/hercai?question=${encodeURIComponent(ask)}`);
        const { content, reply } = response.data;

        return res.json({
            content: content || 'No content',
            reply: reply || 'No reply'
        });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
});

module.exports = router;
 