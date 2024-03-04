import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export const Navbar = () => {
  const navigate=useNavigate();
  const handlesignout=()=>{
    localStorage.removeItem('username');
    navigate('/login')
  }
  return (
    <div className='row border'>
            <div className='col-md-4 text-center'><Link to='/home' className='text-dark text-decoration-none'>Home</Link></div>
            <div className='col-md-2 text-start'><Link to='/employeelist' className='text-dark text-decoration-none'>Employee List</Link></div>
            <div className='col-md-4 text-end'>{localStorage.getItem('username')}</div>
            <div className='col-md-2 text-center'><Link to='/' className='text-dark text-decoration-none' onClick={handlesignout}>Logout</Link></div>
        </div>
  )
}

