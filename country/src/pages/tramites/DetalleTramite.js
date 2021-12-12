import React from 'react';
import { useParams } from 'react-router-dom';

// Importamos el modulo necesario para obtener el parametro


function DetalleTramite() {

    // Obtenemos el parametro en esta variable
    const {id} = useParams();

    return(
        <div className="container">
            <h1>El Id es: {id}</h1>
            <br />
            <h1>El type es: {id.type}</h1>
        </div>
    )
}
export default DetalleTramite;