import { charsList, chaptersList } from "../components/info/InfoList";
import useFetch from "../services/fetch";

import '../page.css';

export default function Resultados() {
    const getchar = useFetch(`https://proyect-7woy.onrender.com/api/v1/wikih`);
    const getchapters = useFetch(`https://proyect-7woy.onrender.com/api/v1/chapters`);

    if (!getchar.result) return <div className="loading">Loading...</div>;
    if (!getchapters.result) return <div className="loading">Loading...</div>;

    let chars = []
    let chapters = []

    const charIds = window.location.href.split('/')[4].split(',');
    const chapIds = window.location.href.split('/')[5].split(',');

    charIds.forEach((id) => {
        if (parseInt(id) < 0) {
            return (
                <h2>No se encontraron capitulos</h2>
            )
        }else {
            if (parseInt(id) === getchar.result[parseInt(id)].id-1) {
            chars.push(getchar.result[parseInt(id)]);
        }
        }
    })

    chapIds.forEach((id) => {
        if (parseInt(id) < 0) {
            return (
                <h2>No se encontraron personajes</h2>
            )
        }else {
            if (parseInt(id) === getchapters.result[parseInt(id)].id-1) {
            chapters.push(getchapters.result[parseInt(id)]);
        }
        }
    })
    // console.log(chars);
    // console.log(chapters);

    // console.log(getchar.result);
    // console.log(getchapters.result);
    
    // console.log(charIds);
    // console.log(chapIds);
    
    
    return (
        <div className="content-results">
            <div>{charsList(chars)}</div>
            <div>{chaptersList(chapters)}</div>
        </div>
    )
    
}