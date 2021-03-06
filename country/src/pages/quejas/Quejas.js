import '../users/Users.css'

import {Button, Modal, TextField,} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalDetails from '../../components/pageComponents/ModalDetails';
import ModalRespuestaQueja from "../../components/pageComponents/ModalRespuestaQueja"
import {QuejasContext} from '../../context/QuejasContext';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
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
                 cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },  
      title:"Fecha",
        render: data => ((data.created_at).slice(0,10)).split(" ")[0].split("-").reverse().join("-")
    },
    {
                 cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },  
      title:"Tipo",
        render: data => data.state.name
    },
    {
                 cellStyle: {
        minWidth:150,
        maxWidth:150
      },  
      title:"Asunto",
        field: "subject"
    },
    {
                 cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },  
      title:"Propietario",
      render: data => data.property.users[0].name
    },
    {
                 cellStyle: {
        minWidth: 80,
        maxWidth: 80
      },  
      title:"Estado",
        render: data => data.state.name},
    
    {
                 cellStyle: {
        minWidth: 60,
        maxWidth: 60
      },  
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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false)
    const [responseId, setResponseId] = useState("");
    const [responseAsco, setResponseAsco] = useState(false);
    const { dataQuejas, setdataQuejas } = useContext(QuejasContext);


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



    const buscarCotizacion = async() => {
      
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1500);
        const url = `https://back2.tinpad.com.pe/public/api/complaint-claim`;
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
            
        }
        
        
        const rtdo = await axios.get(url, {headers})
        
        console.log(rtdo.data.data[0]);
        setdataQuejas(rtdo.data.data)
      
     
     

    }

    useEffect(() => {
      setdataUser(JSON.parse(localStorage.getItem('user')))
    }, []);
    useEffect(() => {
      if (dataQuejas.length === 0) {

        console.log(dataQuejas.length);
        buscarCotizacion()
        
    }else{
        console.log(dataQuejas.length);
        return
    }
      }, [dataUser]);

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
            setResponseAsco(true)
            // setSpaceId(response.data.data.id)
          }).catch(error=>{
            console.log(error);
          })
          peticionPut()

        
        }
        

        const peticionPut=async()=>{       
          console.log("actualizando");
          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
          await axios.put("https://back2.tinpad.com.pe/public/api/complaint-claim"+"/"+info.id,  {stateId:"5"} , {headers: headers})
          .then(response=>{

            console.log("actualizado");
     
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
          
                if (selectedFilesPost) {
                  
                    
                  f.append("attached", selectedFilesPost)
                  f.append("subject", infoResp.subject)
                }else{
                 
                   f.append("subject", infoResp.subject)
                }
      
      
            
      
          // console.log(f);
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/response"
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
      
        
     
        }

      const bodyDetails =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Detalle de Queja o Reclamo</h1>
                <div className='linea'></div>
                <h3 >Propietario: <span className="mt-5 detailsInfo">{info.property&&info.property.users[0].name}</span></h3>
                <h3 >Manzana: <span className="mt-5 detailsInfo">{info.property&&info.property.block}</span></h3>
                <h3 >Lote: <span className="mt-5 detailsInfo">{info.property&&info.property.lot}</span></h3>
                <h3 >Doc de Identidad: <span className="mt-5 detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Proceso: <span className="mt-5 detailsInfo">{info.state&&info.state.scope}</span></h3>
                <h3 >Asunto: <span className="mt-5 detailsInfo">{info&&info.subject}</span></h3>
                <h3 >Descripci??n: <span className="mt-5 detailsInfo">{info&&info.description}</span></h3>
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
        <form action="" onSubmit={onSubmitInsertar}>
      
        <div className={styles.modal}>
          <h3 className="my-5">Agregar archivo</h3>

          { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }

  
          <TextField className={styles.inputMaterial} name="subject" onChange={handleChangeInsert2} label="Titulo*"  />
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
      <h4 ><span className="detailsInfo">{info&&info.attached}</span></h4>
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
                <TitlePage titulo="Quejas y Reclamos" />
 
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}
                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={dataQuejas}
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
