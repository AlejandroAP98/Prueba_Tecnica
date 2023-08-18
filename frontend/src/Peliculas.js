import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Peliculas() {
    const [peliculas, setPeliculas] = useState([]);
   
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/peliculas')
        .then(response => setPeliculas(response.data))
        .catch(error => console.error(error));
    }, []);
    
  return (
    <div className="row " >
        <div className="col s12" >
            <div className="card " id="cartelera">
                {peliculas.map(item => (
                    <div className="card-image" key={item.id}>
                        <img id="imagenes" src={`http://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                    <div className="card-content">
                        <p className="center" id="titulos" >{item.title}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default Peliculas;
