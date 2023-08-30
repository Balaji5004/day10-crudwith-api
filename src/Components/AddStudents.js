import React, { Fragment, useState } from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom'
import { Button, IconButton, Snackbar, TextField } from '@mui/material'


function AddStudents({students, setStudent}) {
  const history = useHistory()
    const [name, setName] = useState("")
    const [batch, setBatch] = useState("")
    const [gender, setGender] = useState("")
    const [qualification, setQualification] = useState("")

    const [open, setOpen] = useState(false);


    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
      history.push("/students")
    };
  
    const action = (
      <Fragment>
        <Button color="secondary" size="small" onClick={handleClose}>
          UNDO
        </Button>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
         close
        </IconButton>
      </Fragment>
     );

const createStudent = async () =>{
    // creating object from input states
    const newStudents = {
      name:name,
      batch:batch,
      qualification:qualification,
      gender: gender,
}

const response = await fetch("https://64e45b63c555638029130ed9.mockapi.io/users", {
  method:"POST",
  body:JSON.stringify(newStudents),
  headers :{
    "Content-Type":"application/json"
  },
})
const data = await response.json()
  setStudent([...students, data])
  handleClick()
}

  return (
    <Base
    title={"Add New Student"}
    description={"We can able to add new students data here"}
    >
    <div className='input-cols'>
    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Name"
     variant="filled" 
     color="success" focused
     type ="text"
        value = {name}
        onChange={(e)=>setName(e.target.value)}
     />

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Batch" 
    variant="filled" 
    color="success" focused 
    type ="text"
        value ={batch}
        onChange={(e)=>setBatch(e.target.value)}
    />

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Gender" 
    variant="filled" 
    color="success" focused 
    type ="text"  
    value ={gender}
        onChange={(e)=>setGender(e.target.value)}
    />

    <TextField 
    fullWidth sx={{ m: 1 }}
    label="Enter Qualification" 
    variant="filled" 
    color="success" focused 
    type ="text" 
    value= {qualification}
    onChange={(e)=>setQualification(e.target.value)}
    />

     <Button variant="contained" color='success'
      onClick={createStudent}
     >Add Students</Button>
       
       
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message="Added Successfully"
        action={action}
      />

    </div>
    </Base>
  )
}

export default AddStudents