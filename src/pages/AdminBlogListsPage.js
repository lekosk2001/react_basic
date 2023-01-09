import { Link  } from 'react-router-dom'
import BlogList from '../components/BlogList'

export default function AdminBlogListsPage() {

  return (
    <div className='list-group'>
      <div className='d-flex justify-content-between'>
        <h1>Admin</h1>
        <div>
          <Link to='/blogs/create' className='btn btn-success'>Create New</Link>
        </div>
      </div>
      <BlogList isAdmin={true}/>
    </div>
  )
}
