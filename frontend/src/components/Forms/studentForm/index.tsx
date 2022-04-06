import React from "react"
import { useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import studentValidation from "./validationSchema";
import Student from "../../../inputs/student";
import { TextField, Button } from "@mui/material";
import {FieldWrapper, ButtonWrapper} from "./index.styled"
import API from "../../../utils/api/api"


interface IProps {
    handleClickOpen : () => void;
    handleClickClose: () => void;
}

const StudentForm: React.FC<IProps> = ({handleClickClose, handleClickOpen}) => {

    const {register, handleSubmit, setError, reset, formState } = useForm<Student>({
        mode: "onSubmit",
        resolver: yupResolver(studentValidation),
        shouldFocusError: true
    });

    const onSubmit = async (data: Student) => {
        try {
            const response = await API.post("/students")
        } catch (error) {
            
        }
    }

    return (
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
                />
            </FieldWrapper>
            <FieldWrapper>
                <TextField
                    {...register("password")}
                    fullWidth
                    variant="standard"
                    label="Password*"
                    type="text"
                />
            </FieldWrapper>
            <ButtonWrapper>
                <Button onClick={handleClickClose}>Close</Button>
                <Button type="submit">Add</Button>
            </ButtonWrapper>
        </form>
    )
}

export default StudentForm;

{/* <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{width: "400px", height: "170px"}}>
              <Box sx={{marginBottom: "15px", marginTop: "3px"}}>
                <TextField
                  {...register("email")}
                  fullWidth
                  variant="outlined"
                  label="Email*"
                  type="email"
                  error={!!formState.errors.email?.message}
                  helperText={formState.errors.email?.message !== "Invalid credentials" && formState.errors.email?.message}
                />
              </Box>
              <Box sx={{marginBottom: "10px", marginTop: "5px"}}>
                <TextField
                  {...register("password")}
                  fullWidth
                  variant="outlined"
                  label="Password*"
                  type="password"
                  error={!!formState.errors.password?.message}
                  helperText={formState.errors.password?.message === "Invalid credentials" ? "Invalid credentials" : formState.errors.password?.message}
                />
              </Box>
              <Box sx={{width: "100%", display: "flex", justifyContent: "end"}}>
                <Button style={{width: "30%"}} type="submit" variant="outlined">LOG IN</Button> 
              </Box>
              <Box sx={{width: "100%", marginTop: "10px"}}>
                <LinearProgress id="linearProgress" color="primary" style={{visibility: "hidden"}}></LinearProgress>
              </Box>
            </Box>
        </form> */}