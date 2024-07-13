document.getElementById('fetchBtn').addEventListener('click', async () => {
    const url = document.getElementById('url').value;

    if (!url) {
        alert('Please enter a valid YouTube URL.');
        return;
    }

    try {
        const response = await axios.get(`https://youtube-audio-api-by-jonell-magallanes.onrender.com/music?url=${url}`);
        const data = response.data.data;

        document.getElementById('title').innerText = data.title;
        const audioPlayer = document.getElementById('audioPlayer');
        audioPlayer.src = data.link;
        audioPlayer.style.display = 'block';
        audioPlayer.play();

        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.href = data.link;
        downloadBtn.download = data.title + '.mp3';
        downloadBtn.style.display = 'inline-block';
    } catch (error) {
        console.error('Error fetching audio:', error);
        alert('Failed to fetch audio. Please check the URL and try again.');
    }
});
