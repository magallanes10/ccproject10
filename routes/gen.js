const express = require('express');
const { G4F } = require("g4f");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const g4f = new G4F();

async function generateImage(prompt, provider, providerOptions = {}) {
    return await g4f.imageGeneration(prompt, {
        debug: true,
        provider,
        providerOptions,
    });
}

router.get("/gen", async (req, res) => {
    const prompt = req.query.prompt || "A default image";
    const style = req.query.style || "cartoon";
    let provider, providerOptions;

    if (style === "cartoon") {
        provider = g4f.providers.Emi;
        providerOptions = {};
    } else if (style === "paint") {
        provider = g4f.providers.Pixart;
        providerOptions = {
            height: 512,
            width: 512,
            samplingMethod: "SA-Solver",
        };
    } else if (style === "realistic") {
        provider = g4f.providers.Prodia;
        providerOptions = {
            model: "ICantBelieveItsNotPhotography_seco.safetensors [4e7a3dfd]",
            samplingSteps: 15,
            cfgScale: 30,
        };
    } else {
        return res.status(400).send("Unknown style");
    }

    try {
        const base64Image = await generateImage(prompt, provider, providerOptions);
        const imagePath = path.join(__dirname, "image.jpg");

        fs.writeFile(imagePath, base64Image, { encoding: "base64" }, function (err) {
            if (err) return res.status(500).send("Error writing the file: " + err);

            res.sendFile(imagePath, function (err) {
                if (err) {
                    res.status(500).send("Error sending the file: " + err);
                } else {
                    console.log("The image has been successfully sent.");
                }
            });
        });
    } catch (error) {
        res.status(500).send("Error generating the image: " + error);
    }
});

module.exports = router;
