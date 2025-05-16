import { Route, Routes } from 'react-router-dom'
import './App.css'
import Menu from './components/Menu'
import MainPage from './pages/MainPage';
import ManageToDos from './pages/ManageToDos';

function App() {

  return (
    <>
      <Menu/>
      <Routes>
        <Route path="/ToDos" element={ <MainPage /> } />
        <Route path="/admin/manageToDos" element={ <ManageToDos /> } />
      </Routes>
    </>
  )
}

export default App
