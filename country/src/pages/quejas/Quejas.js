import '../users/Users.css'

import React,{useEffect, useState}  from 'react';

import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"

const customerTableHead = [

    {
        title:"Fecha",
        field: "date"
    },
    {
        title:"Tipo",
        field: "Type"
    },
    {
        title:"Asunto",
        field: "subject"
    },
    {
        title:"Propietario",
        field: "propertyId"
    },
    {
        title:"Estado",
        field: "stateId"
    },
    {
        title:"Actualiz.",
        field: "update"
    }
]


function Quejas() {

    const [data, setdata] = useState([]);

    // const traerFrase = async () => {
    //     const api = await fetch("http://localhost:3001/Quejas");
    //     const frase = await api.json()
    //     console.log(frase[0]);
    //     setdata(frase)
    // }
    
    // useEffect(() => {
    //     traerFrase()
    // }, [])

    useEffect(() => {
     
    
        const buscarCotizacion = async() => {
          
            const url = `https://back2.tinpad.com.pe/public/api/complaint-claim`;
  
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
                <TitlePage titulo="Quejas y Reclamos" />
 
  
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
                        icon:() => <span class="material-icons find">
                        find_in_page
                        </span>,
                        tooltip:"Detalles",
                        onClick: () => console.log("hola")
                    }, 
                ] }

                 /></div>
            </div>
        </div>
    )
}

export default Quejas
