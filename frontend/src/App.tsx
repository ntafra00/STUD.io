import React from 'react';
import Login from "./pages/login"
import {BrowserRouter, Route, Routes } from "react-router-dom"
import "./index.css"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
