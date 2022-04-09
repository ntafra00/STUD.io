import React, {useState} from 'react';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Student from "../../models/student"
import DeleteIcon from '@mui/icons-material/Delete';
import API from "../../utils/api/api"
import Snackbar from '@mui/material/Snackbar';

interface IProps {
  students: Student[];
  removeStudent: (id: number) => void
}

const StudentTable: React.FC<IProps> = ({students, removeStudent}) => {
  
  const handleDelete = async (id: number) => {
    try {
      let response = await API.delete(`/student/${id}`);
      if(response.status === 200)
        removeStudent(id);
    } catch (error) {
        console.log(error);
        return;
    }
  }

  return (
        <TableContainer style={{width:"80%"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell>Full name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell>Courses</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell >{student.id}</TableCell>
                  <TableCell >{student.full_name}</TableCell>
                  <TableCell >{student.email}</TableCell>
                  <TableCell>SRP</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {handleDelete(student.id)}}><DeleteIcon></DeleteIcon></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
}

export default StudentTable;