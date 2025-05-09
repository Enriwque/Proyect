import React from "react";

import '../../page.css'

export default function MiniTarjetaPersonaje(props) {
    const { char } = props;
    return (
        <div className="mini-char-card" style={{backgroundColor: "white"}}>
            <h2>{char.name}</h2>
            <div className="char-mini-desc" style={{backgroundColor: "white"}}>
                <ul>
                    <li>{char.age}</li>
                    <li>{char.species}</li>
                    <li>{char.sexo}</li>
                </ul>
            </div>
            <img src={char.titleImage} />
        </div>
    )
}