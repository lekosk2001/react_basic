import React from 'react'
import BlogForm from '../components/BlogForm'
import { useOutletContext } from 'react-router-dom';


export default function BlogCreatePage() {
  const addToasts = useOutletContext();
  return (
    <div>
      <BlogForm addToasts={addToasts}/>
    </div>
  )
}
