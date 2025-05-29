import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import '../page.css'

// TODO

export default function PasswordSecond() { 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    }

    const reseToken = decodeURIComponent(window.location.pathname.split('/password/')[1]);
    console.log(decodeURIComponent(reseToken));
    console.log(JSON.parse(atob(reseToken.split('.')[1])));

const submit = async (e) => {
    e.preventDefault();

    if (password.length < 4) {
        toast.error('La contraseña debe tener al menos 4 caracteres', toastTweaks);
        return;
    }

    if (password !== confirmPassword) {
        toast.error('Las contraseñas no coinciden', toastTweaks);
        return;
    }

    try {
        const response = await fetch(`http://localhost:2005/api/v1/users/forgot/${reseToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newPassword: password })
        });

        const contentType = response.headers.get('Content-Type');

        if (contentType && contentType.includes('application/json')) {
            const res = await response.json();

            if (res.success) {
                toast.success('Cambio exitoso', toastTweaks);
                window.location.href = '/sesion';
            } else {
                toast.error(res.message || 'Error en el cambio de contraseña', toastTweaks);
                console.error('Respuesta del servidor:', res);
            }
        } else {
            const text = await response.text();
            toast.error('Es posible que ya hayas estado aquí...', toastTweaks);
            console.error('Respuesta no JSON:', text);
        }
    } catch (error) {
        toast.error('Error al conectar con el servidor', toastTweaks);
        console.error('Error de fetch:', error);
    }
};

    return (
        <div>
            <div>
            <div className="container-form">
            <form className="signin-form" onSubmit={submit}>
                <h2>¡Es hora de cambiar tu contraseña!</h2>
                <div className="form-group">
                    <label htmlFor="password">Nueva contraseña:</label>
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
                    <label htmlFor="confirmPassword">Confirma tu contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Aceptar</button>
                </div>
            </form>
            <ToastContainer />
        </div>
        </div>
        </div>
    )
}