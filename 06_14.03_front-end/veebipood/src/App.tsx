import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage';
import ManageProducts from './pages/ManageProducts';
import Arrayd from './pages/Arrayd';
import Menu from './components/Menu';
import ManageCategories from './pages/ManageCategories';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from './pages/Orders';
import SingleProduct from './pages/SingleProduct';
import Map from './pages/Map';
import EditProduct from './pages/EditProduct';



function App() {

  return (
    <>
      <Menu />

      {/* Siin routes kohal menüü mis kõigil nähtav */}
      <Routes>  
        <Route path="/" element={ <MainPage /> } />
        <Route path="/admin/products" element={ <ManageProducts />} />
        <Route path="/admin/categories" element={ <ManageCategories />} />
        <Route path="/admin/edit-product/:productId" element ={<EditProduct />} />

        <Route path="/arrays" element={<Arrayd />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/orders" element={ <Orders />} />
        <Route path="/product/:productId" element={ <SingleProduct /> }/>
        <Route path="/map" element={ <Map />} />

        <Route path="/*" element={ <div> Page not found </div> } />
      </Routes>
      {/* footer */}
    </>
  )
}

export default App
