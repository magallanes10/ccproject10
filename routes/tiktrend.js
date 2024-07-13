const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/tiktrend', async (req, res) => {
    try {
        const response = await axios.post('https://www.tikwm.com/api/feed/list?region=ph', {});
        const data = response.data;
        console.log(data);
        return res.json(data);
    } catch (error) {
        return res.json({ error: error.message });
    }
});

module.exports = router;
