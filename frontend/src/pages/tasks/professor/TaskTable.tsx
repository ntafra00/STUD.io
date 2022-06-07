import React, {useContext} from "react";
import { IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { TaskContext } from "../../../context/contexts/taskContext";
import {convertDate} from "../../../utils/helpers"

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
  }

const TaskTable: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {state, actions} = useContext(TaskContext);

    const handleEdit = (id: number) => {
        actions.setSelectedTask(id)
        setDialogState(true);
    }

    const handleDelete = (id: number) => {
        actions.deleteTask(id);
    }

    return (
        <TableContainer style={{height: "400px"}}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell >ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell >Upload until</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state?.tasks?.map((task, index) => (
                <TableRow
                  key={index}
                >
                  <TableCell >{task.id}</TableCell>
                  <TableCell >{task.name}</TableCell>
                  <TableCell >{convertDate(task.expiration_date)}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => {handleDelete(task.id)}}><DeleteIcon></DeleteIcon></IconButton>
                    <IconButton onClick={() => {actions.setSelectedTask(task.id); setDialogState(true);}}><EditIcon></EditIcon></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default TaskTable;