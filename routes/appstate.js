const express = require('express');
const router = express.Router();
const appstate = require('fca-project-orion');
const fs = require('fs');

router.get('/appstate', (req, res) => {
    const email = req.query.e;
    const password = req.query.p;

    if (!email || !password) {
        return res.status(400).send({ error: 'Email and password query parameters are required' });
    }

    appstate({ email, password }, (err, api) => {
        if (err) {
            console.error('Error in appstate:', err);
            return res.status(401).send({ error: err.message });
        } else {
            try {
                const result = api.getAppState();
                const results = JSON.stringify(result, null, 2);
                const filename = `appstate.json`;

                fs.writeFileSync(filename, results);
                console.log(results);

                res.type('json').send({ success: results });
                api.logout();
            } catch (e) {
                console.error('Error processing result:', e);
                res.status(500).json({ error: e.message });
            }
        }
    });
});

module.exports = router;
