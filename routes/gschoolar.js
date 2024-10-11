const express = require('express');
const { getJson } = require('serpapi');

const searchRouter = express.Router();

searchRouter.get('/gs', async (req, res) => {
  try {
    const query = req.query.q || 'biology';
    const apiKey = 'b2c5b4432c0a92a2084c551808540bb1998fd9e224a3629bc3c5943d0c0bf1c0';

    getJson({
      engine: 'google_scholar',
      q: query,
      api_key: apiKey,
    }, (json) => {
      const organicResults = json['organic_results'];
      res.json({ organicResults });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = searchRouter;
