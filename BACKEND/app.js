const express = require('express');
const app = express();
const cors = require('cors');
const { exec } = require('child_process');  // Required for running yt-dlp as a command
const path = require('path');

const port = 5001;

// Middleware setup
app.use(cors( {origin: "http://localhost:3000"
,    // Allow this specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods,
  allowedHeaders: ['Content-Type', 'Authorization', 'withCredentials'],  // Allow these headers
  credentials: true, // Allow cookies to be sent
}
));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies


// Define the output directory for downloads
const DOWNLOAD_DIR = path.join('C:', 'downloads');

// Helper function to download a video using yt-dlp command
async function downloadVideo(videoUrl) {
  return new Promise((resolve, reject) => {
    const outputTemplate = path.join(DOWNLOAD_DIR, '%(title)s.%(ext)s');  // Output file path

    // Run yt-dlp command as a child process
    exec(`yt-dlp ${videoUrl} -f best -o "${outputTemplate}"`, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(`Error: ${stderr}`);
      } else {
        console.log(`stdout: ${stdout}`);
        resolve('Download started successfully');
      }
    });
  });
}

// API Endpoint for downloading videos
app.post('/ytdownload', async (req, res) => {
  const { videoUrl } = req.body;
  
  if (!videoUrl) {
    return res.status(400).json({ error: 'Please provide a valid YouTube URL' });
  }

  console.log('Video URL:', videoUrl);

  try {
    // Call the download function
    const message = await downloadVideo(videoUrl);
    res.json({ message, status: 'success' });
    alert("video is now downlading...")
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files (Optional) - If you want to serve the videos after downloading
app.use('/downloads', express.static(DOWNLOAD_DIR));

// Home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the YouTube Downloader API</h1>');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
