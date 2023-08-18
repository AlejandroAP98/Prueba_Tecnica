import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cines() {
    const [cines, setCines] = useState([]);
    const [editingCine, setEditingCine] = useState(null); 
    const [editedData, setEditedData] = useState({
      ubicacion: '',
    });

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/cines')
        .then(response => {
          setCines(response.data);
        })
        .catch(error => console.error(error));
    }, []);

    const handleEdit = (cine) => {
      setEditingCine(cine);
      setEditedData({
        ubicacion: cine.ubicacion,
      });
    };

  const handleUpdate = () => {
    axios.put(`http://127.0.0.1:8000/api/cines/${editingCine.id}`, editedData)
      .then(response => {
        const updatedCines = cines.map(cine =>
          cine.id === editingCine.id ? { ...cine, ...editedData } : cine
        );
        setCines(updatedCines);
        setEditingCine(null);
        setEditedData({
          ubicacion: '',
        });
      }
      );
  };

  const handleDelete = (cineId) => {
    axios.delete(`http://127.0.0.1:8000/api/cines/${cineId}`)
      .then(response => {
        const updatedCines = cines.filter(cine => cine.id !== cineId);
        setCines(updatedCines);
      }
      );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="row">
     <div className='col s12 white'>
      <h2 className='center'>Cines</h2>
      <table id="tablas">
        <thead>
          <tr>
            <th>Ubicacion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cines.map(cine => (
            <tr key={cine.id}>
              <td>
                {editingCine && editingCine.id === cine.id ? (
                  <input type="text" name="ubicacion" value={editedData.ubicacion} onChange={handleInputChange} />
                ) : (
                  cine.ubicacion
                )}
              </td>
              <td>
                {editingCine && editingCine.id === cine.id ? (
                  <React.Fragment>
                    <button
                      className="btn waves-effect waves-light"
                      onClick={() => handleUpdate()}
                    >
                      Actualizar
                    </button>
                    <button
                      className="btn waves-effect waves-light red"
                      onClick={() => setEditingCine(null)}
                    >
                      Cancelar
                    </button>
                  </React.Fragment>
                ) : (
                  <button
                    className="btn waves-effect waves-light"
                    onClick={() => handleEdit(cine)}
                  >
                    Editar
                  </button>
                )}
                <button className="btn waves-effect waves-light red" onClick={() => handleDelete(cine.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
      
    </div>
  );
}

export default Cines;

