import React from "react";
import { Typography, Paper } from "@mui/material";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import { Box } from "@mui/system";
import LoginForm from "./LoginForm";
import {FormWrapper, MainWrapper, ImageContainer} from "./index.styed"
import image from "../../assets/drawKit/pictureSeven.svg"


const Login:React.FC = () => {
    return (
        <MainWrapper>
            <ImageContainer>
                <img src={image} width="100%" height="90%"></img>
            </ImageContainer>
            <FormWrapper>
                <Box sx={{width: "50%", height: "40%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginLeft: "100px"}}>
                    <Box sx={{margin: "20px"}}>
                        <Typography variant="h2" fontFamily={"'Modak', cursive"}>
                        STUD.io 
                        <MenuBookRoundedIcon style={{marginLeft: "10px"}} fontSize="large"></MenuBookRoundedIcon>
                        </Typography>
                    </Box>
                    <LoginForm/>
                </Box>
            </FormWrapper>
        </MainWrapper>
    )   
}

export default Login;