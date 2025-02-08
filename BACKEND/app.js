const express=require('express')
const app=express()
const cors=require('cors')
const fluent=require('fluent-ffmpeg')
const { ytDlp } = require("yt-dlp-exec")
const port=5001
app.use(cors())
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies (if you use form submissions)

app.get('/',(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

app.post('/ytdownload',async (req,res)=>{
    const {videoUrl}=req.body
    if(!videoUrl){
        res.status(400).json("please enter a valid link")
     }
     console.log(videoUrl);
     
     try{
         const options={
            outtmpl:"downloads/%(title)s.%(ext)s",
            format:"best"

         }
         const response=await ytDlp(videoUrl,options)
         res.json({message:"download starting",title:response.title})

     }
     catch(error){
             res.status(500).json({error:"error occured:", message:error.message})
     }

})
app.listen(port,()=>{
    console.log(`we are running on http://localhost:${port}`);
    
})

