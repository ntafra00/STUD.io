import React, {useContext} from "react"
import Grid from "@mui/material/Grid";
import TaskCard from "./TaskCard"
import { TaskContext } from "../../../context/contexts/taskContext";


const TaskList: React.FC = () => {

    const {state, actions} = useContext(TaskContext);

    return (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 2}}>
            {state.tasks.map((task) => {
                return (
                    <Grid item key={task.id} xs={4}>
                        <TaskCard expiration_date={task.expiration_date} name={task.name} id={task.id}></TaskCard>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default TaskList;