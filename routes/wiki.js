const express = require('express');
const wiki = require('wikipedia');

const router = express.Router();

router.get('/wiki', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const page = await wiki.page(query);
    const summary = await page.summary();
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data', details: error.message });
  }
});

module.exports = router;
