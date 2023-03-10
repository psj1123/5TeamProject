import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import MyProjectsList from './Pages/MyProjectsList';
import Project from './Pages/Project';
import NotFound from './Pages/NotFound';
import { UserDataConsumer } from './Contexts/UserData';

const App = () => {
  return (
    <UserDataConsumer>
      {({ state }) => {
        return (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/myprojectslist/:email"
              element={<MyProjectsList state={state} />}
            />
            <Route path="/project/:code/:category" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        );
      }}
    </UserDataConsumer>
  );
};

export default App;
