import React from "react";
import useFetch from "../../services/fetch";
import '../../page.css';

export default function Buscador() {
    const { data: chars, loading, error } = useFetch('https://proyect-7woy.onrender.com/api/v1/wikih');
    const [search, setSearch] = React.useState('');

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los datos</p>;

    const filteredResults = chars?.filter(item =>
        item.name.includes(search)
    );

    return (
        <div className="buscador">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar personaje..."
            />
            <ul>
                {filteredResults?.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}