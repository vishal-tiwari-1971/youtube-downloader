import { useState } from "react";
const Form=()=>{
    const [url,setUrl]=useState('');
         const handleChange=(e)=>{
            setUrl(e.target.value)
            console.log(e.target.value)
         }
         
         const handleSubmit=(e)=>{
            e.preventDefault()
            setUrl("")
         }
    return(
<div>
<h2 className="text-center font-semibold">paste your link here !</h2>
<form onSubmit={handleSubmit}>
<input type="text" placeholder="paste your url" className="input input-bordered w-full max-w-xs" value={url} />
<button className="btn btn-success" type="submit">Download</button>
</form>
</div>
    )
}


export default Form