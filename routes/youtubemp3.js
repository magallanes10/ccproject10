
const express = require('express');
const poji_ytmp3 = require('youtube-to-mp3-poji');

const router = express.Router();

router.get('/music', async (req, res) => {
  const youtubeUrl = req.query.url;

  if (!youtubeUrl) {
    return res.status(400).send({ error: 'You must provide a YouTube URL.' });
  }

  try {
    const data = await poji_ytmp3(youtubeUrl);
    res.send(data);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send({ error: 'Error occurred during MP3 conversion.' });
  }
});

module.exports = router;
