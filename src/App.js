import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyProjectsList from './Pages/MyProjectsList';
import Project from './Pages/Project';
import NotFound from './Pages/NotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/myprojectslist" element={<MyProjectsList />} />
      <Route path="/project/:code/:category" element={<Project />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
