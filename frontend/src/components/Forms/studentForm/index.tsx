import React, {useContext, useEffect} from "react"
import { useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import studentValidation from "./validationSchema";
import Student from "../../../inputs/student";
import { TextField, Button } from "@mui/material";
import {FieldWrapper, ButtonWrapper} from "../index.styled"
import {StudentsContext} from "../../../context/contexts/studentContext"

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
  }

const StudentForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit, formState, setError, setValue } = useForm<Student>({
        mode: "onSubmit",
        resolver: yupResolver(studentValidation),
        shouldFocusError: true
    });

    const {state, actions} = useContext(StudentsContext)

    useEffect(() => {
        if(state.selectedStudent !== null)
        {
            setValue("email", state.selectedStudent.email);
            setValue("fullName", state.selectedStudent.full_name);
        }
    }, [state.selectedStudent])

    const onSubmit = async (data: Student) => {
        if(state.selectedStudent === null)
        {
            let error = await actions.addStudent(data);
            if(error)
            {
                setError("email", {message: "Email already in use"})
                return;
            }
        }else{
            let error = await actions.editStudent(data);
            if(error)
            {
                setError("email", {message: "Email already in use"})
                return;
            }
        }
        
        setDialogState(false);
    }

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldWrapper>
                <TextField
                    {...register("fullName")}
                    fullWidth
                    variant="standard"
                    label="Full name*"
                    type="text"
                />
            </FieldWrapper>
            <FieldWrapper>
                <TextField
                    {...register("email")}
                    fullWidth
                    variant="standard"
                    label="Email*"
                    type="email"
                    error={!!formState.errors.email?.message}
                    helperText={formState.errors.email?.message}
                />
            </FieldWrapper>
            <ButtonWrapper>
                <Button onClick={() => {setDialogState(false)}}>Close</Button>
                {state.selectedStudent ? <Button type="submit">Edit</Button> :<Button type="submit">Add</Button>}
            </ButtonWrapper>
        </form>
      </>
    )
}

export default StudentForm;