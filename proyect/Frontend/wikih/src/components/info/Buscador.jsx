import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import useFetch from "../../services/fetch";

import '../../page.css';

export default function Buscador() {
    const [search, setSearch] = useState("");

    const toastTweaks = {
        theme: "colored",
        position: "bottom-right",
        hideProgressBar: true,
        newestOnTop: true,
        closeButton: false
    }

   const getchar = useFetch(`https://proyect-7woy.onrender.com/api/v1/wikih`);
   const getchapters = useFetch(`https://proyect-7woy.onrender.com/api/v1/chapters`);

   if (!getchar.result) return <div className="loading">Loading...</div>;
   if (!getchapters.result) return <div className="loading">Loading...</div>;

   let charNames = []
   let chapterNames = []

   getchar.result.forEach((char) => {
    charNames.push(char.name);
   })
   getchapters.result.forEach((chapter) => {
    chapterNames.push(chapter.title);
   })
    
//    console.log(chapterNames);
//    console.log(charNames);

   function handleSearch(search) {
    let resCharIds = [];
    let resChapIds = [];

    if (search === "") {
        toast.info('Ingresa letras o palabras para buscar', toastTweaks);
        return;
    }

    charNames.forEach((char) => {
        if (char.toLowerCase().includes(search.toLowerCase())) {
            resCharIds.push(charNames.indexOf(char));
        }
    })
    chapterNames.forEach((chapter) => {
        if (chapter.toLowerCase().includes(search.toLowerCase())) {
            resChapIds.push(chapterNames.indexOf(chapter));
        }
    })

    if (resChapIds.length <= 0) {
        resChapIds.push(-1);
    }

    if (resCharIds.length <= 0) {
        resCharIds.push(-1);
    }

    window.location.href = `/resultados/${resCharIds}/${resChapIds}`;
   }

    return (
            <div className="buscador">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={() => handleSearch(search)}>buscar</button>
            <ToastContainer className="toast"/>
            </div>
    );
}