const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/newgrounds', async (req, res) => {
  const query = req.query.query;
  const url = `https://www.newgrounds.com/search/conduct/audio?suitabilities=etm&c=3&terms=${query}`;

  const config = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  };

  try {
    const { data } = await axios.get(url, config);
    const $ = cheerio.load(data);

    const results = [];

    $('ul.itemlist.spaced li').each((index, element) => {
      const audioWrapper = $(element).find('.audio-wrapper');
      const link = audioWrapper.find('a.item-audiosubmission').attr('href');
      const title = audioWrapper.find('a.item-audiosubmission').attr('title');

      if (link && title) {
        results.push({ title, link });
      }
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Error occurred while scraping data.' });
  }
});

router.get('/ng', async (req, res) => {
  const search = req.query.play;
  const searchUrl = `https://www.newgrounds.com/search/conduct/audio?suitabilities=etm&c=3&terms=${search}`;

  const config = {
    headers: {
      'User-Agent': 'Mozilla/5.0'
    }
  };

  try {
    const { data } = await axios.get(searchUrl, config);
    const $ = cheerio.load(data);

    const firstResult = $('ul.itemlist.spaced li').first().find('a.item-audiosubmission').attr('href');

    if (!firstResult) {
      return res.status(404).json({ error: 'No result found for the search query!' });
    }

    const apiUrl = `https://api.allorigins.win/get?url=${firstResult}`;

    const { data: apiData } = await axios.get(apiUrl);
    const { contents, status } = apiData;
    const code = status.http_code;

    if (code !== 200) {
      if (code === 404) {
        return res.status(404).json({ error: 'The song could not be found! Please check the song id and try again! (error 404)' });
      }
      return res.status(code).json({ error: `Something went wrong! Error Code: ${code}` });
    }

    let url = contents.substring(contents.indexOf("<![CDATA[") + 9);
    url = url.substring(url.indexOf("embedController([") + 17);
    url = url.substring(0, url.indexOf("\",\""));
    url = url.substring(0, url.indexOf("?"));
    url = url.substring(url.indexOf("url") + 3);
    url = url.substring(url.indexOf(":\"") + 2);
    url = url.replace(/\\\//g, "/");

    let title = contents.substring(contents.indexOf("<title>") + 7);
    title = title.substring(0, title.lastIndexOf("</title>"));

    return res.json({ url, title });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'The song could not be found! Please check the song id and try again! (error 404)' });
    }
    return res.status(500).json({ error: 'Something went wrong! Please check your internet connection and try again!' });
  }
});

module.exports = router;
