import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom'

function BlogForm({editing}) {

const navigate = useNavigate()
const [title, setTitle] = useState('')
const [body, setBody] = useState('')

const onSubmit = () =>{
    if(editing){
        axios.patch(`http://localhost:3001/posts/${id}`,{
            title,
            body,
            createdAt:Date.now()
        }).then(navigate("/blogs"))
    }else{
        axios.post('http://localhost:3001/posts',{
            title,
            body,
            createdAt:Date.now()
        }).then(navigate("/blogs"))
    }
}

const { id } = useParams();

useEffect(() => {
    if(editing){
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
        setTitle(res.data.title);
        setBody(res.data.body);
    })}
}, [id])


return (
<div>
    <h1>{editing?"Edit post":"Create a blog post"}</h1>
    <div className='mb-3'>
    <label className='form-lable'>Title</label>
    <input 
        className='form-control'
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
    />

    <label className='form-lable'>Body</label>
    <textarea 
        className='form-control'
        rows="10"
        value={body}
        onChange={(e)=>{setBody(e.target.value)}}
    />
    </div>
    <button
        className='btn btn-primary'
        onClick={onSubmit}
    >
        {editing?"Edit":"Post"}
    </button>
</div>
);
}



export default BlogForm;
