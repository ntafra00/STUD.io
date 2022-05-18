import React, {useState} from "react"
import { useForm} from "react-hook-form";
import taskValidation from "./validationSchema";
import {yupResolver} from "@hookform/resolvers/yup"
import Task from "../../../inputs/task";
import { TextField, Button } from "@mui/material";
import {FieldWrapper, ButtonWrapper} from "../index.styled"
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import API from "../../../utils/api/api"

interface IProps {
    dialogState: boolean;
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit, setError, reset, formState } = useForm<Task>({
        mode: "onSubmit",
        resolver: yupResolver(taskValidation),
        shouldFocusError: true
    });

    const [value, setValue] = React.useState<Date | null>(new Date());
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const onSubmit = async (data: Task) => {
        
        let dateToString = data.expirationDate.toISOString();
        let formatedDate = dateToString.split("T");
        let date = `${formatedDate[0]} ${formatedDate[1]}`;

        try {
            let response = await API.post("/task", {
                "name": data.name,
                "expirationDate": date,
                "courseId": 10
            })
            
            if(response.status === 200)
            {
                reset();
                setDialogState(false);
            }    
        } catch (error) {
            setError("expirationDate", {message: "Task with that name already exists"})
        }
    }

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
                />
            </FieldWrapper>
            <div style={{margin: "30px 0 0 0"}}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DateTimePicker
                    {...register("expirationDate")}
                    renderInput={(props) => <TextField {...props} variant="outlined" fullWidth helperText={formState.errors.expirationDate?.message}/>}
                    label="Expiration date"
                    value={value}
                    onChange={(newDate) => {setValue(newDate)}}
                    />
                </LocalizationProvider>
            </div>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false)}}>Close</Button>
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </form>
      </>
    )
}

export default TaskForm;