import '../users/Users.css'

import React,{useEffect, useState}  from 'react';

import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';

const customerTableHead = [
    {
        title:"Tipo de espacio",
        field: "Type",       
       
    },
    {
        title:"Descripción",
        field: "description"
    },
    {
        title:"N° o Nombre",
        field: "Number"
    },
    {
        title:"Tiempo previo para reservar",
        field: "time-reserve"
    },
    {
        title:"Horas máximas al mes",
        field: "max-hs"
    },
]


function Espacio() {

    const [data, setdata] = useState([]);

    const traerFrase = async () => {
        const api = await fetch("http://localhost:3001/Espacios");
        const frase = await api.json()
        console.log(frase[0]);
        setdata(frase)
    }
    
    useEffect(() => {
        traerFrase()
    }, [])

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Personal de servicio" />
                <div className="flex justify-end ">
                    <button className="btn">
                        Agregar
                    </button>
                </div>
  
                {/* <div className="mt-10">


                    <Table
                     limit='10'
                     headData={customerTableHead}
                     renderHead={(item, index) => renderHead(item, index)}
                     bodyData={customerList}
                     renderBody={(item, index) => renderBody(item, index)}


                    />
                </div> */}
                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
                 actions= {[
                    {
                        icon:"edit",
                        tooltip:"Editar",
                        onClick: (event, rowdata) => alert("¿Quiere editar al usuario?")   
                    },
                    {
                        icon:"delete",
                        tooltip:"Eliminar",
                        onClick: (event, rowdata) => alert("¿Quiere eliminar al usuario:  " + rowdata.artista + "?")   
                    }
                ] }

                 /></div>
            </div>
        </div>
    )
}

export default Espacio
