import React, {useContext} from "react"
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Typography} from "@mui/material"
import { TaskContext } from "../../../context/contexts/taskContext";
import { convertDate, testIfDateIsInPast} from "../../../utils/helpers"
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface IProps {
    dialogState: boolean;
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskList: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {state, actions} = useContext(TaskContext);

    return (
        <TableContainer style={{height: "400px", width: "70%"}}>
          <Table aria-label="sticky table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell >Task name</TableCell>
                <TableCell>Upload until</TableCell>
                <TableCell >Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state.tasks?.map((task, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell >{convertDate(task.expiration_date)}</TableCell>
                    <TableCell>
                      {testIfDateIsInPast(task.expiration_date) ? <Typography><strong>TIME'S UP</strong></Typography> : <IconButton onClick={() => {actions.setSelectedTask(task.id); setDialogState(true)}}><UploadFileIcon/></IconButton>}
                    </TableCell>
                </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
    )
}

export default TaskList;