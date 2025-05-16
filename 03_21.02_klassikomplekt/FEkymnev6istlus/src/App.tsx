import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Menu from './components/Menu'
import './App.css'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Menu/>
      <Routes>
        <Route path="/" element={ <MainPage /> } />
      </Routes>
    </>
  )
}

export default App
