import axios from 'axios'
import React, { useState,useEffect } from 'react'
import { Link, redirect,useNavigate  } from 'react-router-dom'
import Card from '../components/Card'

export default function BlogListsPage() {
const [lists, setLists] = useState([])
const navigate = useNavigate()

  const getPosts = ()=>{
    axios.get('http://localhost:3001/posts').then((req)=>{
      setLists(req.data)
    })
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

      {lists.map(post=>{return <Card 
        key={post.id}
        title={post.title}
        onClick={()=>{navigate("/blogs/edit")}}
        >
        <button>button</button>
      </Card>})}
    </div>
  )
}
