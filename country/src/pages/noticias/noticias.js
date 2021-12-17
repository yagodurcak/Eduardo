import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import down from "../../IMG/down.svg"
import {makeStyles} from '@material-ui/core/styles';

// import { Switch } from 'antd';



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
    
        render: data => (data.publicationDate).split(" ")[0].split("-").reverse().join("-")
    },
    {
        title:"Tipo",
        field: "typeReleaseId",       
       
    },
    {
        title:"Titulo",
        field: "title"
    }]


const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Noticias() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)

    const [info, setInfo] = useState({
        type: "",
        date: "",
        title:"" ,  
        description: ""
    })

    const [error, setError] = useState(false)





    const{date, type, title, description} = info;

  
    const baseUrl="http://localhost:3001/Noticias";
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }

    // const traerFrase = async () => {
    //     const api = await fetch(baseUrl);
    //     const frase = await api.json()
    //     console.log(frase[0]);
    //     setdata(frase)
    // }
    useEffect(() => {
     
    
      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/new-release`;

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
    const peticionPost=async()=>{
        await axios.post(baseUrl, info)
        .then(response=>{
          setdata(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionDelete=async()=>{
        await axios.delete(baseUrl+"/"+info.id, info)
        .then(response=>{
          setdata(data.filter(artista=>artista.id!==info.id));
          abrirCerrarModalEliminar();
        }).catch(error=>{
          console.log(error);
        })
      }


      const peticionPut=async()=>{
        await axios.put(baseUrl+"/"+info.id, info)
        .then(response=>{
          var dataNueva= data;
          dataNueva.map(artista=>{
            if(artista.id===info.id){
              artista.type=info.type;
              artista.date=info.date;
              artista.title=info.title  
            }
          });
          setdata(dataNueva);
          abrirCerrarModalEditar();
        }).catch(error=>{
          console.log(error);
        })
      }

      const handleChangeSwitch = () => {
          setSwitchOn(!switchOn)
        
      }
      
      
      const onSubmitInsertar = (e) => {
                    e.preventDefault();

        if (type.trim() === "" || title.trim() === "" ||description.trim() === "") {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
                type: "",
                date: "",
                title:"" ,  
                description: ""
            });

            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = () => {

            peticionPut()
           
        }

    // useEffect(() => {
    //     traerFrase()
    // }, [])

    
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

      const abrirCerrarModalEditar=()=>{
        setShowModalEditar(!showModalEditar);
      }
      const abrirCerrarModalEliminar=()=>{
        setShowModalEliminar(!showModalEliminar);
      }
      const styles= useStyles();

      const bodyInsertar=(
        <form action="" onSubmit={onSubmitInsertar}>
      
          <div className={styles.modal}>
            <h3 className="my-5">Agregar noticia o comunicado</h3>

            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            {/* <label htmlFor="">Seleccione un tipo*</label>
            <select className="select1">
                     
                        <option value="s" >Visita</option>
                        <option value="ss" >Proveedor </option>           
                   
                    </select>    */}
            
            <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} label="Tipo*"  />
            <TextField className={styles.inputMaterial} name="title" onChange={handleChangeInsert} label="Titulo*"  />
            <br />
              <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert}  label="Descripción*" multiline rows={3} />
              
            
   
              <div className="mt-10 flex items-center">
                  <h4 className="text-gray-600 my-5 mr-10">Adjuntar archivo :</h4>
                  <div>
                    
                                      <input type="file" name="photo" id="upload-photo" />
                  </div>    
              </div>
              <div className="mt-10 flex items-center">
                  <h4 className="text-gray-600 my-5 mr-10">Adjuntar imagen :</h4>
                  <div>
                    
                                      <input type="file" name="photo" id="upload-photo" />
                  </div>    
              </div>
            
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalInsertar}> Cancelar</Button>
            </div>
          </div>
        </form>
      )



  const bodyEditar = (
    <form action="" onSubmit={onSubmitEditar}>
      <div className={styles.modal}>
        <h3 className="my-5">Editar noticia o comunicado</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} value={info && info.type} label="Tipo*" />
        <TextField className={styles.inputMaterial} name="title" onChange={handleChangeInsert} value={info && info.title} label="Titulo*" />
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" multiline rows={3} />
        <br />
        <div className="mt-10 flex items-center">
                  <h4 className="text-gray-600 my-5 mr-10">Adjuntar archivo :</h4>
                  <div>
                    
                                      <input type="file" name="photo" id="upload-photo" />
                  </div>    
              </div>
              <div className="mt-10 flex items-center">
                  <h4 className="text-gray-600 my-5 mr-10">Adjuntar imagen :</h4>
                  <div>
                    
                                      <input type="file" name="photo" id="upload-photo" />
                  </div>    
              </div>
        <br /><br />
        <div align="right">
          <Button color="primary" type="submit" >Editar</Button>
          <Button onClick={() => abrirCerrarModalEditar()}> Cancelar</Button>
        </div>
      </div>
    </form>
        )

        

        const bodyEliminar=(
            <div className={styles.modal}>
              <p>Estás seguro que deseas eliminar  <b>{info&&info.type}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Noticias y comunicados" />
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
                        icon:() =>  <Switch {...label} defaultChecked onChange={handleChangeSwitch} className="toggle-button"/>,
                        tooltip:"add",
                        
                    },
                     
 
                            {
                        icon:() => <i class="material-icons edit">edit</i>,
                        tooltip:"Editar",
                        onClick: (event, rowData) => seleccionarUser(rowData, "Editar") 
                    },
                    {
                        icon:() => <i class="material-icons delete">highlight_off</i>,
                        tooltip:"Eliminar",
                        // onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")   
                        onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")
                    }
          
                ] }

                 /></div>
            </div>
            <ModalInsertar
            showmodalInsertar={showModalInsertar}
            functionShow= {abrirCerrarModalInsertar}
            handleChangeInsert={handleChangeInsert}
            onSubmitInsertar={onSubmitInsertar}
            error={error}
            bodyInsertar={bodyInsertar}
           
            
            />
            <ModalEditar
            showModalEditar={showModalEditar}
            functionShow= {abrirCerrarModalEditar}
            handleChangeInsert={handleChangeInsert}
            onSubmitEditar={onSubmitEditar}
            info={info}
            bodyEditar={bodyEditar}
            />
            <ModalEliminar
            showModalEliminar={showModalEliminar}
            abrirCerrarModalEliminar= {abrirCerrarModalEliminar}
            onSubmitEditar={onSubmitEditar}
            info={info}
            peticionDelete={peticionDelete}
            bodyEliminar={bodyEliminar}
            />
        </div>
    )
}

export default Noticias