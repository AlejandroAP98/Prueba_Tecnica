import React, { useState } from 'react';
import axios from 'axios';

function CreateCineForm() {
    const [formData, setFormData] = useState({
        ubicacion: '',
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
        const response = await axios.post('http://127.0.0.1:8000/api/cines', formData);
        console.log('Cine creado:', response.data);
        // Actualizar la interfaz o realizar otras acciones necesarias
            setFormData({
                ubicacion: '',
            });
        
        } catch (error) {
        console.error('Error al crear cine:', error);
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
            <h2 className='center '>Crear Teatro</h2>
            <form onSubmit={handleSubmit} id="tablas">
                <div className="row">
                    <div className="input-field col s6 ">
                        <input id="crearUbicacion" type="text" className="validate" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} />
                        <label for="crearUbicacion">Ingrese ubicación</label>
                    </div>
                </div>
                <button className="btn waves-effect waves-light" type="submit" name="action">Crear
                </button>
            </form>
        </div>
    );
}

export default CreateCineForm;
