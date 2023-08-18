import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Compras() {
  const [compras, setCompras] = useState([]);
  const [editingCompra, setEditingCompra] = useState(null);
  const [editedData, setEditedData] = useState({
    monto: '',
    entradas: '',
    ubicacion: '',
    nombre: '',
    pelicula_id: '',
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/compras')
      .then(response => {
        setCompras(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleEdit = (compra) => {
    setEditingCompra(compra);
    setEditedData({
      monto: compra.monto,
      entradas: compra.entradas,
      ubicacion: compra.ubicacion,
      nombre: compra.nombre,
      pelicula_id: compra.pelicula_id,
    });
  };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/compras/${editingCompra.id}`, editedData)
      .then(response => {
        const updatedCompras = compras.map(compra =>
          compra.id === editingCompra.id ? { ...compra, ...editedData } : compra
        );
        setCompras(updatedCompras);
        setEditingCompra(null);
        setEditedData({
          monto: '',
          entradas: '',
          ubicacion: '',
          nombre: '',
          pelicula_id: '',
        });
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (compraId) => {
    axios.delete(`http://127.0.0.1:8000/api/compras/${compraId}`)
      .then(response => {
        const updatedCompras = compras.filter(compra => compra.id !== compraId);
        setCompras(updatedCompras);
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
        <h2 className='center'>Compras</h2>
        <table id="tablas">
          <thead>
            <tr>
              <th>Monto</th>
              <th>Entradas</th>
              <th>Ubicación</th>
              <th>Nombre</th>
              <th>Película ID</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {compras.map(compra => (
              <tr key={compra.id}>
                <td>
                  {editingCompra === compra ? (
                    <input
                      type="text"
                      value={editedData.monto}
                      onChange={handleInputChange}
                      name="monto"
                    />
                  ) : (
                    compra.monto
                  )}
                </td>
                <td>
                  {editingCompra === compra ? (
                    <input
                      type="text"
                      value={editedData.entradas}
                      onChange={handleInputChange}
                      name="entradas"
                    />
                  ) : (
                    compra.entradas
                  )}
                </td>
                <td>
                  {editingCompra === compra ? (
                    <input
                      type="text"
                      value={editedData.ubicacion}
                      onChange={handleInputChange}
                      name="ubicacion"
                    />
                  ) : (
                    compra.ubicacion
                  )}
                </td>
                <td>
                  {editingCompra === compra ? (
                    <input
                      type="text"
                      value={editedData.nombre}
                      onChange={handleInputChange}
                      name="nombre"
                    />
                  ) : (
                    compra.nombre
                  )}
                </td>
                <td>
                  {editingCompra === compra ? (
                    <input
                      type="text"
                      value={editedData.pelicula_id}
                      onChange={handleInputChange}
                      name="pelicula_id"
                    />
                  ) : (
                    compra.pelicula_id
                  )}
                </td>
                <td>
                  {editingCompra === compra ? (
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
                        onClick={() => setEditingCompra(null)}
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn waves-effect waves-light"
                        type="button"
                        onClick={() => handleEdit(compra)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn waves-effect waves-light red"
                        type="button"
                        onClick={() => handleDelete(compra.id)}
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

export default Compras;
