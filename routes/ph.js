const express = require('express');
const PornHub = require('pornhub.js'); 
const router = express.Router();

router.get('/ph', async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ error: 'Please provide a search parameter' });
  }

  try {
    const pornhub = new PornHub();
    const result = await pornhub.searchVideo(search);

    if (result.data.length === 0) {
      return res.status(404).json({ error: 'No videos found' });
    }

    const url = result.data[0].url;
    const video = await pornhub.video(url);

    res.json(video);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
