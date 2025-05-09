import React from "react";

import { chaptersList } from "../components/info/InfoList";
import useFetch from "../services/fetch";

import '../page.css'

export default function Capitulos() {

    const chapters = useFetch('https://proyect-7woy.onrender.com/api/v1/chapters');
    return (
        <>
        <h1>capitulos</h1>
        {chaptersList(chapters.result)}
        </>
    )
}