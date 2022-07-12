import React, { useContext, useState } from "react"
import { useForm, Controller} from "react-hook-form";
import { ButtonWrapper } from "../index.styled";
import {TaskContext} from "../../../context/contexts/taskContext"
import {SolutionContext} from "../../../context/contexts/solutionContext"
import { DashboardContext } from "../../../context/contexts/dashboardContext";
import {Button, Typography, useStepContext} from "@mui/material"

interface IProps {
    dialogState: boolean;
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const FileForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit} = useForm({
        mode: "onSubmit",
    });

    const {state, actions} = useContext(TaskContext);
    const solutionContext = useContext(SolutionContext);
    const dashboardContext = useContext(DashboardContext);
    const [inputError, setInputError] = useState<boolean>(false)

    const onSubmit = async (data) => {
        if(data.file.length === 0)
        {
            setInputError(true);
            return;
        }
        let error = await solutionContext.actions.uploadSolution(data.file[0], state.selectedTask.id)
        if(!error)
        {
            actions.filterTasks(state.selectedTask.id)
            setDialogState(false);
            dashboardContext.actions.removeInfoFromStudentDashboard(state.selectedTask.id);
        }
    }

    return (  
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{width: "100%", display: "flex", flexDirection: "column"}}>
                <label>Select which file you want to upload: </label>
                <input {...register("file")} type="file" name="file" style={{margin: "10px 0 0 0"}}/>
                {inputError && <Typography variant="subtitle1" style={{color: "red", margin: "30px 0 0 0"}}>No file given!</Typography>}
            </div>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false); actions.removeSelectedTask()}}>Close</Button>
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </form>
    )
}

export default FileForm;