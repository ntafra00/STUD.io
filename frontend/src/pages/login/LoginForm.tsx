import React from "react";
import { useForm} from "react-hook-form";
import loginValidation from "./validationSchema";
import {yupResolver} from "@hookform/resolvers/yup"
import Login from "../../inputs/login";
import { TextField, Button, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import API from "../../utils/api/api"
import {useNavigate } from "react-router-dom"
import { useContext } from "react";
import {UserContext} from "../../context/contexts/userContext"

const LoginForm:React.FC = () => {
  
    const userContext = useContext(UserContext)
    const navigate = useNavigate();
    const {register, handleSubmit, setError, reset, formState } = useForm<Login>({
        mode: "onSubmit",
        resolver: yupResolver(loginValidation),
        shouldFocusError: true
    });

    const onSubmit = async (data: Login) => {
      try {
        const serverResponse = await API.post("/auth/login", {
          email: data.email,
          password: data.password
        })
        if(serverResponse.status === 200)
        {
          await userContext.actions.setUser(serverResponse.data.data);
          document.getElementById("linearProgress")!.style.visibility = "visible"
          setTimeout(() => {
            navigate("/dashboard");
            reset();
          }, 2000)
        }
      } catch (error) {
        setError("password", {message:"Invalid credentials"})
        setError("email", {message: "Invalid credentials"})
      }
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
    )
}

export default LoginForm;