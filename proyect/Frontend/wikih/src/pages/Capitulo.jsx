import React from "react";

import useFetch from "../services/fetch";
import { useParams } from "react-router-dom";

import '../page.css'

export default function Capitulo() {

    const { id } = useParams();
    const chapterInfo = useFetch(`https://proyect-7woy.onrender.com/api/v1/chapters/${id}`);
    const characterInfo = useFetch(`https://proyect-7woy.onrender.com/api/v1/wikih`);

    if (!chapterInfo.result || !characterInfo.result) {
        return <div>Loading...</div>;
    }

    const chapter = chapterInfo.result[id - id];
    let chapterTitle = `Capitulo ${chapter.capOrder}: ${chapter.title}`

    if (chapter.capType === "extra") {
        chapterTitle = `Capitulo Extra ${chapter.capOrder}: ${chapter.title}`
    }

    const characters = characterInfo.result;
    let charLore = [];
    let charName = [];

    characters.forEach(character => {
        if (character.content.history_Plot) {
            if (character.content.history_Plot[chapter.title.toLowerCase().replace(/ /g, "_")
                .replace(/[.,]/g, "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")] != "") {
                charLore.push(character.content.history_Plot[chapter.title.toLowerCase()
                    .replace(/ /g, "_")
                    .replace(/[.,]/g, "")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")]);
                charName.push(character.name);
            }

        }
    })
    

    return (
        <div className="cap-main">
            <h1 className="cap-title">{chapterTitle}</h1>

            <div className="cap-mini">
                <div>
                    <p>Fecha de lanzamiento: {chapter.publishDate}</p>
                    {/* <p>Portada:</p>
                <img src={chapter.titleImage} alt="portada" /> */}
                </div>
            </div>

            <div className="cap-info">
                <h2>Sinopsis</h2>
                <p>{chapter.sinopsis}</p>
            </div>

            <div className="cap-info">
                <h2>Desarrollo</h2>
            </div>
            
            {charName.map((name, index) => (
                <div key={index} className="cap-char">
                    <h3>{name}</h3>
                    <p>{charLore[index]}</p>
                </div>
            ))}
        </div>
    )
}