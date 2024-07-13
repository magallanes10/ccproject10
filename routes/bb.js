const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/blackbox', async (req, res, next) => {
    try {
        const text = encodeURIComponent(req.query.text);
        const apiUrl = `https://api.kenliejugarap.com/blackbox/?text=${text}`;

        const response = await axios.get(apiUrl);

        const filteredResponse = {
            response: response.data.response.replace(/\n\nIs this answer helpful to you\? Kindly click the link below\nhttps:\/\/click2donate\.kenliejugarap\.com\n\(Clicking the link and clicking any ads or button and wait for 30 seconds \(3 times\) everyday is a big donation and help to us to maintain the servers, last longer, and upgrade servers in the future\)/, '').trim()
        };

        res.json(filteredResponse);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
