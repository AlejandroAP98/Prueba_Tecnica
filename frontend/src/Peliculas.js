import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function Peliculas() {
    const [peliculas, setPeliculas] = useState([]);
    const [detallePelicula, setDetallePelicula] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar la apertura/cierre del modal
   
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/peliculas')
        .then(response => setPeliculas(response.data))
        .catch(error => console.error(error));
    }, []);

    const mostrarDetalle = (item) => {
        setDetallePelicula(item);
        setModalIsOpen(true); // Abre el modal al mostrar el detalle
    };

    const cerrarDetalle = () => {
        setDetallePelicula(null);
        setModalIsOpen(false); // Cierra el modal al cerrar el detalle
    };
    
    return (
        <div className="row">
            <div className="col s12">
                <div className="card" id="cartelera">
                    {peliculas.map(item => (
                        <div className="card-image" key={item.id}>
                            <a href='#' onClick={()=> mostrarDetalle(item)}>
                                <img id="imagenes" src={`http://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                            </a>
                            <div className="card-content">
                                <a href="#" className="center" id="titulos" onClick={() => mostrarDetalle(item)}>
                                    {item.title}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={cerrarDetalle}
                contentLabel="Detalle de Película"
            >
                {detallePelicula && (
                    <div className="detalle-pelicula center">
                        <h2>{detallePelicula.title}</h2>
                        <p>Fecha de estreno: {detallePelicula.release_date}</p>
                        <p>Calificación: {detallePelicula.vote_average}</p>
                        <p>Popularidad: {detallePelicula.popularity}</p>
                        <p>Descripción:</p>
                        <p>{detallePelicula.overview}</p>
                        <button onClick={cerrarDetalle}>Cerrar</button>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Peliculas;