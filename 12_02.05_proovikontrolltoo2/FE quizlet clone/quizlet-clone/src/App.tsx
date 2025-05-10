import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ManageWords from './pages/ManageWords';
import EditWords from './pages/EditWords';
import Menu from './components/Menu';


function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/admin/words" element={ <ManageWords /> } />
        <Route path="/admin/words/:wordId" element={ <EditWords /> } />
      </Routes>
    </>
  )
}

export default App
