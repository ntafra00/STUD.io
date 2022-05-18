import React from "react"
import Grid from "@mui/material/Grid";
import Task from "../../models/task"
import TaskCard from "./TaskCard"

interface IProps {
    tasks: Task[];
}


const TaskList: React.FC<IProps> = ({tasks}) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
            {tasks.map((task) => {
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