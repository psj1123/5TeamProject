import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyProjectsList from './Pages/MyProjectsList';
import Project from './Pages/Project';
import NotFound from './Pages/NotFound';
import { UserDataProvider } from './Contexts/UserData';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <UserDataProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myprojectslist" element={<MyProjectsList />} />
        <Route path="/project" element={<Project />} />
        <Route path="/project/:projectcode" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserDataProvider>
  </BrowserRouter>
);
