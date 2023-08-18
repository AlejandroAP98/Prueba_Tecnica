
import Peliculas from './Peliculas';
// import React, { useState, useEffect } from 'react';
import Clientes from './Clientes';
import Cines from './Cines';
import Compras from './Compras';
import CreateCliente from './CrearCliente';
import CreateCineForm from './CrearCine';
import CreateCompraForm from './CrearCompra';


function App() {
    return (
        
      <div className='row'>
        <div id="divTitulo" className='center'>    
            <img id="icono" src="/icono.png" alt="Logo" />
        </div>
        <Peliculas />
        <CreateCompraForm />
        <div className="col s12" id="crud">
          <Clientes />
          <Cines />
          <Compras />
        </div>
        <div className="col s12" id="crud">
          <CreateCliente />
          <CreateCineForm />
        </div>
      </div>
    );
  }

export default App;

