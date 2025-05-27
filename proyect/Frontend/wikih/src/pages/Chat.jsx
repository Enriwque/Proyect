import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import useFetch from "../services/fetch";
import upArrow from '../assets/icons/angulo(1).png';
import downArrow from '../assets/icons/angulo.png';

import '../page.css';

export default function Chat() {
    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);

    const [commentText, setCommentText] = useState('');
    const [postText, setPostText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showPostPopup, setShowPostPopup] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [openPostIndex, setOpenPostIndex] = useState(null);

    useEffect(() => {
        if (!imageFile) return;

        const objectUrl = URL.createObjectURL(imageFile);
        console.log('Object URL:', objectUrl);

        setPreviewURL(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [imageFile]);

    const toggleComments = (index) => {
        setOpenPostIndex(openPostIndex === index ? null : index);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected file:', file);
        setImageFile(file);
    };

    const handleAddComment = (postId) => {
        setCurrentPostId(postId);
        setShowPopup(true);
    };

    const token = localStorage.getItem('token');
    const data = useFetch('https://proyect-7woy.onrender.com/api/v1/posts');

    if (!data.result) {
        return <p>Loading...</p>;
    }

    const posts = data.result;

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    };

    const submitComment = () => {
        if (!commentText) return;

        fetch(`https://proyect-7woy.onrender.com/api/v1/posts/comment/${currentPostId}/${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ text: commentText })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setShowPopup(false);
                    setCommentText('');
                    toast.success('Comentario enviado', toastTweaks);
                    window.location.reload();
                } else {
                    window.location.reload();
                    toast.error('Error al enviar comentario', toastTweaks);
                }
            })
            .catch(err => {
                console.error('Error:', err);
                toast.error('Error al enviar comentario', toastTweaks);
            });
    };

    const submitPost = () => {
    if (!postText) return;

    const formData = new FormData();
    formData.append('text', postText);
    if (imageFile) {
        formData.append('image', imageFile); // el campo debe coincidir con req.file
    }

    fetch(`https://proyect-7woy.onrender.com/api/v1/posts/post/${token}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}` 
        },
        body: formData
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setShowPostPopup(false);
                setPostText('');
                setImageFile(null);
                setPreviewURL('');
                toast.success('Post enviado', toastTweaks);
                window.location.reload();
            } else {
                window.location.reload();
                toast.error('Error al crear el post', toastTweaks);
            }
        })
        .catch(err => {
            console.error('Error:', err);
            toast.error('Error al crear el post', toastTweaks);
        });
};

    function formatDate(initialDate) {
        const date = new Date(initialDate);
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className="chat-page" id='popup-overlay'>
            <div className="profile-bar">
                <p>Bienvenido, <a href="/chat/perfil">{user.name}</a></p>

                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <p>¡Escribe tu comentario!</p>
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                rows={4}
                                placeholder="Escribe algo..."
                            />
                            <div className="popup-buttons">
                                <button className="toggle-comment" onClick={submitComment}>Enviar</button>
                                <button className="toggle-comment" onClick={() => setShowPopup(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                {showPostPopup && (
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <p>¡Haz un post!</p>
                            <textarea
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                rows={4}
                                placeholder="Escribe tu post..."
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                placeholder="Pon una imagen si quieres..."
                            />
                            {previewURL && (
                                <img
                                    src={previewURL}
                                    alt="Vista previa"
                                    style={{ maxWidth: '200px', marginTop: '10px' }}
                                />
                            )}
                            <div className="popup-buttons">
                                <button className="toggle-comment" onClick={submitPost}>Enviar</button>
                                <button className="toggle-comment" onClick={() => setShowPostPopup(false)}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}

                <button className='toggle-comment' onClick={() => setShowPostPopup(true)}>Haz un post</button>
            </div>

            <div className="chat-container">
                {posts.map((post, index) => (
                    <div key={index} className="post">
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
                                <a href='#popup-overlay'>
                                    <button
                                    className='toggle-comment'
                                    onClick={() => handleAddComment(post.id)}
                                >
                                    Añadir comentario
                                </button>
                                </a>
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
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}