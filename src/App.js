import { useState } from 'react';
import './App.css';
function App() {
  
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const onSubmit = () =>{
    console.log(title,body)
  }

  return (
    <div className="container">
      <div className='mb-3 mt-3'>
        <label className='form-lable'>Title</label>
        <input 
          className='form-control'
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
        />

        <label className='form-lable'>Body</label>
        <textarea 
          className='form-control'
          rows="20"
          value={body}
          onChange={(e)=>{setBody(e.target.value)}}
        />
      </div>
      <button className='btn btn-primary' onClick={onSubmit}>Post</button>
    </div>
  );
}

export default App;
