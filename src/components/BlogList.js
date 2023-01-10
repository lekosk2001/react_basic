import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import React, { useState,useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import Pagenation from './Pagenation'

export default function BlogList({isAdmin}) {

    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const navigate = useNavigate()
    const limit = 5
    
    const getPosts = (page = 1) => {
        setCurrentPage(page);
        let params = {
            _page:page,
            _limit:limit,
            _sort:'id',
            _order:'asc',
        }

        if(!isAdmin){
            params = {...params, publish:true}
        }

        axios.get(`http://localhost:3001/posts`,{params}).then((res)=>{
            setNumberOfPosts(res.headers['x-total-count'])
            setLists(res.data)
            setLoading(false)
            })
    }

    useEffect(()=>{
        setNumberOfPages(Math.ceil(numberOfPosts/limit))
    },[numberOfPosts])

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
        
        return lists.map(post=>{
            return <Card 
                id={post.id}
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
    <>
        {renderBlogList()}
        {numberOfPages>1 &&<Pagenation
            currentPage={currentPage}
            numberOfPages={numberOfPages}
            onClick={getPosts}
        />}
    </>
    )
}


BlogList.propTypes ={
    isAdmin:PropTypes.bool.isRequired
}

BlogList.defaultProps = {
    isAdmin:false
}