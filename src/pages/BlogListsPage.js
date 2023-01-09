import BlogList from '../components/BlogList'

export default function BlogListsPage() {
  return (
    <div className='list-group'>
      <div className='d-flex justify-content-between'>
        <h1>Blogs</h1>
      </div>
      <BlogList/>
    </div>
  )
}
