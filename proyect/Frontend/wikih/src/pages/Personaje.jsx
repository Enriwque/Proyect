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

  const character = charInfo.result[id - id];
  const chapterList = chapters.result;
  const characterLore = character.content.history_Plot;
  const characterExtraLore = character.content.extra;

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
        <div><h1>Historia</h1></div>
        <div>


          <h2>Pasado</h2>
          <p>{character.content.history_Plot.past}</p>
        </div>

        {/** capitulos principales  */}
        {chapterList.map((chapter, index) => {
          if (characterLore[chapter.title.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[.,]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")] === "") {
            return null
          } else if (characterLore[chapter.title.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[.,]/g, "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")] === undefined) { return null }

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
        
        {/** capitulos extras  */}
        {chapterList.map((chapter, index) => {
          
          if (chapter.capType === "extra") {
            if (characterExtraLore[chapter.title.toLowerCase()
              .replace(/ /g, "_")
              .replace(/[.,]/g, "")
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")] === "") {
              return null
            }else {
              return (
                <>
                <div><h1>Otros eventos</h1></div>
              <div key={index}>
                
                <h3>{chapter.title}</h3>
                <p>{characterExtraLore[chapter.title.toLowerCase()
                  .replace(/ /g, "_")
                  .replace(/[.,]/g, "")
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")]}</p>
              </div>
              </>
            )
            }            
          }
        })}

        
        <ul>
          {character.content.extra.trivia.map((trivia, index) => {
            console.log(trivia[index]);
            
            if (trivia[index] === "" || trivia[index] === undefined) {
              return null
            }else {
              return (
              <>
              <div className="trivia"><h2>Trivia</h2></div>
              <div key={index}>
                <li>{trivia}</li>
              </div>
              </>
            )
            }
            
          })}
        </ul>

      </div>
    </>
  )
}