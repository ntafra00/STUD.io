import React, { useContext, useState } from "react"
import { useForm, Controller} from "react-hook-form";
import { ButtonWrapper } from "../index.styled";
import {TaskContext} from "../../../context/contexts/taskContext"
import {SolutionContext} from "../../../context/contexts/solutionContext"
import {Button, Typography, useStepContext} from "@mui/material"
import { FormWrapper } from "../../../pages/login/index.styled";

interface IProps {
    dialogState: boolean;
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const FileForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit, control} = useForm({
        mode: "onSubmit",
    });

    const {state, actions} = useContext(TaskContext);
    const solutionContext = useContext(SolutionContext)
    const [inputError, setInputError] = useState<boolean>(false)

    const onSubmit = async (data) => {
        if(!data)
        {
            setInputError(true);
            return;
        }
        console.log(state.selectedTask.id)
        let error = await solutionContext.actions.uploadSolution(data.file[0], state.selectedTask.id)
        if(!error)
        {
            actions.filterTasks(state.selectedTask.id)
            setDialogState(false);
        }
    }

    return (  
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormWrapper>
                <Controller
                    control={control}
                    name="file"
                    render={({
                      field: { onChange, name, ref },
                    }) => (
                      <input
                        onChange={onChange} // send value to hook form
                        type="file"
                      />
                    )}
                />
                {inputError && <Typography variant="h6" style={{color: "red"}}>No file given!</Typography>}
            </FormWrapper>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false); actions.removeSelectedTask()}}>Close</Button>
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </form>
    )
}

export default FileForm;