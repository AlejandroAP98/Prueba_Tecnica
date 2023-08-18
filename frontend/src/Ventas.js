import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

M.AutoInit();

function VentaForm() {

    const [cineData, setCineData] = useState([]); 

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cines')
          .then(response => {
            setCineData(response.data);
          })
          .catch(error => console.error(error));
    }, []);
       
    // const [ventaData, setVentaData] = useState({
    //     clienteId: '',
    //     peliculaId: '',
    //     cantidad: 1,
    //     // Otros campos relacionados con la venta
    // });


    // const handleSubmit = event => {
    //     event.preventDefault();
    //     axios.post('http://http://127.0.0.1:8000/api/compras', ventaData)
    //     .then(response => {
    //         console.log(response.data); // Datos de la venta almacenada
    //         // Realizar acciones adicionales si es necesario
    //     })
    //     .catch(error => console.error(error));
    // };

    // const handleInputChange = event => {
    //     const { name, value } = event.target;
    //     setVentaData(prevState => ({
    //     ...prevState,
    //     [name]: value
    //     }));
    // };
    
  return (
    
        <div className="row" id="divTitulo">
        <div className="col s1">
        </div>

        <form className="col s5 grey lighten-5 " id="textForm">
        <div className="row ">
            <div className="input-field col s6">
                <input id="nombre" type="text" className="validate"/>
            <label for="nombre">Ingrese nombre</label>
            </div>
            <div className="input-field col s6">
            <   input id="apellido" type="text" className="validate"/>
            <label for="apellido">Ingrese apellido</label>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s6">
                <input id="correo" type="email" className="validate"/>
            <label for="correo">Ingrese correo electrónico</label>
            </div>
            <div className="input-field col s6">
                <select>
                    {cineData.map(cine => {
                        return (
                            <option key={cine.id}>{cine.ubicacion}</option>
                        );
                    })}
                </select>
                <label>Ubicación</label>
            </div>  
        </div>
        <div className="row">
            <div className="input-field col s6">
                <input id="entradas" type="text" className="validate"/>
                <label for="entradas">Cantidad de entradas</label>
            </div>
            <div className="input-field col s6">
                <input id="monto" type="text" className="validate"/>
                <label for="monto">Ingrese monto</label>
            </div>
        </div>
        <div className="row center">
            <button className="btn waves-effect waves-light" type="submit" name="action">Ingresar</button>
        </div>
        </form>
    </div>
    
  );
}

export default VentaForm;
