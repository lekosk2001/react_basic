import React from 'react'
import { Link,Outlet } from 'react-router-dom'
export default function Root() {
  return (
    <>
      <nav className='navbar navbar-dark bg-dark'>
        <div className='container'>
          <Link className='navbar-brand' to="/">Home</Link>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link className='nav-link active' aria-current="page" to="blogs">blog</Link>
            </li>
          </ul>
        </div>
      </nav>

        <div className='container'>
          <Outlet/>
        </div>
    </>
  )
}
