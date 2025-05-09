import React from 'react'

import useFetch from './services/fetch'
import Buscador from './components/info/Buscador'

import './page.css'

function App() {

  const chars = useFetch('https://proyect-7woy.onrender.com/api/v1/wikih');

  if (!chars.result) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      <div className='welcome-container'>
        <img src={chars.result[0].images[0]} alt="Logo" className='imageChar'/>
        <div className='welcome-text'>
        <h1>¡BIENVENIDO A LA WIKI DE KONE HECHA POR FANS!</h1>
        <p>En esta wiki podrás informarte sobre los personajes de esta serie independiente, además también podrás saber información sobre los capitulos actuales ¡y charlar con fans!</p>
        <h2>¿Que quieres ver?</h2>
        <Buscador/>
        </div>
        <img src={chars.result[1].images[0]} alt="Logo" className='imageChar'/>
      </div>   

      <div className='mini-nav'>
        <table>
          <thead>
            <tr>
            <th><a href="/personajes">personajes</a></th>
            <th><a href="/capitulos">capitulos</a></th>
            </tr>
          </thead>
        </table>
      </div>   
    </>
  )
}


export default App
