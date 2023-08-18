import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import JsBarcode from 'jsbarcode';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function CreateCompraForm() {
    const [peliculas, setPeliculas] = useState([]);
    const [cines, setCines] = useState([]);
    const [compras, setCompras] = useState([]);

    const [horaActual, setHoraActual] = useState('');
    const [fechaActual, setFechaActual] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
        const now = new Date();
        const hora = now.toLocaleTimeString();
        const fecha = now.toLocaleDateString();

        setHoraActual(hora);
        setFechaActual(fecha);
        }, 1000);

    return () => clearInterval(intervalId); }, []);

    const generateBarcode = (value) => {
        const canvas = document.createElement('canvas');
        JsBarcode(canvas, value, {
            format: 'CODE128',
            width: 2,
            height: 50,
            displayValue: false
        });

        return canvas.toDataURL();
        };

      const generatePDF = (compra) => {
        const docDefinition = {
          content: [
            { text: 'CINE UNAL', style: 'header', fontSize: 20, margin: [0, 0, 0, 10], fontWeight: 'bold', alignment: 'center' },
            { text: 'Factura de compra', style: 'header', fontSize: 18, margin: [0, 0, 0, 10], fontWeight: 'bold', alignment: 'center' },
            { text: `Cliente: ${compra.nombre}`, margin: [0, 10] },
            { text: `Monto cancelado: $${compra.monto}`, margin: [0, 10] },
            { text: `Número de entradas adquiridas: ${compra.entradas}`, margin: [0, 10] },
            { text: `Teatro: ${compra.ubicacion}`, margin: [0, 10] },
            { text: `Nombre de la pelicula: ${compra.pelicula}`, margin: [0, 10] },
            { text: `Fecha de compra: ${fechaActual}`, margin: [0, 10] },
            { text: `Hora de compra: ${horaActual}`, margin: [0, 10] },
            { text: 'Código de Barras:', margin: [0, 10] },
            { image: generateBarcode(compra.id), width: 100, height: 50 }

            ],
            styles: {
                header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
                }
            }
        };

    
    pdfMake.createPdf(docDefinition).download(`compra_${compra.id}.pdf`);
    };  

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
        pelicula: '',
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
                pelicula: '',
            });
            const createdCompra = response.data;
            setCompras([...compras, createdCompra]);
            generatePDF(createdCompra);

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
                        <select className="browser-default" name="pelicula" value={formData.pelicula} onChange={handleInputChange}>
                            <option value="" disabled selected>Seleccione una pelicula</option>
                            {peliculas.map(pelicula => (
                                <option key={pelicula.id} value={pelicula.title}>{pelicula.title}</option>
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