import React from 'react'
import BlogForm from '../components/BlogForm'
import { useOutletContext  } from 'react-router-dom'
export default function BlogEditPage() {
  
  const addToasts = useOutletContext();
  return (
    <div>
      <BlogForm editing={true} addToasts={addToasts}/>
    </div>
  )
}
