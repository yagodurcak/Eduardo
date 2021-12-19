import '../users/Users.css'

import {
    Link,
    NavLink,
} from "react-router-dom";
import React,{useEffect, useState}  from 'react';

import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import imagen from "../../assets/Dashboard Login.jpg"

function GastosComunes() {
    
    const [data, setdata] = useState([]);
    const [cobranza, setCobranza] = useState(10)
    
    const customerTableHead = [
    
        {
            title:"Item",
            field: "id"
        },
        {
            title:"Concepto",
            field: "concept"
        },
        {
            title:"N° de Factura",
            field: "invoiceNumber"
        },
        {
            title:"Monto S/",
            field: "amount"
        },
        {
            title:"Archivo",
            render: data =>  <a href= {imagen} download className='enlaceDownload'><span class="material-icons">
            attach_file
            </span></a>
 
        }
    ]
    // const traerFrase = async () => {
    //     const api = await fetch("http://localhost:3001/Calculos");
    //     const frase = await api.json()
    //     console.log(frase[0]);
    //     setdata(frase)
    // }

    // console.log(data);
    
    // useEffect(() => {
    //     traerFrase()
    // }, [])
    
    
    useEffect(() => {




          
     
    
        const buscarCotizacion = async() => {
          
            const url = `https://back2.tinpad.com.pe/public/api/condominium-expense`;
  
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
            }
    
    
            const rtdo = await axios.get(url, {headers})
            
            console.log(rtdo.data.data[0]);
          
            setdata(rtdo.data.data)
    
        }
    
        buscarCotizacion()
        
        console.log(data);
      }, []);


    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Gastos Condominio" />
                        <div className="flex justify-between">
                            <button className='btn btn-2'>
                                <Link to="/Calculos" style={{ textDecoration: 'none' }}>
                                        <NavLink className="logoContainter1" exact to="/Calculos" activeClassName="linkactivo">
                                            {/* <img src={tramites} alt="" className='logo1' /> */}
                                            <h1 className="title1">Calculos</h1>
                                            {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                        </NavLink>
                                </Link>
                            </button>
                                            <button className="btn" >
                            Agregar gasto
                                                </button>
                        </div>


                <div className="mt-10"><Table2
                    title=""
                    columns={customerTableHead}
                    data={data}
                    // actions={[
                    //     {
                    //         icon: () => <span class="material-icons find">
                    //             find_in_page
                    //         </span>,
                    //         tooltip: "Detalles",
                    //         onClick: () => console.log("hola")
                    //     },
                    // ]}
                /></div>



            </div>
        </div>
    )
}

export default GastosComunes
