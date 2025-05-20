import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import '../page.css'

export default function PasswordFirst() { 
    const [email, setEmail] = useState('');

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    }

    const submit = async (e) => {
        e.preventDefault();
    
        if (!email.includes('@') || !email.includes('.com')) {
            toast.error('El email no es válido', toastTweaks);
            return;
        }
    
        try {
        const response = await fetch('https://proyect-7woy.onrender.com/api/v1/users/forgot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
    
        const contentType = response.headers.get('Content-Type');
    
        // Comprobar si el servidor respondió con JSON
        if (contentType && contentType.includes('application/json')) {
            const res = await response.json();
    
            if (response.ok && res.success) {
                toast.success('Envio exitoso', toastTweaks);
                window.location.href = '/sesion';
            } else {
                toast.success(res.message || 'Error en el envio del link', toastTweaks);
                console.error('Respuesta del servidor:', res);
            }
        }
    } catch (error) {
        toast.error('Error al conectar con el servidor', toastTweaks);
        console.error('Error de fetch:', error);
    }
}

    return (
        <div>
            <div className="container-form">
            <form className="signin-form" onSubmit={submit}>
                <h2>Ingresa tu correo al que enviaremos el link de recuperación</h2>
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
                    <button type="submit">Aceptar</button>
                </div>
            </form>
            <ToastContainer />
        </div>
        </div>
    )
    
} 
