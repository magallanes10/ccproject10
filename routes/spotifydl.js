const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

const generateRandomToken = (length = 64) => {
    return crypto.randomBytes(length / 2).toString('hex');
};

router.get('/spt', async (req, res) => {
    const spotifyUrl = req.query.url;

    if (!spotifyUrl) {
        return res.status(400).json({ error: 'Please provide a Spotify URL.' });
    }

    try {
        const metadataResponse = await axios.get(`https://spotisongdownloader.to/api/composer/spotify/xsingle_track.php?url=${encodeURIComponent(spotifyUrl)}`, {
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
                'Referer': 'https://spotisongdownloader.to/?timestamp=1728691486258'
            }
        });

        if (metadataResponse.status === 200 && metadataResponse.data) {
            const trackData = metadataResponse.data;
            const token = generateRandomToken();

            const postData = new URLSearchParams({
                song_name: trackData.song_name,
                artist_name: trackData.artist,
                url: spotifyUrl,
                token: token
            });

            const downloadResponse = await axios.post('https://members.spotisongdownloader.com/api/composer/spotify/swd.php', postData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept': 'application/json, text/javascript, */*; q=0.01',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (downloadResponse.data.status === 'success') {
                return res.json({
                    status: true,
                    owner: 'JrDev06 and CC PROJECTS',
                    song_name: trackData.song_name,
                    artist: trackData.artist,
                    album: trackData.album_name,
                    duration: trackData.duration,
                    release_date: trackData.released,
                    artwork: trackData.img,
                    spotify_url: trackData.url,
                    download_link: downloadResponse.data.dlink
                });
            } else {
                return res.status(500).json({ error: 'Failed to retrieve the download link.' });
            }
        } else {
            return res.status(500).json({ error: 'Failed to retrieve metadata for download.' });
        }
    } catch (error) {
        return res.status(500).json({ error: `An error occurred while processing your request at error of ${erro}` });
    }
});

module.exports = router;
