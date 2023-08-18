import React, { useState, useEffect } from 'react';
import axios from 'axios';


function CreateCompraForm() {
    const [peliculas, setPeliculas] = useState([]);
    const [cines, setCines] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/peliculas')
        .then(response => setPeliculas(response.data))
        .catch(error => console.error(error));
    }, []);


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cines')
          .then(response => {
            setCines(response.data);
          })
          .catch(error => console.error(error));
      }, []);
  

    const [formData, setFormData] = useState({
        entradas: '',
        monto: '',
        ubicacion: '',
        nombre: '',
        pelicula_id: '',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post('http://127.0.0.1:8000/api/compras', formData);
        console.log('Compra creada:', response.data);
            setFormData({
                entradas: '',
                monto: '',
                ubicacion: '',
                nombre: '',
                pelicula_id: '',
            });

        } catch (error) {
        console.error('Error al crear compra:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value
        }));
    }

    return (
        <div className="row white center">
            <h2 className='center '>Venta</h2>
            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className="input-field col s6 ">
                        <input id="crearCliente" type="text" className="validate" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                        <label for="crearCliente">Ingrese nombre del cliente</label>
                    </div>
                    <div className="input-field col s6 ">
                        <input id="crearEntradas" type="text" className="validate" name="entradas" value={formData.entradas} onChange={handleInputChange} />
                        <label for="crearEntradas">Ingrese cantidad de entradas</label>
                    </div>
                    <div className="input-field col s6 ">
                        <select className="browser-default" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange}>
                            <option value="" disabled selected>Seleccione un cine</option>
                            {cines.map(cine => (
                                <option key={cine.id} value={cine.ubicacion}>{cine.ubicacion}</option>
                            ))}
                        </select>
                    </div>
                    <div className="input-field col s6 ">
                        <input id="crearMonto" type="text" className="validate" name="monto" value={formData.monto} onChange={handleInputChange} />
                        <label for="crearMonto">Ingrese monto</label>
                    </div>
                    <div className="input-field col s6 ">
                        <select className="browser-default" name="pelicula_id" value={formData.pelicula_id} onChange={handleInputChange}>
                            <option value="" disabled selected>Seleccione una pelicula</option>
                            {peliculas.map(pelicula => (
                                <option key={pelicula.id} value={pelicula.id}>{pelicula.title}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="btn-large cyan accent-5 black-text " type="submit" name="action">Crear
                </button>       
            </form>
            <br></br>
        </div>
    );
}

export default CreateCompraForm;