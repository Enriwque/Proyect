import React from "react";

import useFetch from "../services/fetch";

import '../page.css'

export default function Chat() {

    const userStr = localStorage.getItem('user');
    const user = JSON.parse(userStr);
    
    const data = useFetch('http://localhost:2005/api/v1/posts');
    if (!data.result) {
        return (
            <p>Loading...</p>
        )
    }
    
    const posts = data.result

    function formatDate(initialDate) {
        const date = new Date(initialDate);

        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const year = date.getUTCFullYear();

        const formattedDate = `${day}-${month}-${year}`;

        return formattedDate;
    }

    return (
        <div className="chat-page">
            <div className="profile-bar">
                <p>Bienvenido, {user.name}</p>
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
                    {post.comments.map((comment, index) => (
                       <div key={index} className="comment">
                            <p>{comment.user}</p>
                            <p>{comment.text}</p>
                            <p>{formatDate(comment.date)}</p>
                       </div>
                    ))}
                </div>
            ))}
            </div>
        </div>
    )
}