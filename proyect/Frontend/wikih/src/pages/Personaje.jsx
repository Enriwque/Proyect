import React from "react";

import useFetch from "../services/fetch";
import { useParams } from "react-router-dom";

import '../page.css'

export default function Personaje() {
    const { id } = useParams();
    const charInfo = useFetch(`https://proyect-7woy.onrender.com/api/v1/wikih/${id}`);

    const chapters = useFetch(`https://proyect-7woy.onrender.com/api/v1/chapters`);

    if (!charInfo.result || !chapters.result) {
        return <div>Loading...</div>;
      }
      
    const character = charInfo.result[id-id];
    const chapterList = chapters.result;
    const characterLore = character.content.history_Plot;

    return (
        <>
        <div className="main-info">
            <div className="main-info-text">
            <h1>{character.name}</h1>
            <p>{character.content.intro}</p>

            <h2>Apariencia</h2>
            <p>{character.content.appereance}</p>

            <h2>Personalidad</h2>
            <p>{character.content.personality}</p>
            </div>
            
            <div className="main-info-img">
            <img src={character.titleImage} alt={character.name} />
            <hr />
            <h2>{character.name}</h2>
              <p>edad: {character.age}</p>
              <p>especie: {character.species}</p>
              <p>sexo: {character.sexo}</p>
              <p>nacimiento: {character.dateOfBirth}</p>
            </div>
        </div>

        <div className="deep-info">
        <h1>Historia</h1>
        
        <h2>Pasado</h2>
        <p>{character.content.history_Plot.past}</p>

        {/** capitulos principales  */}
        {chapterList.map((chapter, index) => {
          if (characterLore[chapter.title.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[.,]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")] === ""){
              return(
                <div key={index}>
                  <h2>{chapter.title}</h2>
                  <p>todo</p>
                </div>  
            )
          }else if (characterLore[chapter.title.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[.,]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")] === undefined){return null}

          return (
            <div key={index}>
              <h2>{chapter.title}</h2>
              <p>{characterLore[chapter.title.toLowerCase()
                .replace(/ /g, "_")
                .replace(/[.,]/g, "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")]}</p>
            </div>
          )
        })}
        <h2>Otros eventos</h2>
        {/** capitulos extras  */}
        {chapterList.map((chapter, index) => {
          if (chapter.capType === "extra") {
            if (characterLore[chapter.title.toLowerCase()
              .replace(/ /g, "_")
              .replace(/[.,]/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")] === ""){
                return(
                  <div key={index}>
                    <h3>{chapter.title}</h3>
                    <p>todo</p>
                  </div>  
              )
            }
            
            return (
              <div key={index}>
                <h3>{chapter.title}</h3>
                <p>{characterLore[chapter.title.toLowerCase()
                  .replace(/ /g, "_")
                  .replace(/[.,]/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")]}</p>
              </div>
            )
          }
        })}

        <h2>Trivia</h2>
        <ul>
        {character.content.extra.trivia.map((trivia, index) => {
          return (
            <div key={index}>
              <li>{trivia}</li>
            </div>
          )
        })}
        </ul>
        
        </div>
        </>
    )
}