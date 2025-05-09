import React from "react";

import { charsList } from "../components/info/InfoList";
import useFetch from "../services/fetch";

import '../page.css'

export default function Personajes() {

    const chars = useFetch('https://proyect-7woy.onrender.com/api/v1/wikih');
    return (
        <>
        <h1>personajes</h1>
        {charsList(chars.result)}
        </>
    )
}