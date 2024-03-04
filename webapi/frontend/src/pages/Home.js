import React from 'react'
import { Navbar } from './Navbar'

export const Home = () => {
  return (
    <div className='container-fluid vh-100 border '>
        <Navbar/>
        <div className='row bg-warning'>
            <div className='col'>
            Dashboard
            </div>  
        </div>
        <div className='row my-5 '>
            <div className='col text-center'>
             <h3>Welcome Admin Panel</h3>
            </div> 
        </div>
    </div>
  )
}
