import React from 'react'
import Base from '../Base/Base'
import { useHistory } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Students({ students, setStudent }) {

  const history = useHistory();
  // delete functionality
  const deleteStudent = async (studId) => {

    const response = await fetch(`https://64e45b63c555638029130ed9.mockapi.io/users/${studId}`, {
      method: "DELETE",
    });

    const data = await response.json()
    if (data) {
      const remainingStudents =
        students.filter((stud, idx) => stud.id !== studId)
      setStudent(remainingStudents)
    }
  }


  return (
    <Base
      title={"Students Dashboard"}
      description={"The page contains all students data"}
    >

      <div className='card-container'>

        {students.map((stud, idx) => (

          <Card sx={{ maxWidth: 200, height: 200 }} key={idx}>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {stud.name}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {stud.batch}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {stud.gender}
              </Typography>
              <Typography variant="body2" color="text.primary">
                {stud.qualification}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => history.push(`/edit/${stud.id}`)}>
               <EditIcon /> Edit</Button>

              <Button size="small" onClick={() => deleteStudent(stud.id)}>
                <DeleteForeverIcon />Delete</Button>
            </CardActions>
          </Card>


        ))}
      </div>

    </Base>
  )
}

export default Students