const express = require("express");
const { ytdown } = require("nayan-media-downloader");

const router = express.Router();

router.get("/ytdl", async (req, res) => {
    const videoUrl = req.query.url;

    if (!videoUrl) {
        return res.status(400).send("Error: Missing 'url' query parameter");
    }

    try {
        const response = await ytdown(videoUrl);

        delete response.developer;
        delete response.devfb;
        delete response.devwp;

        res.json(response);
    } catch (error) {
        console.error("Error downloading video:", error);
        res.status(500).send("Error downloading video");
    }
});

module.exports = router;
