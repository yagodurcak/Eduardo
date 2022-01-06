import '../users/Users.css'

import {Button, Modal, TextField,} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import ModalDetails from '../../components/pageComponents/ModalDetails';
import ModalRespuestaQueja from "../../components/pageComponents/ModalRespuestaQueja"
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
        render: data => ((data.created_at).slice(0,10)).split(" ")[0].split("-").reverse().join("-")
    },
    {
        title:"Tipo",
        render: data => data.state.name
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
        render: data => ((data.state.updated_at).slice(0,10)).split(" ")[0].split("-").reverse().join("-")}
    
]


function Quejas() {

    const [data, setdata] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalRespuestaQueja, setShowModalRespuestaQueja] = useState(false);
    const [infoProperty, setInfoProperty] = useState({});
    const [infoScope, setInfoScope] = useState({});
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState();




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
    const abrirCerrarModalRespuestaQueja=()=>{
        setShowModalRespuestaQueja(!showModalRespuestaQueja);
      }

      const seleccionarUser=(user, caso)=>{

        setInfo(user);
        // console.log(info.property.block);
        abrirCerrarModalDetails()
    
      }
      const seleccionarUser2=()=>{

    
        // console.log(info.property.block);
        abrirCerrarModalDetails()
        abrirCerrarModalRespuestaQueja()
    
      }

      useEffect(() => {
        setInfoProperty(info.property)
        setInfoScope(info.state)
      }, [abrirCerrarModalDetails]);

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
      const removeSelectedImage = () => {
        setSelectedImage();
    };
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
  
          setSelectedImage(e.target.files[0].name);
          console.log(e.target.files[0]);
          setSelectedFilesPost(e.target.files[0])
        }
    };

      const handleChangeInsert = (e) => {
      
        setInfo({
          ...info,
          [e.target.name]: e.target.value
        })
      }

      const bodyDetails =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Detalle de Queja o Reclamo</h1>
                <div className='linea'></div>
                <h3 >Propietario: <span className="mt-5 detailsInfo">{info&&info.propertyId}</span></h3>
                <h3 >Manzana: <span className="mt-5 detailsInfo">{info.property&&info.property.block}</span></h3>
                <h3 >Lote: <span className="mt-5 detailsInfo">{info.property&&info.property.lot}</span></h3>
                <h3 >Doc de Identidad: <span className="mt-5 detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Proceso: <span className="mt-5 detailsInfo">{info.state&&info.state.scope}</span></h3>
                <h3 >Asunto: <span className="mt-5 detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Descripción: <span className="mt-5 detailsInfo">{info&&info.description}</span></h3>
                <h3 >Documentos Adjuntos:</h3>
                <div className='mt-5 flex justify-start items-center'>
                <i className="material-icons">attach_file</i>
                <h4 ><span className="detailsInfo">{info&&info.attached}</span></h4>
                </div>

                <button className='btn btn-2 mt-10' onClick={()=>seleccionarUser2() }>Responder</button>


            </div>
        </div>
        )
      const bodyRespuestaQueja =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Respuesta a la Queja o Reclamo</h1>
                <div className='linea'></div>

                <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Respuesta*" multiline rows={3} />


     
                <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"   id="file" name='image' onChange={imageChange} />
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">attach_file</i>
          </label>
        </div>
                </div> <br/>
                {selectedImage && (
          <div className='eliminarImg'>
        <h4>{selectedImage}</h4>
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )}
        
     

                <button className='btn btn-2 mt-10' >Responder</button>


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
            <ModalRespuestaQueja
            showModalRespuestaQueja={showModalRespuestaQueja}
            functionShow= {abrirCerrarModalRespuestaQueja}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={info}
            bodyRespuestaQueja={bodyRespuestaQueja}
            />
        </div>
    )
}

export default Quejas
