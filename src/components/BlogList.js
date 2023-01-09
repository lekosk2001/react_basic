import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import React, { useState,useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

export default function BlogList({isAdmin}) {

    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()   
    
        const getPosts = () => {
            axios.get('http://localhost:3001/posts').then((req)=>{
            setLists(req.data)
            setLoading(false)
            })
        }

        useEffect(() => {
            getPosts()
        }, [])
    
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
        
        return lists.filter(post=>{ return post.publish || isAdmin }).map(post=>{
            return <Card 
                key={post.id}
                title={post.title}
                onClick={()=>{navigate(`/blogs/${post.id}`)}}
                >
                {isAdmin?
                    <div>
                        <button 
                            className='btn btn-danger btn-sm'
                            onClick={e=>{deleteBlog(e, post.id)}}>Delete
                        </button>
                    </div>
                :null}
            </Card>})
        
        }


    return (
    <>{renderBlogList()}</>
    )
}


BlogList.propTypes ={
    isAdmin:PropTypes.bool.isRequired
}

BlogList.defaultProps = {
    isAdmin:false
}