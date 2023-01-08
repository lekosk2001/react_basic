import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link,useNavigate  } from 'react-router-dom'
import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'

export default function BlogListsPage() {
const [lists, setLists] = useState([])
const [loading, setLoading] = useState(true)
const navigate = useNavigate()

  const getPosts = () => {
    axios.get('http://localhost:3001/posts').then((req)=>{
      setLists(req.data)
      setLoading(false)
    })
  }

  const deleteBlog = (e,id) => {
    e.stopPropagation()
    axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
      setLists(prevPost=>{
        return prevPost.filter(post=>{
          return post.id !== id
        })
      })
    })
  }

const renderBlogList = () => {
  if(loading){
    return (
      <LoadingSpinner/>
    )
  }

  if (lists.length === 0){
    return <div>"no blog contents found"</div>
  }

  return lists.map(post=>{return <Card 
    key={post.id}
    title={post.title}
    onClick={()=>{navigate("/blogs/edit")}}
    >
    <button 
      className='btn btn-danger btn-sm'
      onClick={e=>{deleteBlog(e, post.id)}}
    >Delete</button>
  </Card>})
  
}

  useEffect(() => {
    getPosts()
  }, [])
  
  return (
    <div className='mt-3 list-group'>
      <div className='d-flex justify-content-between'>
        <h1>Blogs</h1>
        <div>
          <Link to='/blogs/create' className='btn btn-success'>Create New</Link>
        </div>
      </div>
      {renderBlogList()}
    </div>
  )
}
