import React from 'react'; //necesaria en stackblitz

function Inicio() {
    const integrantes = [
        { nombre: 'Legajo - Alumno1' },
        { nombre: 'Legajo - Alumno2' },
        { nombre: 'Legajo - Alumno3' },
    ];

    return (

            <div className='div-integrantes'>
                <h1>Integrantes</h1>
                <div className='lista'>
                <ul>
                    {integrantes.map((integrante) => (
                    <li key={integrante.nombre}>{integrante.nombre}</li>
                    ))}
                </ul>

                </div>

            </div>

    );
    }
export { Inicio };
