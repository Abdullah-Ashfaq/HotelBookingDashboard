import React, { useState } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import { Navigate } from 'react-router-dom'
import './App.css'

const App = () => {
  const [isAuth, setisAuth] = useState()

  const handleLogin = () => {
    setisAuth(true);
  }
  return (
    <>
    <Router>
      <Routes>
      <Route path='/' element={<Login onLogin={handleLogin} />} />
      <Route path='home' element= {isAuth ? <Home /> : <Navigate to='/' />} />
      </Routes>
    </Router>
    
    
    
    </>
  )
}

export default App