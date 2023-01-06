import axios from 'axios';
import { useState } from 'react';

function BlogForm() {

const [title, setTitle] = useState('')
const [body, setBody] = useState('')

const onSubmit = () =>{
axios.post('http://localhost:3001/posts',{
    title,
    body
})
}

return (
<div>
    <h1>Create a blog post</h1>
    <div className='mb-3 mt-3'>
    <label className='form-lable'>Title</label>
    <input 
        className='form-control'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
    />

    <label className='form-lable'>Body</label>
    <textarea 
        className='form-control'
        rows="20"
        value={body}
        onChange={(e)=>{setBody(e.target.value)}}
    />
    </div>
    <button className='btn btn-primary' onClick={onSubmit}>Post</button>
</div>
);
}

export default BlogForm;