import MainLayout from './layouts/MainLayout';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginForm from './pages/LoginForm';
import Register from './pages/Register';
import Topics from './pages/Topics';
import Posts from './pages/Posts';

function App() {
  return (
    <div className="App">
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/Topics" element={<Topics/>} />
            <Route path="/Posts" element={<Posts/>} />
          </Routes>
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;