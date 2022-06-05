import React from 'react';
import Login from "./pages/login"
import Dashboard from './pages/dashboard';
import Students from './pages/students';
import Reports from './pages/reports';
import Tasks from "./pages/tasks"
import Progress from './pages/progress';
import Solutions from './pages/solutions';
import UserProvider from './context/contexts/userContext';
import StudentsProvider from './context/contexts/studentContext';
import DashboardProvider from './context/contexts/dashboardContext';
import TasksProvider from "./context/contexts/taskContext";
import SolutionProvider from './context/contexts/solutionContext';
import ReportsProvider from './context/contexts/reportContext';
import {BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

const App: React.FC = () => {

  return (
      <UserProvider>
        <DashboardProvider>
          <StudentsProvider>
            <SolutionProvider>
              <ReportsProvider>
              <TasksProvider>
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
              </TasksProvider>
              </ReportsProvider>
            </SolutionProvider>
          </StudentsProvider>
        </DashboardProvider>
      </UserProvider>
  );
}

export default App;
