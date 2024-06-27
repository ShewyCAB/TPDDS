import React from 'react'; //necesaria en stackblitz

function Inicio() {
  const integrantes = [
    { nombre: '82362 - Gonzalo Osimani' },
    { nombre: '82488 - Milena Muñoz' },
    { nombre: '86406 - Leandro Ochoa' },
    { nombre: '91498 - Dario Diaz' },
  ];

  return (
    <div className="mt-4 p-5 rounded" style={{ backgroundColor: 'white', fontSize: '20px'}}>
      <h1>Integrantes</h1>
      <ul>
        {integrantes.map((integrante) => (
          <li key={integrante.nombre}>{integrante.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
export { Inicio };
