const express = require('express');
const router = express.Router();
const { loadImage, createCanvas } = require("canvas");
const request = require('request');
const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

router.get('/fbcoverv2', async (req, res) => {
    let pathImg = path.join(__dirname, 'cache', 'fbcover22.png');
    let pathAva = path.join(__dirname, 'cache', 'fbcover222.png');
    let pathLine = path.join(__dirname, 'cache', 'fbcover2222.png');
    let dirPath = path.join(__dirname, 'data', 'anime.json');

    let dataAnime = fs.readFileSync(dirPath, 'utf-8');
    let avatarAnime = JSON.parse(dataAnime);

    let mainName = req.query.name;
    let id = req.query.id;
    let subName = (req.query.subname || '').split('').join(String.fromCharCode(8200));
    let color = req.query.color || 'no';
    let color2 = '';

    if (!mainName || !subName || !id) {
        return res.json({ error: 'Missing data' });
    }
    if (color.toLowerCase() === 'no') {
        color = avatarAnime[id].colorBg;
    }

    try {
        let avatarAnimeImage = await axios.get(encodeURI(avatarAnime[id].imgAnime), { responseType: 'arraybuffer' });
        let background = await axios.get(encodeURI('https://lh3.googleusercontent.com/-p0IHqcx8eWE/YXZN2izzTrI/AAAAAAAAym8/T-hqrJ2IFooUfHPeVTbiwu047RkmxGLzgCNcBGAsYHQ/s0/layer2.jpg'), { responseType: 'arraybuffer' });
        let effectImage = await axios.get(encodeURI('https://lh3.googleusercontent.com/-F8w1tQRZ9s0/YXZZmKaylRI/AAAAAAAAynI/HBoYISaw-LE2z8QOE39OGwTUiFjHUH6xgCNcBGAsYHQ/s0/layer4.png'), { responseType: 'arraybuffer' });

        fs.writeFileSync(pathAva, Buffer.from(avatarAnimeImage.data, 'utf-8'));
        fs.writeFileSync(pathImg, Buffer.from(background.data, 'utf-8'));
        fs.writeFileSync(pathLine, Buffer.from(effectImage.data, 'utf-8'));

        if (!fs.existsSync(path.join(__dirname, 'cache', 'SVN-BigNoodleTitling.otf'))) {
            let font = await axios.get('https://drive.google.com/u/0/uc?id=1uCXXgyepedb9xwlqMsMsvH48D6wwCmUn&export=download', { responseType: 'arraybuffer' });
            fs.writeFileSync(path.join(__dirname, 'cache', 'SVN-BigNoodleTitling.otf'), Buffer.from(font.data, 'utf-8'));
        }

        let baseImage = await loadImage(pathImg);
        let baseAva = await loadImage(pathAva);
        let baseLine = await loadImage(pathLine);
        let canvas = createCanvas(baseImage.width, baseImage.height);
        let ctx = canvas.getContext('2d');

        ctx.drawImage(baseImage, 0, 0, baseImage.width, baseImage.height);
        ctx.fillStyle = color;
        ctx.filter = 'grayscale(1)';
        ctx.fillRect(0, 164, canvas.width, 633);
        ctx.drawImage(baseLine, 0, 0, baseImage.width, baseImage.height);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(baseAva, 0, -320, canvas.width, canvas.width);
        ctx.beginPath();
        ctx.globalAlpha = 1;
        ctx.transform(1, 0, -0.2, 1, 0, 0);

        Canvas.registerFont(path.join(__dirname, 'cache', 'SVN-BigNoodleTitling.otf'), { family: 'SVN-BigNoodleTitling' });
        ctx.font = 'italic 200px SVN-BigNoodleTitling';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'end';
        ctx.globalAlpha = 0.8;
        ctx.fillText(mainName.toUpperCase(), 1215, 535);

        Canvas.registerFont(path.join(__dirname, 'cache', 'SVN-BigNoodleTitling.otf'), { family: 'SVN-BigNoodleTitling' });
        ctx.font = '60px SVN-BigNoodleTitling';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'end';
        ctx.globalAlpha = 1;
        let subNameWidth = ctx.measureText(subName).width;
        ctx.fillRect(1500, 164, 150, 633);
        ctx.fillRect(canvas.width - subNameWidth - 540, 580, subNameWidth + 50, 75);
        ctx.fillStyle = color;
        ctx.fillText(subName.toUpperCase(), 1195, 640);
        ctx.fillStyle = '#FFFFFF';
        ctx.globalAlpha = 0.5;
        ctx.fillRect(1300, 164, 150, 633);
        ctx.globalAlpha = 1;
        ctx.transform(1, 0, 0.2, 1, 0, 0);
        ctx.filter = 'grayscale(0)';
        ctx.drawImage(baseAva, 1010, 97, 700, 700);

        const imageBuffer = canvas.toBuffer();
        fs.writeFileSync(pathImg, imageBuffer);
        fs.removeSync(pathAva);
        fs.removeSync(pathLine);

        return res.sendFile(pathImg);
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
    }
});

module.exports = router;
