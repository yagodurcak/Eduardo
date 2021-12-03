import './Users.css'

import React,{useEffect, useState}  from 'react';

import Search from '@material-ui/icons/Search';
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

    const traerFrase = async () => {
        const api = await fetch("http://localhost:3001/Users");
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
                <TitlePage titulo="Usuarios Propietarios" />
                <div className="flex justify-end ">
                    <button className="btn">
                        Agregar
                    </button>
                </div>

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
                        icon:() => <span class="material-icons md-18">face</span>,
                        tooltip:"Eliminar",
                        onClick: (event, rowdata) => alert("¿Quiere eliminar al usuario:  " + rowdata.artista + "?")   
                    },
                    {
                        icon:() => <span class="material-icons md-18">face</span> ,
                        tooltip:"detaile",
                        onClick: (event, rowdata) => alert("¿Quiere detalle:  " + rowdata.artista + "?")   
                    }
                ] }

                 /></div>
            </div>
        </div>
    )
}

export default Users
