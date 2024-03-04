import React,{useEffect, useState} from 'react'
import { Navbar } from './Navbar'
import { useNavigate, useParams } from 'react-router-dom'

export const EmployeeEdit = () => {
    const [userInfo, setuserInfo] = useState({
        name: '',
        email: '',
        mobile: 0,
        designation: '',
        gender: '',
        courses: '',
        image:null,
      })
  const navigate=useNavigate();
    const {_id}=useParams();
      const [errors, setErrors] = useState({})
      
    
      const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        const newValue =  type === 'file' ? files[0] : value;
        setuserInfo({ ...userInfo, [name]: newValue });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
          const updateEmployee=async()=>{
            const formData=new FormData();
            formData.append("name",userInfo.name)
            formData.append("email",userInfo.email)
            formData.append("mobile",userInfo.mobile)
            formData.append("designation",userInfo.designation)
            formData.append("gender",userInfo.gender)
            formData.append("courses",userInfo.courses)
            formData.append("image",userInfo.image)
            formData.append("username",localStorage.getItem('username'))
            try {

              const response = await fetch(`http://localhost:8080/employee/${_id}`,{
                method:'PUT',
                body:formData,
              
              });
              if (response.ok) {
                const data = await response.json();
                navigate('/employeelist')
              }
            } catch (err) {
              console.log(err);
            }
          }
          updateEmployee();
          

        } else {
          setErrors(validationErrors);
        }
      }
      useEffect(()=>{
        const  fetchEmployee=async()=>{
          try {
            console.log(_id)
            const response = await fetch(`http://localhost:8080/employee/singleemployee/${_id}`)
            if (response.ok) {
              const data = await response.json();
              setuserInfo(data)
              console.log(data)
            }
          } catch (err) {
            console.log(err);
          }
        }
        fetchEmployee()
      },[_id])
    
      const validateForm = () => {
        const errors = {};
        if (!userInfo.name.trim()) {
          errors.name = 'Name is required';
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userInfo.name.trim()) {
          errors.name = 'Name is required';
        }
        if (!userInfo.email.trim()) {
          errors.email = 'Email is required';
        } else if (!emailRegex.test(userInfo.email.trim())) {
          errors.email = 'Invalid email format';
        }
       
        if (!userInfo.mobile) {
          errors.mobile = 'Mobile number is required';
        } else if (isNaN(userInfo.mobile)) {
          errors.mobile = 'Mobile number must be numeric';
        }

        if (!userInfo.designation.trim()) {
          errors.designation = 'Designation is required';
        }
        if (!userInfo.gender.trim()) {
          errors.gender = 'Gender is required';
        }
        if (!userInfo.courses.trim()) {
          errors.courses = 'Courses is required';
        }
        const datatype=typeof userInfo.image;
       
        if(datatype!=='string' && userInfo.image){
          
          if (userInfo.image.type !== 'image/jpg' && userInfo.image.type !== 'image/png') {
              errors.image='Please select a valid JPG or PNG image';
            }
        }
        
        return errors;
      }
    
  return (
    <div className='container-fluid  '>
    <Navbar/>
    <div className='row bg-warning'>
        <div className='col'>
        Edit Employee
        </div>  
    </div>
    <div className='row my-5 '>
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                <form onSubmit={handleSubmit}>
        <div className='row mb-3'>
            <div className='col-md-4 '>
            <label>Name</label>
            </div>
            <div className='col-md-4'>
            <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
          {errors.name && <p className="error text-danger">{errors.name}</p>}
            </div>
        </div>
        <div className='row mb-3'>
            <div className=' col-md-4'>
            <label>Email</label>
            </div>
            <div className='col-md-4'>
            <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
            {errors.email && <p className="error text-danger">{errors.email}</p>}
            </div>
        </div>
        <div className='row mb-3'>
            <div className='col-md-4'>
            <label>Mobile No</label>
            </div>
            <div className='col-md-4'>
            <input type="text" name="mobile" value={userInfo.mobile} onChange={handleChange} />
            {errors.mobile && <p className="error text-danger">{errors.mobile}</p>}
            </div>
        </div>
        <div className='row mb-3'>
            <div className='col-md-4'>
            <label>Designation</label>
            </div>
            <div className='col-md-4'>
            <select name="designation" value={userInfo.designation} onChange={handleChange}>
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
          {errors.designation && <p className="error text-danger">{errors.designation}</p>}
            </div>
        </div>
        <div className='row mb-3'>
            <div className='col-md-4'>
            <label>Gender</label>
            </div>
            <div className='col-md-4'>
            <label>
            <input type="radio" name="gender" value="Male" checked={userInfo.gender === 'Male'} onChange={handleChange} />
            Male
          </label>
          <label>
            <input type="radio" name="gender" value="Female" checked={userInfo.gender === 'Female'} onChange={handleChange} />
            Female
          </label>
          {errors.gender && <p className="error text-danger">{errors.gender}</p>}
            </div>
        </div>

        <div className='row mb-3'>
            <div className='col-md-4'>
            <label>Course</label>
            </div>
            <div className='col-md-4'>
            <label>
            <input type="checkbox" name="courses" value="MCA" checked={userInfo.courses==='MCA'} onChange={handleChange} />
            MCA
          </label>
          <label>
            <input type="checkbox" name="courses" value="BCA" checked={userInfo.courses==='BCA'} onChange={handleChange} />
            BCA
          </label>
          <label>
            <input type="checkbox" name="courses" value="BSC" checked={userInfo.courses==='BSC'} onChange={handleChange} />
            BSC
          </label>
          {errors.courses && <p className="error text-danger">{errors.courses}</p>}
            </div>
        </div>
        <div className='row mb-3'>
            <div className='col-md-4'>
            <label>Img Upload</label>
            </div>
            <div className='col-md-4'>
            <input type="file" name="image" onChange={handleChange} accept=".png, .jpg" />
            {errors.image && <p className="error text-danger">{errors.image}</p>}
            </div>
        </div>
        <div className='row'>
            <div className='col-md-4'></div>
            <div className='col-md-4'>
            <button type="submit" className='btn btn-primary w-100'>Submit</button>
            </div>
        </div>
      </form>
                </div>
            
            </div>
        </div>
    
    </div>
</div>
  )
}
