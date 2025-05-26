import Logotipo from "../../assets/Logotipo letra.png";

import '../../index.css';

export default function Navbar() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        return (
            <>
            <ul className="navbar">
                <ul>
                    <li><a href="/"><img src={Logotipo} alt="icono" /></a></li>
                </ul>
                <ul className="navbar-links">
                    <li><a href="/personajes">personajes</a></li>
                    <li><a href="/capitulos">capitulos</a></li>
                    <li><a href="/about">about</a></li>
                    <li><a href="/contactos">contactos</a></li>
                </ul>
                <ul>
                    <li><a href="/sesion"><button className="sign">iniciar sesión</button></a></li>
                </ul>
            </ul>
            </>
        )
    }
    return (
        <>
        <ul className="navbar">
            <ul>
                <li><a href="/"><img src={Logotipo} alt="icono" /></a></li>
            </ul>
            <ul className="navbar-links">
                <li><a href="/personajes">personajes</a></li>
                <li><a href="/capitulos">capitulos</a></li>
                <li><a href="/about">about</a></li>
                <li><a href="/contactos">contactos</a></li>
                <li><a href="/chat">chat</a></li>
            </ul>
        </ul>
        </>
    )
}