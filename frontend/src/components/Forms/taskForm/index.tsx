import React, {useEffect, useState, useContext} from "react"
import { useForm} from "react-hook-form";
import taskValidation from "./validationSchema";
import {yupResolver} from "@hookform/resolvers/yup"
import { TextField, Button } from "@mui/material";
import {Task} from "../../../inputs/task"
import {FieldWrapper, ButtonWrapper} from "../index.styled"
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {testIfDateIsInPast} from "../../../utils/helpers"
import {TaskContext} from "../../../context/contexts/taskContext"

interface IProps {
    dialogState: boolean;
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit, setError, reset, formState, setValue} = useForm<Task>({
        mode: "onSubmit",
        shouldFocusError: true,
        resolver: yupResolver(taskValidation),
    });

    const {state, actions} = useContext(TaskContext)

    const [dateValue, setDateValue] = React.useState<Date | null>(state.selectedTask ? state.selectedTask.expiration_date : null);

    const onSubmit = async (data: Task) => {

        if(testIfDateIsInPast(dateValue))
        {
            setError("expirationDate", {message: "Invalid date input"})
            return;
        }

        let localDate = new Date(new Date(dateValue).getTime() + 2 * 60 * 60 * 1000);
        let dateToString = localDate.toISOString();
        let formatedDate = dateToString.split("T");
        let date = `${formatedDate[0]} ${formatedDate[1]}`;

        if(state.selectedTask)
        {   
            let error = await actions.updateTask({"name": data.name, "expiration_date": date})
            if(error)
            {
                setError("expirationDate", {message: "Task with given name already exists"})
                setError("name", {message: "Task with given name already exists"})
                return;
            }
        }else{
            let error = await actions.addNewTask({"name": data.name, "expirationDate": date})
            if(error)
            {
                setError("expirationDate", {message: "Task with given name already exists"})
                setError("name", {message: "Task with given name already exists"})
                return;
            }
        }

        setDialogState(false);
    }

    useEffect(() => {
        if(state.selectedTask)
            setValue("name", state.selectedTask.name)
    }, [state.selectedTask])

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldWrapper>
                <TextField
                    {...register("name")}
                    fullWidth
                    variant="standard"
                    label="Name*"
                    type="text"
                    error={!!formState.errors.name?.message}
                    helperText={formState.errors.name?.message}
                />
            </FieldWrapper>
            <div style={{margin: "30px 0 0 0"}}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DateTimePicker
                    {...register("expirationDate")}
                    renderInput={(props) => <TextField {...props} variant="outlined" fullWidth error={!!formState.errors.expirationDate?.message} helperText={formState.errors.expirationDate?.message}/>}
                    label="Expiration date*"
                    value={(state.selectedTask && dateValue === null) ? new Date(new Date(state.selectedTask.expiration_date).getTime() - 2 * 60 * 60 * 1000) : dateValue}
                    onChange={(newDate) => {setDateValue(newDate)}}
                    />
                </LocalizationProvider>
            </div>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false); actions.removeSelectedTask()}}>Close</Button>
                {state.selectedTask ? <Button type="submit">Edit</Button> : <Button type="submit">Add</Button>
}
            </ButtonWrapper>
        </form>
      </>
    )
}

export default TaskForm;