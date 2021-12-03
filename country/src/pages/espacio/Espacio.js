import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import {makeStyles} from '@material-ui/core/styles';

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
        field: "timereserve"
    },
    {
        title:"Horas máximas al mes",
        field: "maxhs"
    },
]

const useStyles = makeStyles((theme) => ({
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));


function Espacio() {
    const styles= useStyles();
    const [modalInsertar, setModalInsertar]= useState(false);
    const [modalEditar, setModalEditar]= useState(false);
    const [modalEliminar, setModalEliminar]= useState(false);
    const [artistaSeleccionado, setArtistaSeleccionado]=useState({
        Type: "",
        Description: "",
        Number: "",
        timereserve: "",
        maxhs: "",
    })
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
                <TitlePage titulo="Espacios" />
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
