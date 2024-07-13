const express = require('express');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI("AIzaSyBpB8_1oyp_zTO6NsbDjNpjMOoN7mm3CB4");

const getChatHistory = (id) => {
    const filePath = path.join(__dirname, `/data/${id}.json`);
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    return [];
};

const saveChatHistory = (id, history) => {
    const dirPath = path.join(__dirname, 'data');
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
    const filePath = path.join(dirPath, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(history, null, 2));
};

router.get('/geminitalk', async (req, res) => {
    const ask = req.query.ask;
    const id = req.query.id;

    if (!ask || !id) {
        return res.status(400).json({ error: 'Both ask and id parameters are required.' });
    }

    const history = getChatHistory(id);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const chat = model.startChat({
        history: [
            ...history,
            { role: 'user', parts: [{ text: ask }] },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });

    try {
        const result = await chat.sendMessage(ask);
        const response = await result.response;
        const text = response.text();

        history.push({ role: 'user', parts: [{ text: ask }] });
        history.push({ role: 'model', parts: [{ text }] });
        saveChatHistory(id, history);

        return res.json({ response: text });
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
