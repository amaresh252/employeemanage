import React, { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';

export const EmployeeList = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:8080/employee/${username}`);
        
        if (response.ok) {
          const data = await response.json();
          setEmployeeData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    try {
      const response = await fetch(`http://localhost:8080/employee/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const data = await response.json();
        setEmployeeData(prevData => prevData.filter(data => data._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  
  const filteredEmployees = employeeData.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className='container-fluid'>
      <Navbar />
      <div className='row bg-warning'>
        <div className='col'>
          Employee List
        </div>  
      </div>
        
      <div className='row'>
        <div className='col-md-8'></div>
        <div className='col-md-4'>
          <div className='row'>
            <div className='col-md-4 '>
              Total Count: {employeeData.length}
            </div>
            <div className='col-md-6 bg-success me-1'>
              <Link to='/createemployee' className='text-decoration-none text-dark'>Create Employee</Link>
            </div>
          </div>
        </div>
      </div>
        
      <div className='row bg-secondary'>
        <div className='col-md-8'></div>
        <div className='col-md-4 '>
          <div className='row'>
            <div className='col-md-2 '>
              Search
            </div>
            <div className='col-md-10 pe-0'>
              <input
                className="w-100 text-center"
                type='text'
                name='search'
                placeholder='Input Search Keyword'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
        
      <div className='row '>
        <table className="table table-bordered">
          <thead>
            <tr className="table-secondary">
              <th scope="col">Unique Id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile No</th>
              <th scope="col">Designation</th>
              <th scope="col">gender</th>
              <th scope="col">Course</th>
              <th scope="col">Created date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(data => (
              <tr key={data._id}>
                <th scope="row">{data._id}</th>
                <td><img className='img-fluid' src={`http://localhost:8080/${data.image}`} height={80} width={80} alt="Employee" /></td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.mobile}</td>
                <td>{data.designation}</td>
                <td>{data.gender}</td>
                <td>{data.courses}</td>
                <td>{data.createddate}</td>
                <td>
                  <Link className='text-dark text-decoration-none' to={`/editemployee/${data._id}`}>Edit</Link> -
                  <button className="btn btn-dark" onClick={(e) => handleDelete(e, data._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    </div>
  );
};
