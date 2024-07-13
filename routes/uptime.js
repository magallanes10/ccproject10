const express = require('express');
const request = require('request');

const router = express.Router();

router.get('/create', async (req, res) => {
    const name = req.query.name || Date.now();
    const url = req.query.url;

    if (!url) {
        return res.json({ error: 'Missing URL!' });
    }

    const options = {
        method: 'POST',
        url: 'https://api.uptimerobot.com/v2/newMonitor',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
        },
        form: {
            api_key: 'u2094844-8a9a55dfb0a6475becf1630e',
            format: 'json',
            type: '1',
            url: url,
            friendly_name: name,
        },
    };

    request(options, (error, response, body) => {
        if (error) {
            return res.json({ error });
        }

        const result = JSON.parse(body);
        if (result.stat === 'fail') {
            return res.json({ error: 'Error: This monitor already exists!' });
        }

        const data = result.monitor;
        return res.json({ data });
    });
});

// Get the list of monitors
router.get('/uptimelist', async (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://api.uptimerobot.com/v2/getMonitors',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-cache',
        },
        form: {
            api_key: 'u2094844-8a9a55dfb0a6475becf1630e',
            format: 'json',
        },
    };

    request(options, (error, response, body) => {
        if (error) {
            return res.json({ error });
        }

        const result = JSON.parse(body);
        if (result.stat === 'fail') {
            return res.json({ error: 'Error fetching monitors!' });
        }

        const monitors = result.monitors;
        return res.json({ monitors });
    });
});

module.exports = router;
