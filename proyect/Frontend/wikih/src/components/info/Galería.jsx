import React from "react";

import useFetch from "../../services/fetch";

import '../../page.css'

export default function Galeria(props) {

    const { charId } = props;

    const chars = useFetch(`https://proyect-7woy.onrender.com/api/v1/wikih/${charId ? charId : ''}`);
    if (!chars.result) {
        return <div>Loading...</div>;
    }

    let galery = [];
    chars.result.forEach(character => {
        if (character.images && character.images.length > 0) {
            character.images.forEach(image => {
                galery.push(image);
            })
        }
    })
    
    return (
        <div className="galery">
            {galery.map((image, index) => (
                <div key={index} className="galery-item">
                    <img src={image} alt={`Galería ${index}`} className="galery-image" />
                </div>
            ))}
        </div>
    )
}