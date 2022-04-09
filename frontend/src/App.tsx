import React from 'react';
import Login from "./pages/login"
import Dashboard from './pages/dashboard';
import Students from './pages/students';
import Courses from './pages/courses';
import Reports from './pages/reports';
import Tasks from "./pages/tasks"
import Progress from './pages/progress';
import UserProvider from './context/contexts/userContext';
import {BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
// import { UserContext } from './context/contexts/userContext';
//import API from './utils/api/api';

const App: React.FC = () => {

  return (
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login></Login>}></Route>
            <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
            <Route path='/students' element={<Students></Students>}></Route>
            <Route path='/courses' element={<Courses></Courses>}></Route>
            <Route path ='/reports' element={<Reports></Reports>}></Route>
            <Route path='/progress' element={<Progress></Progress>}></Route>
            <Route path='/tasks' element={<Tasks></Tasks>}></Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
  );
}

export default App;
