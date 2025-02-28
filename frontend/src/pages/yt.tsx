import React from 'react';
import { useState } from 'react';
import axios from "axios"
import Form from "../components/Form";
import { log } from 'node:console';

const Yt = () => {  
  const [videoUrl,setVideoUrl]=useState('');
 
  
  const handleFormSubmit=async(url:any)=>{
    
     setVideoUrl(url)
     console.log("video url :",url)
    
   try{
    const {data} =await axios.post('http://localhost:5001/ytdownload',{ videoUrl: url } )
      console.log(data);
    }
    catch(error){
      console.error("Error while downloading video:", error);
    }
  }

  return(
  <div>
    <h3 className='text-black'>U-Tube</h3>
    <Form onSubmit={handleFormSubmit} />  
  </div>
    )
}; 
export default Yt;  // Export the 'Ins' component (capitalized)
