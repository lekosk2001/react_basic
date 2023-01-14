import Card from '../components/Card'
import LoadingSpinner from '../components/LoadingSpinner'
import React, { useState,useEffect } from 'react'
import { useLocation, useNavigate  } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'
import Pagenation from './Pagenation'
import useToasts from '../hooks/toast'

export default function BlogList({isAdmin}) {

    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [numberOfPosts, setNumberOfPosts] = useState(0)
    const [numberOfPages, setNumberOfPages] = useState(0)
    const [searchText, setSearchText] = useState('')
    const navigate = useNavigate()
    const limit = 5
    const location = useLocation();
    const params = new URLSearchParams(location.search)
    const pageParam =  params.get('page')
    const {addToasts} = useToasts()
    const [error,setError] = useState('')

// 최초 마운트 시,
// 페이지 번호 스테이트 변경 (1페이지,)
    useEffect(()=>{
        setNumberOfPages(Math.ceil(numberOfPosts/limit))
    },[numberOfPosts])

// 페이지 버튼 누를 시,
// 페이지 숫자로 이동하고, 현재 페이지 스테이트 변경 후, 그 페이지에 맞는 포스트 불러옴.
    const onClickPageButton = (page) => {
        navigate(`${location.pathname}?page=${page}`)
        setCurrentPage(page)
        getPosts(page)
    }

// 페이지를 불러오는 함수 (기본 1페이지)
    const getPosts = (page = 1) => {
        let params = {
            _page:page,
            _limit:limit,
            _sort:'id',
            _order:'asc',
            title_like:searchText // 검색어
        }

        if(!isAdmin){ // 어드민이 아닐 경우, 쿼리스트링 인자에 퍼블리시가 참인 것만 요청.
            params = {...params, publish:true}
        }

        axios.get(`http://localhost:3001/posts`,{params})
            .then((res)=>{
                setNumberOfPosts(res.headers['x-total-count']) // 총 게시물 수 스테이트 변경.
                setLists(res.data) // 데이터 변경. 
                setLoading(false) // 로딩 해제.
                })
            .catch((e)=>{
                setError('불러오기 실패, something went wrong in db')
                addToasts({
                    text : '불러오기 실패.',
                    type : 'danger'
                })
                setLoading(false)
            })
    }

// 최초 마운트 시, 현재페이지에 해당하는 포스트를 요청.
    useEffect(() => {
        setCurrentPage(parseInt(pageParam) || 1);
        getPosts(parseInt(pageParam) || 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // 의존성 배열 무시.

// 삭제 버튼을 누를 시, 삭제하는 함수.
    const deleteBlog = (e,id) => {
        e.stopPropagation() // 이벤트 버블링 방지.
        axios.delete(`http://localhost:3001/posts/${id}`)
            .then(()=>{
                setLists(prevPost=>{ // 삭제 후 리스트 스테이트 변경.
                    return prevPost.filter(post=>{ return post.id !== id })
                })
                addToasts({
                    text : '성공적으로 삭제되었습니다.',
                    type : 'success'
                })
            })
            .catch((e)=>{
                setLoading(false)
                setError('something went wrong in db')
                addToasts({
                    text : '삭제 실패.',
                    type : 'danger'
                })
            })
    }

// 블로그 리스트 렌더 함수.
    const renderBlogList = () => {
        if(loading){
            return (
            <LoadingSpinner/>
            )
        }

// 로딩 해제 후,
// 리스트가 없으면 없다고 알리고 리턴.
    if (lists.length === 0){
        return <div>"no blog contents found"</div>
    }

// 리스트가 있으면 렌더.
    return lists.map(post=>{
        return <Card 
            id={post.id}
            key={post.id}
            title={post.title}
            onClick={()=>{navigate(`/blogs/${post.id}`)}}
            >
            {isAdmin? // 관리자면 삭제 버튼 노출.
                <div>
                    <button 
                        className='btn btn-danger btn-sm'
                        onClick={e=>{deleteBlog(e, post.id)}}>Delete
                    </button>
                </div>
            :null}
        </Card>})
    }

// 검색 버튼 엔터 시,
// 1페이지로 이동 후, 현재 페이지 스테이트 변경, 
    const onSearch = (e) => {
        if(e.key === 'Enter'){
            navigate(`${location.pathname}?page=1`)
            setCurrentPage(1);
            getPosts(1);
        }
    }

    if(error) {
        return <div>{error}</div>
    }

    return (
        <>  
            <input
                type="text"
                placeholder=" 검색"
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value)}}
                onKeyUp={onSearch}
            />
            <hr/>
            {lists.length === 0
                ? <div>"no blog contents found"</div>
                : <>
                    {renderBlogList()}
                    {numberOfPages>1 && <Pagenation
                        currentPage={currentPage}
                        numberOfPages={numberOfPages}
                        onClick={onClickPageButton}
                    />}
                </>
            }
        </>
    )
}


BlogList.propTypes ={
    isAdmin:PropTypes.bool.isRequired
}

BlogList.defaultProps = {
    isAdmin:false
}