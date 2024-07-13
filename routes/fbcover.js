const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/fbcover', async (req, res) => {
  const { name, color, address, email, subname, uid, sdt } = req.query;

  if (!name || !color || !address || !email || !subname || !uid || !sdt) {
    return res.status(400).json({ error: 'Please provide all required parameters' });
  }

  try {
    const response = await axios.get(`https://fbcoverapi.adaptable.app/fbcover`, {
      responseType: 'arraybuffer',
      params: { name, color, address, email, subname, uid, sdt }
    });

    const filePath = path.join(__dirname, 'fbcover.jpg'); 

    fs.writeFileSync(filePath, response.data); 
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Error sending file' });
      } else {
        fs.unlinkSync(filePath);
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

module.exports = router;
