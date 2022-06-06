import React, {useState, useContext} from "react"
import TaskForm from "../../../components/Forms/taskForm";
import Stack from '@mui/material/Stack';
import AddTaskDialog from "../../../components/Dialogs/AddTaskDialog";
import { Card, CardActions, CardContent, Typography, Button } from "@mui/material";
import { TaskContext } from "../../../context/contexts/taskContext";
import {convertDate} from "../../../utils/helpers"

const ProfessorTasks = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);
    const {state, actions} = useContext(TaskContext);

    const handleEdit = (id: number) => {
        actions.setSelectedTask(id)
        setDialogState(true);
    }

    const handleDelete = (id: number) => {
        actions.deleteTask(id);
    }

    return (
        <>  
            <Stack sx={{ width: '70%'}} spacing={2}>
                {state.tasks?.map((task) => {
                    return (
                        <Card key={task.id}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {task.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Upload until: {convertDate(task.expiration_date )}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => {handleEdit(task.id)}}>Edit</Button>
                                <Button onClick={() => {handleDelete(task.id)}}>Delete</Button>
                            </CardActions>
                        </Card>
                    )
                })}
            </Stack>
            <AddTaskDialog dialogState={dialogState} setDialogState={setDialogState}/>
            {/* <button onClick={() => {setDialogState(!dialogState)}}>Click me</button> */}
        </>
    )

}

export default ProfessorTasks;