import React from 'react'
import './global.css'
import Navbar from './components/Navbar'
import MovieList from './components/MovieList'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<MovieList/>}>
          <Route path='login'/>
          <Route path='profile'/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
