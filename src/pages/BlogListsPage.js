import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Card from '../components/Card'

export default function BlogListsPage() {
const [lists, setLists] = useState([])

  const getPosts = ()=>{
    axios.get('http://localhost:3001/posts').then((req)=>{
      setLists(req.data)
    })
  }

  useEffect(() => {
    getPosts()
  }, [])
  
  return (
    <div>
      <h1>Blogs</h1>
      {lists.map(post=>{return <Card id={post.id} title={post.title}></Card>})}
    </div>
  )
}
