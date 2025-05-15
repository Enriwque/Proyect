import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

// import useFetch from '../services/fetch';

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
    //     body: JSON.stringify({
    //         email,
    //         password
    //     })
    // });

    const submit = async (e) => {
    e.preventDefault();

    if (password.length < 4) {
        toast.error('La contraseña debe tener al menos 4 caracteres', toastTweaks);
        return;
    }

    if (!email.includes('@') || !email.includes('.com')) {
        toast.error('El email no es válido', toastTweaks);
        return;
    }

    try {
        const response = await fetch('https://proyect-7woy.onrender.com/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const res = await response.json();

        if (res.success) {
            toast.success('Inicio de sesión exitoso', toastTweaks);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            window.location.href = '/';
        } else {
            toast.error('Error al iniciar sesión', toastTweaks);
        }
    } catch (error) {
        toast.error('Error al iniciar sesión', toastTweaks);
        console.error(error);
    }
};

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
                <div className='form-group'>
                    <p>¿No tienes cuenta? <a href="/registro">Regístrate</a></p>
                    <p>¿Olvidaste tu contraseña? <a href="/contrasenna">Recupérala ahora</a></p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}