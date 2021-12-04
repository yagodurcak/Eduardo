import './Users.css'

import React,{useEffect, useState}  from 'react';

import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';

const customerTableHead = [
    {
        title:"Id",
        field: "id",       
       
    },
    {
        title:"Nombres",
        field: "name"
    },
    {
        title:"Apellidos",
        field: "lastname"
    },
    {
        title:"Doc. de Identidad",
        field: "dni"
    },
    {
        title:"Teléfono",
        field: "phone"
    },
    {
        title:"Mz.",
        field: "mza"
    },
    {
        title:"Lte.",
        field: "lte"
    },
    {
        title:"Correo",
        field: "email"
    }
]


function Users() {

    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [info, setInfo] = useState({
        dni: "",
        email: "",
        lastname: "",
        lte: "",
        mza: "",
        name: "",
        phone: ""
    })
   
    console.log(data);

    const handleChangeInsert = (e) => {
        
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const traerFrase = async () => {
        const api = await fetch("http://localhost:3001/Users");
        const frase = await api.json()
        console.log(frase[0]);
        setdata(frase)
    }
    
    useEffect(() => {
        traerFrase()
    }, [])

    
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Usuarios Propietarios" />
                <div className="flex justify-end ">
                    <button className="btn" onClick={()=>abrirCerrarModalInsertar()}>
                        Agregar
                    </button>
                </div>

                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
                 actions= {[
                     
                            {
                        icon:() => <i class="material-icons edit">edit</i>,
                        tooltip:"Editar",
                        onClick: (event, rowdata) => alert("¿Quiere editar al usuario?")   
                    },
                    {
                        icon:() => <i class="material-icons delete">highlight_off</i>,
                        tooltip:"Eliminar",
                        onClick: (event, rowdata) => alert("¿Quiere eliminar al usuario:  " + rowdata.artista + "?")   
                    }
          
                ] }

                 /></div>
            </div>
            <ModalInsertar
            showmodalInsertar={showModalInsertar}
            functionShow= {abrirCerrarModalInsertar}
            handleChangeInsert={handleChangeInsert}
            />
        </div>
    )
}

export default Users
