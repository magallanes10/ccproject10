const express = require('express');
const axios = require('axios');
const { loadImage, createCanvas } = require('canvas');
const fs = require('fs-extra');
const path = require('path');
const jimp = require('jimp');

const router = express.Router();

async function circle(imagePath) {
    const image = await jimp.read(imagePath);
    image.circle();
    return await image.getBufferAsync('image/png');
}

router.get('/fbcover/v3', async (req, res) => {
    const uid = req.query.uid;
    const birthday = req.query.birthday;
    const love = req.query.love;
    const location = req.query.location;
    const hometown = req.query.hometown;
    const name = req.query.name;
    const follow = req.query.follow;
    const gender = req.query.gender;

    if (!uid || !name || !love || !location || !hometown || !follow || !gender || !birthday) {
        return res.json({ error: 'Missing data!' });
    }

    try {
        const pathBg = path.join(__dirname, 'cache', 'bbgg.png');
        const pathAva = path.join(__dirname, 'cache', 'av.png');
        const pathLine = path.join(__dirname, 'cache', 'li.png');

        const avatarResponse = await axios.get(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' });
        const backgroundResponse = await axios.get('https://i.imgur.com/OC7ZYE6.png', { responseType: 'arraybuffer' });
        const effectResponse = await axios.get('https://i.imgur.com/ETTWIEL.png', { responseType: 'arraybuffer' });

        fs.writeFileSync(pathAva, Buffer.from(avatarResponse.data, 'utf-8'));
        fs.writeFileSync(pathBg, Buffer.from(backgroundResponse.data, 'utf-8'));
        fs.writeFileSync(pathLine, Buffer.from(effectResponse.data, 'utf-8'));

        const avatar = await circle(pathAva);

        if (!fs.existsSync(path.join(__dirname, 'cache', 'UTMAvoBold.ttf'))) {
            const fontResponse = await axios.get('https://drive.google.com/u/0/uc?id=1DuI-ou9OGEkII7n8odx-A7NIcYz0Xk9o&export=download', { responseType: 'arraybuffer' });
            fs.writeFileSync(path.join(__dirname, 'cache', 'UTMAvoBold.ttf'), Buffer.from(fontResponse.data, 'utf-8'));
        }

        if (!fs.existsSync(path.join(__dirname, 'cache', 'Baloo Regular.ttf'))) {
            const fontResponse = await axios.get('https://drive.google.com/u/0/uc?id=1IrxrZxo1ht3jur4ZI5MxH9Ri6HspO6YS&export=download', { responseType: 'arraybuffer' });
            fs.writeFileSync(path.join(__dirname, 'cache', 'Baloo Regular.ttf'), Buffer.from(fontResponse.data, 'utf-8'));
        }

        const baseBg = await loadImage(pathBg);
        const baseAva = await loadImage(avatar);
        const baseLine = await loadImage(pathLine);
        const canvas = createCanvas(baseBg.width, baseBg.height);
        const ctx = canvas.getContext('2d');

        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.drawImage(baseBg, 0, 0, canvas.width, canvas.height);

        Canvas.registerFont(path.join(__dirname, 'cache', 'UTMAvoBold.ttf'), { family: 'UTMAvoBold' });
        ctx.strokeStyle = 'rgba(255,255,255, 0.2)';
        ctx.lineWidth = 3;
        ctx.textAlign = 'center';
        ctx.font = '150px UTMAvoBold';
        ctx.strokeText(name, 220, 131);
        ctx.strokeText(name, 543, 383);
        ctx.strokeText(name, 361, 630);
        ctx.strokeText(name, 211, 857);
        ctx.strokeText(name, 2000, 131);
        ctx.strokeText(name, 2323, 383);
        ctx.strokeText(name, 2141, 630);
        ctx.strokeText(name, 1991, 857);
        ctx.drawImage(baseLine, 0, 0, canvas.width, canvas.height);

        ctx.shadowBlur = 40;
        ctx.drawImage(baseAva, 356, 233, 404, 404);
        ctx.shadowBlur = 0;

        ctx.font = '45px UTMAvoBold';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#8317d9';
        ctx.transform(1, 0, -0.4, 1, 0, 0);
        const textWidth = ctx.measureText(name).width;
        ctx.fillRect(1650, 303, canvas.width + textWidth - 2350, 90);
        ctx.transform(1, 0, 0.4, 1, 0, 0);

        Canvas.registerFont(path.join(__dirname, 'cache', 'Baloo Regular.ttf'), { family: 'Baloo Regular' });
        ctx.font = '50px Baloo Regular';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#38b6ff';
        ctx.fillText(name.toUpperCase(), 1590, 365);

        ctx.font = '42px Baloo Regular';
        ctx.fillStyle = '#5adfe3';
        ctx.fillText(birthday, 1777, 474 + 3);
        ctx.fillText(gender, 1762, 544 + 3);
        ctx.fillText(follow, 1708, 615 + 3);
        ctx.fillText(love, 1783, 687 + 3);
        ctx.fillText(hometown, 1719, 764 + 3);
        ctx.fillText(location, 1745, 836 + 3);
        ctx.fillText(uid, 1639, 902 + 3);

        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathBg, imageBuffer);

        return res.sendFile(pathBg);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

module.exports = router;
