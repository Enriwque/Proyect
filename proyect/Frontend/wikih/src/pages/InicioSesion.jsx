import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import useFetch from '../services/fetch';

export default function InicioSesion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    }

    // const fetchData = useFetch('https://proyect-7woy.onrender.com/api/v1/users/login', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': *
    //     },
    //     body: JSON.stringify({
    //         email,
    //         password
    //     })
    // });

    const submit = (e) => {
        e.preventDefault();
        if (password.length < 4) {
            toast.error('La contraseña debe tener al menos 4 caracteres', toastTweaks)
        }
        if (!email.includes('@') || !email.includes('.com')) {
            toast.error('El email no es válido', toastTweaks)
        }
        // try {
        //     fetchData.result.then((res) => {
        //         if (res.success) {
        //             toast.success('Inicio de sesión exitoso', toastTweaks);
        //             localStorage.setItem('token', res.token);
            
        //             // Redirige con el token en la URL
        //              const token = encodeURIComponent(res.token);
        //             window.location.href = `/sesion?token=${token}`;
        //          } else {
        //             toast.error('Error al iniciar sesión', toastTweaks);
        //         }
        //         });
        //         } catch (error) {
        //             toast.error('Error al iniciar sesión', toastTweaks);
        //             console.log(error);
        //         }
             }

    return (
        <div className="container-signin">
            <form className="signin-form" onSubmit={submit}>
                <h1>Iniciar Sesión</h1>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Iniciar Sesión</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}