import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [editingCliente, setEditingCliente] = useState(null); 
    const [editedData, setEditedData] = useState({
      nombre: '',
      apellido: '',
      correo: '',
    });

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/clientes')
        .then(response => {
          setClientes(response.data);
        })
        .catch(error => console.error(error));
    }, []);

    const handleEdit = (cliente) => {
      setEditingCliente(cliente);
      setEditedData({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        correo: cliente.correo,
      });
    };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/clientes/${editingCliente.id}`, editedData)
      .then(response => {
        const updatedClientes = clientes.map(cliente =>
          cliente.id === editingCliente.id ? { ...cliente, ...editedData } : cliente
        );
        setClientes(updatedClientes);
        setEditingCliente(null);
        setEditedData({
          nombre: '',
          apellido: '',
          correo: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (clienteId) => {
    axios.delete(`http://127.0.0.1:8000/api/clientes/${clienteId}`)
      .then(response => {
        const updatedClientes = clientes.filter(cliente => cliente.id !== clienteId);
        setClientes(updatedClientes);
      })
      .catch(error => console.error(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="row">
      <div className='col s12 white'>
        <h2 className='center'>Clientes</h2>
        <table id="tablas">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>
                  {editingCliente === cliente ? (
                    <input
                      type="text"
                      value={editedData.nombre}
                      onChange={handleInputChange}
                      name="nombre"
                    />
                  ) : (
                    cliente.nombre
                  )}
                </td>
                <td>
                  {editingCliente === cliente ? (
                    <input
                      type="text"
                      value={editedData.apellido}
                      onChange={handleInputChange}
                      name="apellido"
                    />
                  ) : (
                    cliente.apellido
                  )}
                </td>
                <td>
                  {editingCliente === cliente ? (
                    <input
                      type="text"
                      value={editedData.correo}
                      onChange={handleInputChange}
                      name="correo"
                    />
                  ) : (
                    cliente.correo
                  )}
                </td>
                <td>
                  {editingCliente === cliente ? (
                    <>
                      <button
                        className="btn waves-effect waves-light"
                        type="button"
                        onClick={handleUpdate}
                      >
                        Guardar
                      </button>
                      <button
                        className="btn waves-effect waves-light"
                        type="button"
                        onClick={() => setEditingCliente(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn waves-effect waves-light"
                        type="button"
                        onClick={() => handleEdit(cliente)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn waves-effect waves-light red"
                        type="button"
                        onClick={() => handleDelete(cliente.id)}
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Clientes;
