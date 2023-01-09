import React from 'react'
import { Link,Outlet,NavLink } from 'react-router-dom'
export default function Root() {
  return (
    <>
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to="/">Home</Link>
          <ul className='navbar-nav' style={{flexDirection:"row"}}>

            <li className='nav-item me-2'>
              <NavLink
                activeclassname="active"
                className='nav-link'
                aria-current="page" 
                to="Admin">Admin</NavLink>
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
          <Outlet/>
        </main>
    </>
  )
}
