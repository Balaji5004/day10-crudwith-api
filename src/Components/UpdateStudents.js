import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Base from '../Base/Base';
import { useHistory } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

function UpdateStudents({students, setStudent}) {
    const {id} = useParams();
     const editStudent = students[id]
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")
    const history = useHistory();

    useEffect(()=>{
       setName(editStudent?.name)
       setBatch(editStudent?.batch)
       setGender(editStudent?.gender)
       setQualification(editStudent?.qualification)
    }, [editStudent])

    async function updateStudent (){
         const updatedObject = {
            name : name,
            batch : batch,
            gender: gender,
            qualification :qualification
         }
     const response = await fetch(`https://64e45b63c555638029130ed9.mockapi.io/users/${editStudent.id}`, {
      method:"PUT",
      body:JSON.stringify(updatedObject),
      headers:{
        "Content-Type":"application/json"
      }
     })

     const data = await response.json()
     if(data){
         console.log(updatedObject)
         students[id] = updatedObject
         setStudent ([...students])
         history.push("/students")
     }
    }

  return (
    <Base
    title={"Edit a Student"}
    description={"Edit Stuudents data here"}
    >
    <div className='input-cols'>
    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Name"
    variant="filled"
    color="warning" focused
     type ="text"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
     />

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Batch" 
    variant="filled"
  color="warning" focused 
    type ="text"
        value ={batch}
        onChange={(e)=>setBatch(e.target.value)}
    />

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Gender" 
    variant="filled"
  color="warning" focused 
    type ="text"  
    value ={gender}
        onChange={(e)=>setGender(e.target.value)}
    />

    <TextField  
    fullWidth sx={{ m: 1 }}
    label="Enter Qualification" 
    variant="filled"
  color="warning" focused 
    type ="text" 
    value= {qualification}
    onChange={(e)=>setQualification(e.target.value)}
    />

     <Button variant="contained" color='warning'
      onClick={updateStudent}
     >Update Students</Button>
       
    </div>
</Base>
  )
}

export default UpdateStudents