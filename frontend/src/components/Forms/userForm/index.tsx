import React, {useContext} from "react";
import { useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup"
import { TextField, Button } from "@mui/material";
import {FieldWrapper, ButtonWrapper} from "../index.styled"
import userValidation from "./validationSchema";
import UserInfo from "../../../inputs/userInfo";
import {UserContext} from "../../../context/contexts/userContext"

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const UserForm: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {register, handleSubmit, formState, setError, setValue } = useForm<UserInfo>({
        mode: "onSubmit",
        resolver: yupResolver(userValidation),
        shouldFocusError: true
    });

    const {actions} = useContext(UserContext);

    const onSubmit = async (data: UserInfo) => {
        if(data.password !== data.repeatedPassword)
        {
            setError("repeatedPassword", {message: "Passwords do not match"});
            return;
        }

        let error = await actions.editUser(data.password)
        if(error)
        {
            setError("repeatedPassword", {message: "Something went wrong"})
            return;
        }
    }

    return (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
              <FieldWrapper>
                  <TextField
                      {...register("password")}
                      fullWidth
                      variant="standard"
                      label="New password*"
                      type="password"
                      error={!!formState.errors.password?.message}
                      helperText={formState.errors.password?.message}
                  />
              </FieldWrapper>
              <FieldWrapper>
                  <TextField
                      {...register("repeatedPassword")}
                      fullWidth
                      variant="standard"
                      label="Repeated password*"
                      type="password"
                      error={!!formState.errors.repeatedPassword?.message}
                      helperText={formState.errors.repeatedPassword?.message}
                  />
              </FieldWrapper>
              <ButtonWrapper>
                  <Button onClick={() => {setDialogState(false)}}>Close</Button>
                  <Button type="submit">Edit</Button> 
              </ButtonWrapper>
          </form>
        </>
      )
}

export default UserForm;