import React from "react";

import '../../page.css'

export default function MiniTarjetaCapitulo(props) {
    const { chapter } = props;
    return (
        <div className="mini-chapter-card" style={{backgroundColor: "white"}}>
            <p>{chapter.title}</p>
            <img src={chapter.titleImage} alt="imagen de titulo" />
        </div>
    )
}