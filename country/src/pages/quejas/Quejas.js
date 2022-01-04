import '../users/Users.css'

import React,{useEffect, useState}  from 'react';

import ModalDetails from '../../components/pageComponents/ModalDetails';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import {makeStyles} from '@material-ui/core/styles';

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
      transform: 'translate(-50%, -50%)',
    //   display: "grid"
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));
const customerTableHead = [

    {
        title:"Fecha",
        render: data => ((data.created_at).slice(0,10))
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
        render: data => data.state.name},
    
    {
        title:"Actualiz.",
        render: data => ((data.state.updated_at).slice(0,10))}
    
]


function Quejas() {

    const [data, setdata] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);



    const [info, setInfo] = useState({
        subject: "",
        propertyId: "",
        stateId:"" ,  
        subject: "",
          description:"",
          file:""      
  
      })
    
    const abrirCerrarModalDetails=()=>{
        setShowModalDetails(!showModalDetails);
      }

      const seleccionarUser=(user, caso)=>{
        setInfo(user);
        abrirCerrarModalDetails()
    
      }

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

      const styles= useStyles();

      const bodyDetails =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Detalle de Queja o Reclamo</h1>
                <div className='linea'></div>
                <h3 >Propietario: <span className="detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Manzana: <span className="detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Lote: <span className="detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Doc de Identidad: <span className="detailsInfo">{info&&info.subject}</span></h3>
                {/* <h3 >Proceso: <span className="detailsInfo">{info&&info.state.scope}</span></h3> */}
                <h3 >Asunto: <span className="detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Descripción: <span className="detailsInfo">{info&&info.description}</span></h3>
                <h3 >Documentos Adjuntos:</h3>
                <div className='flex justify-start items-center'>
                <i className="material-icons">attach_file</i>
                <h4 ><span className="detailsInfo">{info&&info.attached}</span></h4>
                </div>


            </div>
        </div>
        )

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
                        onClick: (event, rowData) => seleccionarUser(rowData, "Details") 
                    }, 
                ] }

                 /></div>
            </div>
            <ModalDetails
            showModalDetails={showModalDetails}
            functionShow= {abrirCerrarModalDetails}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={info}
            bodyDetails={bodyDetails}
            />
        </div>
    )
}

export default Quejas
