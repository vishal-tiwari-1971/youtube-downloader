const express=require('express')
const app=express()
const cors=require('cors')
const fluent=require('fluent-ffmpeg')
const YTDlpWrap = require('yt-dlp-wrap').default;

let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);

//Download the yt-dlp binary for the given version and platform to the provided path.
//By default the latest version will be downloaded to "./yt-dlp" and platform = os.platform().
await YTDlpWrap.downloadFromGithub(
    'path/to/yt-dlp/binary',
    '2020.06.16.1',
    'win32'
);

//Init an instance with a given binary path.
//If none is provided "yt-dlp" will be used as command.
const ytDlpWrap = new YTDlpWrap('path/to/yt-dlp/binary');
//The binary path can also be changed later on.
ytDlpWrap.setBinaryPath('path/to/another/yt-dlp/binary');


const port=5001
app.use(cors())
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (if you use form submissions)

app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

app.post('/ytdownload', async (req, res) => {
    const { videoUrl } = req.body;
  
    if (!videoUrl) {
      return res.status(400).json("Please enter a valid link");
    }
  
    console.log('Video URL:', videoUrl);
  
    try {
      // Running yt-dlp command using yt-dlp-wrap
      const ytDlpEventEmitter = ytDlpWrap
        .exec([
          videoUrl,                     // The URL of the video to download
          '-f',                          // Select the format
          'best',                        // Best available quality
          '-o',                          // Output template
          'downloads/%(title)s.%(ext)s'   // Output file format
        ])
        .on('progress', (progress) => {
          console.log(
            `Progress: ${progress.percent}% - Speed: ${progress.currentSpeed} - ETA: ${progress.eta}`
          );
        })
        .on('ytDlpEvent', (eventType, eventData) => {
          console.log(eventType, eventData);
        })
        .on('error', (error) => {
          console.error('Error during download:', error);
          return res.status(500).json({ error: 'Error during download', message: error.message });
        })
        .on('close', () => {
          console.log('Download finished');
          res.json({ message: 'Download complete', status: 'success' });
        });
  
      // Optionally, you can log the process ID if needed for debugging
      console.log('yt-dlp Process ID:', ytDlpEventEmitter.ytDlpProcess.pid);
  
    } catch (error) {
      console.error('Unexpected error:', error);
      res.status(500).json({ error: 'Unexpected error occurred:', message: error.message });
    }
  });
app.listen(port,()=>{
    console.log(`we are running on http://localhost:${port}`);
    
})

