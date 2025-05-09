import React from "react";

import MiniTarjetaPersonaje from "./MiniTarjetaPersonaje";
import MiniTarjetaCapitulo from "./MiniTarjetaCapitulo";

import '../../page.css'

export function charsList(chars) {
console.log(chars);

if (!chars) {
    return <div>Loading...</div>;
  }

    return (
        <div className="chars-container">
        {chars.map((char) => (
            <a href={`personaje/${char.id}`}><MiniTarjetaPersonaje key={char._id} char={char} /></a>
        ))}
        </div>
    )
}

export function chaptersList(chapters) {
    console.log(chapters);
    
    if (!chapters) {
        return <div>Loading...</div>;
      }
    
        return (
            <div className="chapters-container">
            {chapters.map((chapter) => (
                <a href={`capitulo/${chapter.id}`}><MiniTarjetaCapitulo key={chapter._id} chapter={chapter} /></a>
            ))}
            </div>
        )
    }