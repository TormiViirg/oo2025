import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // className="accordion"
import './index.css' // .accordion {width: 500px !important;}
import './i18n.ts';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </StrictMode>,
)
