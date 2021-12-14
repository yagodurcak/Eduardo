import '../users/Users.css'

import {
    Link,
    NavLink,
} from "react-router-dom";
import React,{useEffect, useState}  from 'react';

import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';

function GastosComunes() {
    
    const [data, setdata] = useState([]);
    const [cobranza, setCobranza] = useState(10)
    
    const customerTableHead = [
    
        {
            title:"Propietario",
            field: "propietario"
        },
        {
            title:"Doc de Identidad",
            field: "dni"
        },
        {
            title:"Mz.",
            field: "mza"
        },
        {
            title:"Lte.",
            field: "lote"
        },
        {
            title:"Área(m2)",
            field: "area"
        },
        {
            title:"Pariticipacion (%)",
            field: "Participación"
        },
        {
            title:"Subtotal(S/)",
            field: "subt"
        }
        ,
        {
            title:"Cobranza(S/)",
            field: "cobranza"
        }
        ,
        {
            title:"Total",
           render: data => data.lote + cobranza
        }
        ,
        {
            title:"Recibo",
            field: "recibo"
        }
    ]
    const traerFrase = async () => {
        const api = await fetch("http://localhost:3001/Calculos");
        const frase = await api.json()
        console.log(frase[0]);
        setdata(frase)
    }

    console.log(data);
    
    useEffect(() => {
        traerFrase()
    }, [])

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Gastos Condominio" />
                        <button className='btn-gastos'>
                            <Link to="/Calculos" style={{ textDecoration: 'none' }}>
                                    <NavLink className="logoContainter1" exact to="/Calculos" activeClassName="linkactivo">
                                        {/* <img src={tramites} alt="" className='logo1' /> */}
                                        <h1 className="title1">Calculos</h1>
                                        {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                    </NavLink>
                            </Link>
                        </button>


                <div className="mt-10"><Table2
                    title=""
                    columns={customerTableHead}
                    data={data}
                    actions={[
                        {
                            icon: () => <span class="material-icons find">
                                find_in_page
                            </span>,
                            tooltip: "Detalles",
                            onClick: () => console.log("hola")
                        },
                    ]}
                /></div>



            </div>
        </div>
    )
}

export default GastosComunes
