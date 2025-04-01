
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ManageProducts from './pages/ManageProducts';
import Arrayd from './pages/Arrayd';
import Menu from './components/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';

function App() {

  return (
    <>

      <Menu />

      {/* Siin routes kohal menüü mis kõigil nähtav */}
      <Routes>  
        <Route path="/" element={ <MainPage />} />
        <Route path="/admin/products" element={ <ManageProducts />} />

        <Route path="/arrays" element={ <Arrayd />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/orders" element={ <Orders />} />

        <Route path="/*" element={ <div>Page not found</div> />} />
      </Routes>
      {/* footer */}
    </>
  )
}

export default App
