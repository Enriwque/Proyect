import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

import useFetch from "../services/fetch";
import upArrow from '../assets/icons/angulo(1).png';
import downArrow from '../assets/icons/angulo.png';

import '../page.css';

export default function Perfil() {

    const [openPostIndex, setOpenPostIndex] = useState(null);

    const token = localStorage.getItem('token');
    const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;


    console.log(userId);

    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);

    const data = useFetch('https://proyect-7woy.onrender.com/api/v1/posts');

    if (!data.result) {
        return <p>Loading...</p>;
    }

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
                    toast.success('Usuario eliminado correctamente', toastTweaks);
                    window.location.href = '/';
                } else {
                    toast.error('Error al eliminar el usuario', toastTweaks);
                }
            })
            .catch(err => {
                console.error('Error al eliminar:', err);
                toast.error('Error al eliminar el usuario', toastTweaks);
            });
    }

    const posts = data.result;

    function formatDate(initialDate) {
        const date = new Date(initialDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="container-form">
            <div>
                <h2>Bienvenido: {user.name}</h2>

                <div>
                    <h3>Perfil</h3>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Edad:</strong> {user.age ? user.age : 'desconocido'}</p>
                </div>

                <div>
                    <h3>Tus posts</h3>

                    <div className="chat-container-profile">
                        {posts.map((post, index) => (
                            <div key={index}>
                                {post.user === user.name && (
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

                <div>
                    <button className="toggle-comment" onClick={logOut}>Cerrar sesión</button>
                </div>

                <div>
                    <button className="toggle-comment" onClick={removeAccount}>Eliminar cuenta</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}