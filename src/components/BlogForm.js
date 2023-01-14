import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate, useParams  } from 'react-router-dom'

function BlogForm({editing,addToasts}) {
    const navigate = useNavigate()
    const [originalTitle, setOriginalTitle] = useState('')
    const [title, setTitle] = useState('')
    const [originalBody, setOriginalBody] = useState('')
    const [body, setBody] = useState('')
    const [originalPublish, setOriginalPublish] = useState(false)
    const [publish, setPublish] = useState(false)
    const [titleError, setTitleError] =useState(false)
    const [bodyError, setBodyError] =useState(false)

    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked)
    }
    const { id } = useParams();


// 유효성 검사.
    const validateForm = () => {
        let validated = true

        if (title === ''){
            setTitleError(true)
            validated = false
        }

        if (body === ''){
            setBodyError(true)
            validated = false
        }

        return validated
    }

const onSubmit = () =>{
    setTitleError(false)
    setBodyError(false)

    if(validateForm()){
        if(editing){
            axios.patch(`http://localhost:3001/posts/${id}`,{
                title,
                body,
                publish,
            }).then(()=>{
                addToasts({
                    type:'success',
                    text: '성공적으로 수정되었습니다.'
                })
                navigate(`/blogs/${id}`)
            })
        }else{
            axios.post('http://localhost:3001/posts',{
                title,
                body,
                publish,
                createdAt:Date.now()
            }).then(()=>{
                addToasts({
                    type:'success',
                    text: '성공적으로 생성되었습니다.'
                })
                navigate("/admin")
            })
        }
    }
}

// 캔슬 버튼 누를 시,
// 수정중이라면 id값으로, 아니라면 블로그 리스트 페이지로 이동.
const goBack = () => {
    if(editing){
        navigate(`/blogs/${id}`)
    }
    else{
        navigate(`/blogs`)
    }
}

// 마운트시, 수정중이라면 id값에 맞는 데이터를 불러옴.
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
                className={`form-control ${titleError&&"border-danger"}`}
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
            />
            {titleError && <div className='text-danger'>Title is required.</div>}
        </div>
        <div className='mb-3'>
            <label className='form-lable'>Body</label>
            <textarea 
                className={`form-control ${bodyError&&"border-danger"}`}
                rows="10"
                value={body}
                onChange={(e)=>{setBody(e.target.value)}}
            />
            {bodyError && <div className='text-danger'>Body is required.</div>}
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

BlogForm.propTypes ={
    editing:PropTypes.bool
}

BlogForm.defaultProps = {
    editing:false
}


export default BlogForm;
