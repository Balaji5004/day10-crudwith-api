import { Switch } from 'react-router-dom';
import './App.css';
import { Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import DashBoard from './Components/Dashboard';
import Students from './Components/Students';
import AddStudents from './Components/AddStudents';
import UpdateStudents from './Components/UpdateStudents';



function App() {
  const [students, setStudent] = useState([])
  
  useEffect (() => {
    const getstudent = async() => {
       const response = await fetch("https://64e45b63c555638029130ed9.mockapi.io/users",{
        method:"GET"
       })
       const data = await response.json();
       if(data){
        setStudent(data)
       }
    }
    getstudent();
  },[])

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
         <DashBoard/>
        </Route> 
        
        <Route path="/students">
        <Students
        students={students}
        setStudent={setStudent}
        />
        </Route>

        <Route path="/details">
          <Redirect to = "/students"/>
        </Route>

        <Route path="/add">
          <AddStudents
           students={students}
           setStudent={setStudent}
          />
        </Route>

        <Route path="/Edit/:id">
          <UpdateStudents
         students={students}
         setStudent={setStudent}
          />
        </Route>

        
      </Switch>
    </div>
  );
}

export default App;
