const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cheerio = require('cheerio');

const router = express.Router();

const AiRateMyPhoto = async (imageUrl) => {
  try {
    if (!imageUrl) {
      throw new Error('Please provide an image URL');
    }

    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(imageResponse.data, 'binary').toString('base64');

    const form = new FormData();
    form.append('imageFile', '');
    form.append('canvasimg', '');
    form.append('image_data', `data:image/jpeg;base64,${imageData}`);

    const response = await axios.post('https://rate-my-photo.com/result', form, {
      headers: {
        ...form.getHeaders(),
        authority: 'rate-my-photo.com',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ms-MY,ms;q=0.9,en-US;q=0.8,en;q=0.7,id;q=0.6',
        'cache-control': 'max-age=0',
        origin: 'https://rate-my-photo.com',
        referer: 'https://rate-my-photo.com/',
        'sec-ch-ua': '"Not)A;Brand";v="24", "Chromium";v="116"',
        'sec-ch-ua-arch': '""',
        'sec-ch-ua-bitness': '""',
        'sec-ch-ua-full-version-list': '"Not)A;Brand";v="24.0.0.0", "Chromium";v="116.0.5845.240"',
        'sec-ch-ua-mobile': '?1',
        'sec-ch-ua-model': '220333QAG',
        'sec-ch-ua-platform': '"Android"',
        'sec-ch-ua-platform-version': '"11.0.0"',
        'sec-ch-ua-wow64': '?0',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
      },
    });

    const $ = cheerio.load(response.data);

    const score = $(".skill-bar .skill-progress")
      .text()
      .trim()
      .match(/SCORE:\s*([\d.]+)/)?.[1] || null;

    const comparison = $(".card-text")
      .text()
      .trim()
      .match(/Compare to others:\s*(.*)/)?.[1] || null;

    const ratedElement = $(".mt-3.text-success").text().trim();
    const rated = ratedElement ? ratedElement : "This Picture has been no comments rated";

    return {
      score,
      comparison,
      rated
    };
  } catch (error) {
    throw new Error(`Failed to process image: ${error.message}`);
  }
};

router.get('/ratep', async (req, res) => {
 
        const { photo } = req.query;
      //const { photo } = req.originalUrl.split('/api/ratep?photo=')[1];

  if (!photo) {
    return res.status(400).json({ error: 'Please provide a photo URL' });
  }

  try {
    const result = await AiRateMyPhoto(photo);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
