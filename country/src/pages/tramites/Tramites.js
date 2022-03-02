import '../users/Users.css'

import {Button, Modal, TextField,} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalDetails from '../../components/pageComponents/ModalDetails';
import ModalRespuestaQueja from "../../components/pageComponents/ModalRespuestaQueja"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import {TramitesContext} from '../../context/TramitesContext';
import axios from "axios"
import {makeStyles} from '@material-ui/core/styles';
import { userContext } from '../../context/UserContext';

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
                       cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },
      field: "fecha"
    }
    ,
    {
        title:"Tipo",
                       cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },
      field: "tipo"
    }
    ,
    {
        title:"Proyecto",
                       cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },
      field: "Proyecto"
    }
    ,
    {
        title:"Propietario",
                       cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },
      field: "Propietario"
    }
    ,
    {
        title:"Estado",
                       cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },
      field: "Estado"
    }
   
    
]


function Tramites() {

  const [data, setdata] = useState([]);
  const [cleanData, setCleanData] = useState([]);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const [showModalRespuestaQueja, setShowModalRespuestaQueja] = useState(false);

    const [infoScope, setInfoScope] = useState({});
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [responseId, setResponseId] = useState("");
    const [infoProject, setInfoProject] = useState({});
    const [infoProperties, setInfoProperties] = useState({});
    const [infoPropertiesUser, setinfoPropertiesUser] = useState({});
    const { dataTramites, setdataTramites } = useContext(TramitesContext);


    const { dataUser, setdataUser } = useContext(userContext);

    const [info, setInfo] = useState({
        subject: "",
        propertyId: "",
        stateId:"" ,  
        subject: "",
          description:"",
          file:""      
  
      })
    const [infoResp, setInfoResp] = useState({
        subject: "",
        attached:""      
  
      })

      const{subject, attached} = infoResp;
    
    const abrirCerrarModalDetails=()=>{
        setShowModalDetails(!showModalDetails);
        console.log(info);
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
      const seleccionarUser3=()=>{

    
        // console.log(info.property.block);
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

    const buscarCotizacion = async() => {
      
      setLoading(true)
      setTimeout(() => {
      setLoading(false)
      }, 1500);
        const url = `https://back2.tinpad.com.pe/public/api/owner-process`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

        }


        const rtdo = await axios.get(url, {headers})

        console.log(rtdo.data.data);
      
        // setdata(rtdo.data.data)
        setdataTramites(rtdo.data.data)
        // setdata([rtdo.data.data])
        // setdataUser(JSON.parse(localStorage.getItem('user')))
    }

    useEffect(() => {
        
      if (dataTramites.length === 0) {

          console.log(dataTramites.length);
          buscarCotizacion()
          
      }else{
          console.log(dataTramites.length);
          return
      }
  }, []);


      
      const nuevaData = () => {
        
        let newData= [];

        for (let i = 0; i < dataTramites.length; i++) {
      
          newData.push(
            {
              fecha: dataTramites[i].proyectDate,
               tipo:  dataTramites[i].proyect.project_type.name,
               Proyecto:  dataTramites[i].proyect.name,
               Descripción:  dataTramites[i].proyect.description,
               Documento: dataTramites[i].proyect.property.users[0].document,
               Propietario: dataTramites[i].proyect.property.users[0].name + " "+ dataTramites[i].proyect.property.users[0].lastName,
               file: dataTramites[i].attachments[0],
               Estado:  dataTramites[i].state.name,
               id:  dataTramites[i].id,
               Propiedad:  dataTramites[i].proyect.property

              
              })
          
        }
   
         
        setCleanData(newData)
          console.log(newData);
      }
      useEffect(() => {
        nuevaData()
      }, [dataTramites]);
      const styles= useStyles();
      const removeSelectedImage = () => {
        setSelectedImage();
    };

    useEffect(() => {
  peticionPost2()
    }, [responseId]);
    const peticionPost2=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
      const info3 ={
        "complaintClaimId":info.id,
        "responseComplaintClaimId":responseId
      }
     const url2 = "https://back2.tinpad.com.pe/public/api/response-association"
          await axios.post(url2, info3, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            console.log(response.data.data.id);
     
            // setSpaceId(response.data.data.id)
          }).catch(error=>{
            console.log(error);
          })
    
          buscarCotizacion()
        
        }

    const onSubmitInsertar = (e) => {
             e.preventDefault();
     
     if (subject.trim() === "") {
     
     setError(true);
     return
     }else {
     setError(false);
     
     peticionPost()
     
     setSelectedImage()
     setInfoResp({
         subject: "",
         attached:""    
     
     });
     
     abrirCerrarModalRespuestaQueja()
     }
     buscarCotizacion()
     
     setLoading(true)
     setTimeout(() => {
     setLoading(false)
     }, 2000);

    }
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

      const handleChangeInsert2 = (e) => {
      
        setInfoResp({
          ...infoResp,
          [e.target.name]: e.target.value
        })
      }

      const peticionPost=async()=>{
        console.log("post2");
      
        const f = new FormData()   
      
      
        
        console.log(info);
        // console.log(selectedFilesPost.length > 0);
          
            
                  
                    
                  f.append("file", selectedFilesPost)
                  f.append("ownerProcessId", info.id)
                  f.append("description", info.Descripción)
         
      
      
            
      
          // console.log(f);
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/process-observation"
            await axios.post(url1, f, {headers})
            .then(response=>{
                console.log(response);
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
              setResponseId(response.data.data.id)
              setSelectedFilesPost([])
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
      
              setSelectedFilesPost([])
            })
      
        // console.log(filesImg);
          buscarCotizacion()
     
        }

        const peticionPut=async()=>{       

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
          await axios.put("https://back2.tinpad.com.pe/public/api/owner-process"+"/"+info.id,  {stateId:"4"} , {headers: headers})
          .then(response=>{

            console.log("actualizado");
     
          }).catch(error=>{
            console.log(error);
          })
         buscarCotizacion()
         abrirCerrarModalDetails()
        }

      const bodyDetails =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Detalle</h1>
                <div className='linea'></div>
                <h3 >Propietario: <span className="mt-5 detailsInfo">{info&&info.Propietario}</span></h3>
                <h3 >Manzana: <span className="mt-5 detailsInfo">{info.Propiedad&&info.Propiedad.block}</span></h3>
                <h3 >Lote: <span className="mt-5 detailsInfo">{info.Propiedad&&info.Propiedad.lot}</span></h3>
                <h3 >Doc de Identidad: <span className="mt-5 detailsInfo">{info&&info.Documento}</span></h3>
                <h3 >Proyecto: <span className="mt-5 detailsInfo">{info.Proyecto&&info.Proyecto}</span></h3>
                {/* <h3 >Asunto: <span className="mt-5 detailsInfo">{info.proyect&&info.proyect.description}</span></h3> */}
                <h3 >Descripción: <span className="mt-5 detailsInfo">{info&&info.Descripción}</span></h3>
                <h3 >Documentos Adjuntos:</h3>

                {/* <div className="d-flex justify-content-center mt-5">
                <a href={"https://back2.tinpad.com.pe/public/" + info.file&&info.file.path} target="_blank"  className="linkdownload" >
                    <i className="material-icons file_download">file_download</i></a>
              </div> */}
          

                <div className='separaBoton'>
                  <button className='btn btn-2 mt-10' onClick={()=>peticionPut(info) }>Aprobar</button>
                  <button className='btn btn-2 mt-10' onClick={()=>seleccionarUser2() }>Observar</button>
                </div>


            </div>       
          </div>       
        )
      const bodyRespuestaQueja =( 
        <form action="" onSubmit={onSubmitInsertar}>
      
        <div className={styles.modal}>
          <h3 className="my-5">Agregar archivo</h3>

          { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }

  
          <TextField className={styles.inputMaterial} name="subject" onChange={handleChangeInsert2} label="Observación*"  />
          <br />
          <br />
          <br /> 
          <div className='mt-5'>
              {/* <label>Choose File to Upload: </label> */}
              <input type="file"  onChange={imageChange} id="file" name='image'/>
          <div className="label-holder">
        <label htmlFor="file" className="label">
          <i className="material-icons">attach_file</i>
        </label>
      </div>
              </div> <br/>
   

          {selectedImage && (
        <div className='eliminarImg'>
      <h4 ><span className="detailsInfo">{info.file&&info.file.name}</span></h4>
          <button onClick={removeSelectedImage} style={styles.delete}>
            Eliminar
          </button>
        </div>  )}
            
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalRespuestaQueja}> Cancelar</Button>
            </div>
          </div>
        </form>
        )


    return (
        <div>
            <div>
                <TitlePage titulo="Tramites" />
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

            
                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={cleanData}
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

export default Tramites
