import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link,useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import useToasts from '../hooks/toast'

export default function BlogShowPage() {
    const { id } = useParams();
    const [data,setData]=useState();
    const [loading, setLoading] = useState(true)
    const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
    const [error,setError] = useState('')
    const {addToasts} = useToasts()
    const printDate = (timestamp) =>{
        return new Date(timestamp).toLocaleString()
    }

    useEffect(() => {
        const getPost = (id) =>{
            axios.get(`http://localhost:3001/posts/${id}`).then((req)=>{
                setData(req.data)
                setLoading(false)
            })
            .catch((e)=>{
                setLoading(false)
                setError('something went wrong in db')
                addToasts({
                    text : '에러가 발생하였습니다.',
                    type : 'danger'
                })
            })
        }
        getPost(id)
    }, [id])
    

    
    if(loading){
        return (
            <LoadingSpinner/>
        )
    }

    if (error){
        return <div>{error}</div>
    }
    
    return (
        <div>
            <div className='d-flex'>
                <h1 className='flex-grow-1'>{data.title}</h1>
                {isLoggedIn&&<div><Link className='btn btn-primary' to={`/blogs/${id}/edit`}>수정</Link></div>}
            </div>
            <small className='text-muted'>Created At {printDate(data.createdAt)}</small>
            <hr></hr>
            <p>{data.body}</p>
        </div>
    )
}
