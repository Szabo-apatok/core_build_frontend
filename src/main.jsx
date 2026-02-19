import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Kezdolap from '../src/pages/Kezdolap.jsx'
import RegPage from '../src/pages/RegPage.jsx'
import Login from '../src/pages/Login.jsx'
import Homepage from '../src/pages/Homepage.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Kezdolap />} />
      <Route path="/register" element={<RegPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/homepage' element={<Homepage />} />
    </Routes>
  </BrowserRouter>,
)
