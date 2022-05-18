import React, {useState, useContext} from 'react';
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { StudentsContext } from '../../context/contexts/studentContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentTable: React.FC<IProps> = ({dialogState, setDialogState}) => {
  
  const {state, actions} = useContext(StudentsContext)

  const handleDelete = (id: number) => {
    actions.removeStudent(id);
  }

  return (
        <TableContainer style={{width:"80%"}}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell>Full name</TableCell>
                <TableCell >Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.students?.map((student) => (
                <TableRow
                  key={student.id}
                >
                  <TableCell >{student.id}</TableCell>
                  <TableCell >{student.full_name}</TableCell>
                  <TableCell >{student.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {handleDelete(student.id)}}><DeleteIcon></DeleteIcon></IconButton>
                    <IconButton onClick={() => {actions.setSelectedStudent(student.id); setDialogState(true);}}><EditIcon></EditIcon></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  );
}

export default StudentTable;