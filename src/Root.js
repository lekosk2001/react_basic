import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link,Outlet,NavLink } from 'react-router-dom'
import Toast from './components/Toast'
import useToasts from './hooks/toast'
import { logIn, logOut } from './store/authSlice'

export default function Root() {

  const {toasts,addToasts,deleteToast} = useToasts()
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
  const dispatch = useDispatch()

  console.log(Root)
  
  return (
    <>
    <Toast
      toasts={toasts}
      deleteToast={deleteToast}
    />
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to="/">Home</Link>
          <ul className='navbar-nav' style={{flexDirection:"row"}}>

            <li className='nav-item me-2'>
              <button
                className='text-white btn btn-link text-decoration-none'
                onClick={()=>{isLoggedIn?dispatch(logOut()):dispatch(logIn())}}
              >
                {isLoggedIn?"Logout":"Login"}
              </button>
            </li>

            <li className='nav-item me-2'>
              <NavLink
                activeclassname="active"
                className='nav-link'
                aria-current="page" 
                to="admin">Admin</NavLink>
            </li>

            <li className='nav-item'>
              <NavLink
                activeclassname="active"
                className='nav-link'
                aria-current="page" 
                to="blogs">blog</NavLink>
            </li>

          </ul>
        </div>
      </nav>
        <main className='container pt-3'>
          <Outlet context={addToasts}/>
        </main>
    </>
  )
}
