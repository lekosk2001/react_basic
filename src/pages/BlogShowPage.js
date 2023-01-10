import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BlogShowPage() {
    const { id } = useParams();
    const [data,setData]=useState();
    const [loading, setLoading] = useState(true)

    const getPost = (id) =>{
        axios.get(`http://localhost:3001/posts/${id}`).then((req)=>{
            console.log(req.data)
            setData(req.data)
            setLoading(false)
        })
    }

    const printDate = (timestamp) =>{
        return new Date(timestamp).toLocaleString()
    }

    useEffect(() => {
        getPost(id)
    }, [id])
    

    if(loading){
        return (
            <LoadingSpinner/>
        )
    }
    
    return (
        <div>
            <div className='d-flex'>
                <h1 className='flex-grow-1'>{data.title}</h1>
                <div><Link className='btn btn-primary' to={`/blogs/${id}/edit`}>수정</Link></div>
            </div>
            <small className='text-muted'>Created At {printDate(data.createdAt)}</small>
            <hr></hr>
            <p>{data.body}</p>
        </div>
    )
}
