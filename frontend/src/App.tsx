import React from 'react';
import Login from "./pages/login"
import Dashboard from './pages/dashboard';
import Students from './pages/students';
import Courses from './pages/courses';
import Reports from './pages/reports';
import Tasks from "./pages/tasks"
import Progress from './pages/progress';
import Solutions from './pages/solutions';
import UserProvider from './context/contexts/userContext';
import StudentsProvider from './context/contexts/studentContext';
import DashboardProvider from './context/contexts/dashboardContext';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
// import { UserContext } from './context/contexts/userContext';
//import API from './utils/api/api';

const App: React.FC = () => {

  return (
      <UserProvider>
        <DashboardProvider>
          <StudentsProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login></Login>}></Route>
              <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
              <Route path='/students' element={<Students></Students>}></Route>
              <Route path ='/reports' element={<Reports></Reports>}></Route>
              <Route path='/progress' element={<Progress></Progress>}></Route>
              <Route path='/tasks' element={<Tasks></Tasks>}></Route>
              <Route path='/solutions' element={<Solutions></Solutions>}></Route>
            </Routes>
          </BrowserRouter>
          </StudentsProvider>
        </DashboardProvider>
      </UserProvider>
  );
}

export default App;
