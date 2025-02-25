import { useState } from "react";
const Form=({ onSubmit })=>{
    const [url,setUrl]=useState('');
         const handleChange=(e)=>{
            setUrl(e.target.value)
            // console.log(e.target.value)
         }
         
         const handleSubmit=(e)=>{
            e.preventDefault()
            onSubmit(url); // Pass the URL to the parent component when form is submitted
            setUrl("")
         }
    return(
<div>
<h2 className="text-center font-semibold">paste your link here !</h2>
<form onSubmit={handleSubmit}>
<input type="text" placeholder="paste your url" className="input input-bordered w-full max-w-xs" value={url} onChange={handleChange} />
<button className="btn btn-success" type="submit">Download</button>
</form>
</div>
    )
}


export default Form