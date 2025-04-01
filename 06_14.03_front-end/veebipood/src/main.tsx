import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from 'react-router-dom'
//navigeerimine laseb URL vahetada, npm i react-router-dom
//import BrowserRouter hear ja ümbritseda <App /> ümber
//Seosed failide ja url vahel app.tsx failis
//localhoast:5137 ja

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
