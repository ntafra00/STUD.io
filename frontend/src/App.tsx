import React from 'react';
import Login from "./pages/login"
import {BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"
import Dashboard from './pages/dashboard';
import Students from './pages/students';
import Courses from './pages/courses';
import Reports from './pages/reports';
// import { UserContext } from './context/contexts/userContext';
//import API from './utils/api/api';

const App: React.FC = () => {

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login></Login>}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
          <Route path='/students' element={<Students></Students>}></Route>
          <Route path='/courses' element={<Courses></Courses>}></Route>
          <Route path ='/reports' element={<Reports></Reports>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
