import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { EmployeeList } from './pages/EmployeeList';
import { CreateEmployee } from './pages/CreateEmployee';
import { EmployeeEdit } from './pages/EmployeeEdit';

const router=createBrowserRouter([

{
  path:'/',
  element:(
   <Login/>
  )
},
{
  path:'/home',
  element:(
   <Home/>
  )
},
{
  path:'/employeelist',
  element:(
   <EmployeeList/>
  )
},
{
  path:'/createemployee',
  element:(
   <CreateEmployee/>
  )
},
{
  path:'/editemployee/:_id',
  element:(
   <EmployeeEdit/>
  )
},

])
function App() {
  
  return (
    <RouterProvider router={router}/>
  );
}


export default App;
