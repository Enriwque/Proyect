import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import '../page.css'

export default function Registro() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    }

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
    const response = await fetch('https://proyect-7woy.onrender.com/api/v1/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, age }),
    });

    const contentType = response.headers.get('Content-Type');

    // Comprobar si el servidor respondió con JSON
    if (contentType && contentType.includes('application/json')) {
        const res = await response.json();

        if (response.ok && res.success) {
            toast.success('Registro exitoso', toastTweaks);
            window.location.href = '/sesion';
        } else {
            toast.error(res.message || 'Error en el registro', toastTweaks);
            console.error('Respuesta del servidor:', res);
        }
    } else {
        const text = await response.text(); // leer como texto
        toast.error('Es posible que ya hayas estado aquí...', toastTweaks);
        console.error('Respuesta no JSON:', text);
    }
} catch (error) {
    toast.error('Error al conectar con el servidor', toastTweaks);
    console.error('Error de fetch:', error);
}


};

    return (
        <div className="container-form">
            <form className="register-form" onSubmit={submit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre de usuario:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Edad:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
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
                    <button type="submit">Aceptar</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}