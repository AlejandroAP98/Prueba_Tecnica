import React, { useState } from 'react';
import axios from 'axios';

function CreateClientForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clientes', formData);
      console.log('Cliente creado:', response.data);
      // Actualizar la interfaz o realizar otras acciones necesarias
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
        });

    } catch (error) {
      console.error('Error al crear cliente:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="row white">
        <h2 className='center '>Crear Cliente</h2>
        <form onSubmit={handleSubmit} id="tablas">
            <div className="row">
                <div className="input-field col s6">
                    <input id="crearNombre" type="text" className="validate" name="nombre" value={formData.nombre} onChange={handleInputChange} />
                    <label for="crearNombre">Ingrese nombre</label>
                </div>
                <div className="input-field col s6">
                    <input id="crearApellido" type="text" className="validate" name="apellido" value={formData.apellido} onChange={handleInputChange} />
                    <label for="crearApellido">Ingrese apellido</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input id="crearCorreo" type="email" className="validate" name="correo" value={formData.correo} onChange={handleInputChange} />
                    <label for="crearCorreo">Ingrese correo electrónico</label>
                </div>
            </div>
            <button className="btn waves-effect waves-light" type="submit" name="action">Crear
            </button>
        </form>
    </div>
  );
}

export default CreateClientForm;
