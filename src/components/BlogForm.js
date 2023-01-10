import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom'

function BlogForm({editing}) {

const navigate = useNavigate()

const [originalTitle, setOriginalTitle] = useState('')
const [title, setTitle] = useState('')
const [originalBody, setOriginalBody] = useState('')
const [body, setBody] = useState('')
const [originalPublish, setOriginalPublish] = useState(false)
const [publish, setPublish] = useState(false)

const isEdited = () => {
    return title !== originalTitle || body !== originalBody || publish !== originalPublish
}

const onChangePublish = (e) => {
    setPublish(e.target.checked)
}

const onSubmit = () =>{
    if(editing){
        axios.patch(`http://localhost:3001/posts/${id}`,{
            title,
            body,
            publish,
        }).then(navigate(`/blogs/${id}`))
    }else{
        axios.post('http://localhost:3001/posts',{
            title,
            body,
            publish,
            createdAt:Date.now()
        }).then(navigate("/admin"))
    }
}

const goBack = () => {
    if(editing){
        navigate(`/blogs/${id}`)
    }
    else{
        navigate(`/blogs`)
    }
}

const { id } = useParams();

useEffect(() => {
    if(editing){
        axios.get(`http://localhost:3001/posts/${id}`).then((res)=>{
        setTitle(res.data.title);
        setBody(res.data.body);
        setPublish(res.data.publish);
        setOriginalTitle(res.data.title);
        setOriginalBody(res.data.body);
        setOriginalPublish(res.data.publish);
    })}
}, [id,editing])


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

    <div className='form-check mb-3'>
        <input
                className='form-check-input'
                type="checkbox"
                checked={publish}
                onChange={onChangePublish}
                id="publishCheck"

            /> 
                <label htmlFor="publishCheck" className='form-check-label'>Publish</label>

    </div>

    <button
        className='btn btn-primary'
        onClick={onSubmit}
        disabled={editing && !isEdited()}
    >
        {editing?"Edit":"Post"}
    </button>

    <button
        className='btn btn-danger ms-2'
        onClick={goBack}
    >
        Cancle
    </button>

</div>
);
}



export default BlogForm;
