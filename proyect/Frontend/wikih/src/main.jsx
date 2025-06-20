import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App.jsx'
import Navbar from './components/general/Navbar.jsx'
import Personajes from './pages/Personajes.jsx'
import Capitulos from './pages/Capitulos.jsx'
import About from './pages/About.jsx'
import Personaje from './pages/Personaje.jsx'
import Capitulo from './pages/Capitulo.jsx'
// import Contactos from './pages/Contactos.jsx'
import Chat from './pages/Chat.jsx'
import InicioSesion from './pages/InicioSesion.jsx'
import Resultados from './pages/Resultados.jsx'
import Registro from './pages/Registro.jsx'
import PasswordFirst from './pages/PasswordFirst.jsx'
import PasswordSecond from './pages/PasswordSecond.jsx'
import Perfil from './pages/Perfil.jsx'

import './index.css'
import Footer from './components/general/Footer.jsx'

const token = localStorage.getItem('token');
const timestamp = localStorage.getItem('token_timestamp');

if (token && timestamp) {
  const ahora = Date.now();
  const haceCuanto = ahora - parseInt(timestamp); // diferencia en milisegundos
  const limite = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

  if (haceCuanto > limite) {
    // Ha pasado más de 24 horas: eliminar los datos
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('token_timestamp');
    console.log('Token expirado y eliminado');
  } else {
    console.log('Token válido');
  }
} else {
  console.log('No hay token guardado');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Chango&display=swap');
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
    </style>
    <Navbar />
    <div className='container'>
      <div className='content'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/personaje/:id" element={<Personaje />} />
            <Route path="/resultados/:resCharIds/personaje/:id" element={<Personaje />} />
            <Route path="/capitulos" element={<Capitulos />} />
            <Route path="/resultados/:resCharIds/capitulo/:id" element={<Capitulo />} />
            <Route path="/capitulo/:id" element={<Capitulo />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/contactos" element={<Contactos />} /> */}
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/perfil" element={<Perfil />} />
            <Route path="/sesion" element={<InicioSesion />} />
            <Route path="/resultados/:resCharIds/:resChapIds" element={<Resultados />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/password" element={<PasswordFirst />} />
            <Route path="/password/:token" element={<PasswordSecond />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
      <div className='main-footer'>
        <Footer />
      </div>
  </StrictMode>
)
