import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import {Link} from "react-router-dom"
import {DashboardContext} from "../../context/contexts/dashboardContext"
import { UserContext } from '../../context/contexts/userContext';
import ProfessorInfo from "./ProfessorInfo"
import StudentSuccess from './StudentSuccess';

const Info: React.FC = () => {

  const {state} = React.useContext(DashboardContext)
  const {user} = React.useContext(UserContext)

  return (
    <Stack sx={{ width: '50%'}} spacing={2}>
      {state.news?.map((singleNew, index) => { 
        if(!singleNew.hasOwnProperty("mark"))
        {
          return (
            <Alert severity="info" key={index}>
                <AlertTitle>Info</AlertTitle>
                Mario added new task - <strong><Link to="/tasks">check it out at tasks section!</Link></strong>
            </Alert>
          )
        }else{ 
          if(user.role === "student")
            return (<StudentSuccess index={index}/>)
          else
            return (<ProfessorInfo index={index}/>)
        }
      })}
    </Stack>
  );
}

export default Info;