import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ManageProducts from './pages/ManageWords';
import Menu from './components/Menu';

function App() {

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={ <MainPage /> } />
        <Route path="/admin/products" element={ <ManageProducts /> } />
      </Routes>
    </>
  )
}

export default App
