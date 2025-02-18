import React from 'react';
import { useState } from 'react';
import axios from "axios"
import Form from "../components/Form";
import { log } from 'node:console';


const Yt = () => {  
  const [url,setUrl]=useState('');
 
  
  const handleFormSubmit=(url)=>{
    
     setUrl(url)
     console.log(url)
     const respones=axios.post('http://locslhost:5001/ytdownload',url)
     console.log(respones)
  }

  return(
  <div>
    <h3 className='text-black'>U-Tube</h3>
    <Form onSubmit={handleFormSubmit} />  
  </div>
    )
};

export default Yt;  // Export the 'Ins' component (capitalized)
