import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

import useFetch from "../services/fetch";
import upArrow from '../assets/icons/angulo(1).png';
import downArrow from '../assets/icons/angulo.png';

import '../page.css';

export default function Perfil() {

    const [openPostIndex, setOpenPostIndex] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState(0);
    const [userName, setUserName] = useState('');

    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;


    console.log(userId);

    


    const postsData = useFetch('https://proyect-7woy.onrender.com/api/v1/posts');
    const userData = useFetch(`https://proyect-7woy.onrender.com/api/v1/users/${userId}`);

    if (!postsData.result || !userData.result) {
        return <p>Loading...</p>;
    }

    const posts = postsData.result;
    const userDat = userData.result[0];

    const toggleComments = (index) => {
        setOpenPostIndex(openPostIndex === index ? null : index);
    };

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    };


    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('token_timestamp');
        window.location.href = '/';
    }

    const editProfile = () => {
    if (!userId || !token) {
        console.warn('Faltan datos para actualizar el perfil');
        return;
    }

    fetch(`https://proyect-7woy.onrender.com/api/v1/users/update/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: userName, email, age: edad })
    })
    .then(async res => {
                const contentType = res.headers.get("content-type");

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Error HTTP ${res.status}: ${text}`);
                }

                if (contentType && contentType.includes("application/json")) {
                    return await res.json();
                } else {
                    throw new Error('Respuesta no es JSON');
                }
            })
    .then(data => {
        if (data.success) {
            setShowPopup(false);
            toast.success('Perfil actualizado', toastTweaks);
            window.location.reload();
        } else {
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(data));
            window.location.reload();
            
            toast.error('Error al actualizar el perfil', toastTweaks);
        }
    })
    .catch(err => {
        console.error('Error:', err);
        toast.error('Error al actualizar el perfil', toastTweaks);
    });
};

    const removeAccount = async () => {
        alert('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
        fetch(`https://proyect-7woy.onrender.com/api/v1/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async res => {
                const contentType = res.headers.get("content-type");

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Error HTTP ${res.status}: ${text}`);
                }

                if (contentType && contentType.includes("application/json")) {
                    return await res.json();
                } else {
                    throw new Error('Respuesta no es JSON');
                }
            })
            .then(data => {
                if (data.success) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    localStorage.removeItem('token_timestamp');
                    window.location.href = '/';
                    toast.success('Usuario eliminado correctamente', toastTweaks);
                } else {
                    toast.error('Error al eliminar el usuario', toastTweaks);
                }
            })
            .catch(err => {
                console.error('Error al eliminar:', err);
                toast.error('Error al eliminar el usuario', toastTweaks);
            });
    }

    

    function formatDate(initialDate) {
        const date = new Date(initialDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="container-form" id="editProfile">
            <div>
                <h2>Bienvenido: {userDat.name}</h2>

                <div className="profile-info">
                    <h3>Perfil</h3>
                    <p><strong>Nombre:</strong> {userDat.name}</p>
                    <p><strong>Email:</strong> {userDat.email}</p>
                    <p><strong>Edad:</strong> {userDat.age ? userDat.age : 'desconocido'}</p>
                </div>

                { showPopup && (
                    <div className="popup-overlay" >
                        <div className="popup-content">
                            <h2>Editar perfil</h2>
                            <form >
                                <label>
                                    Nombre:
                                    <input type="text" name="name" defaultValue={userDat.name} onChange={(e) => setUserName(e.target.value)}/>
                                </label>
                                <label>
                                    Email:
                                    <input type="email" name="email" defaultValue={userDat.email} onChange={(e) => setEmail(e.target.value)}/>
                                </label>
                                <label>
                                    Edad:
                                    <input type="number" name="age" defaultValue={userDat.age} onChange={(e) => setEdad(e.target.value)}/>
                                </label>
                                <button type="button" onClick={editProfile} className="toggle-comment">Guardar cambios</button>
                            </form>
                            <button className="toggle-comment" onClick={() => setShowPopup(false)}>Cerrar</button>
                        </div>
                    </div>
                )}

                <div>
                    <h3>Tus posts</h3>

                    <div className="chat-container-profile">
                        {posts.map((post, index) => (
                            <div key={index}>
                                {post.user === userDat.name && (
                                    <div className="post">
                                        <p>{post.user}</p>
                                        <p>{post.text}</p>
                                        {post.images.map((image, index) => (
                                            <img key={index} src={image} alt={`Post image ${index + 1}`} />
                                        ))}
                                        <p>{formatDate(post.date)}</p>

                                        <button onClick={() => toggleComments(index)} className="toggle-comments">
                                            {openPostIndex === index ? <img src={upArrow} alt='flechita parriba' /> : <img src={downArrow} alt='flechita pabajo' />}
                                        </button>

                                        {openPostIndex === index && (
                                            <div className="comments">
                                                {post.comments.map((comment, cIndex) => (
                                                    <div key={cIndex} className="comment">
                                                        <p>{comment.user}</p>
                                                        <p>{comment.text}</p>
                                                        <p>{formatDate(comment.date)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                </div>

                <div className="profile-buttons">
                    <div>
                    <button className="toggle-comment" onClick={logOut}>Cerrar sesión</button>
                </div>

                <div>
                    <a href="#editProfile"><button className="toggle-comment" onClick={() => setShowPopup(true)}>Editar perfil</button></a>
                </div>

                <div>
                    <button className="toggle-comment" onClick={removeAccount}>Eliminar cuenta</button>
                </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}