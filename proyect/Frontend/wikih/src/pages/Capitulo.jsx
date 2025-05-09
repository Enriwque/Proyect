import React from "react";

import useFetch from "../services/fetch";
import { useParams } from "react-router-dom";

import '../page.css'

export default function Capitulo() {

    const { id } = useParams();
    const chapterInfo = useFetch(`https://proyect-7woy.onrender.com/api/v1/chapters/${id}`);

    if (!chapterInfo.result) {
        return <div>Loading...</div>;
      }

    const chapter = chapterInfo.result[id-id];
    let chapterTitle = `Capitulo ${chapter.capOrder}: ${chapter.title}`

    if (chapter.capType === "extra") {
        chapterTitle = `Capitulo Extra ${chapter.capOrder}: ${chapter.title}`
    }

    console.log(chapter);
    
    return (
        <div>
            <h1 className="cap-title">{chapterTitle}</h1>

            <div className="cap-mini">
                <div>
                    <p>Fecha de lanzamiento: {chapter.publishDate}</p>
                <p>Portada:</p>
                <img src={chapter.titleImage} alt="portada" />
                </div>
            </div>

            <h2>Sinopsis</h2>
            <p>{chapter.sinopsis}</p>

            <h2>Desarrollo</h2>
            <p>{chapter.desarrollo}</p>
        </div>
    )
}