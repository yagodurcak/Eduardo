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
        title:"Tipo de visita",
        field: "typeVisitId",       
       
    },
    {
        title:"Descripción",
        field: "description"
    },
    {
        title:"Max. personas",
        field: "maximunNumberPerson"
    },
    {
        title:"Horario de entrada (hs)",
        render: data => data.startingTimeRange + " hs"
  
    },
    {
        title:"Horario de salida (hs)",
        render: data => data.endingTimeRange + " hs"
  
    },
    {
        title:"Dias disponibles",
        field: "availableDays"
    },
]


const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Visita() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)
    
    const [info, setInfo] = useState({
        type: "",
        description: "",
        hs: "",
        days: "",
        max: "",
  
    })

    
    const [error, setError] = useState(false)

    
    
    
    
    const{max, type, description, hs, days} = info;
    
    
    const baseUrl="http://localhost:3001/Visita";
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
    //   const api = await fetch(baseUrl);
    //   const frase = await api.json()
    //   console.log(frase[0]);
    //   setdata(frase)
    // }
    useEffect(() => {
     
    
      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/rules-visit-provider`;

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
              artista.hs=info.hs;
              artista.description=info.description;
              artista.max=info.max;
              artista.days=info.days
  
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

        if (type.trim() === "" || days.trim() === "" ||description.trim() === "" ||hs.trim() === "" ||max.trim() === ""  ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
                type: "",
                description: "",
                hs: "",
                days: "",
                max: "",
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
            <h3 className="my-5">Agregar Regla</h3>

            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            {/* <label htmlFor="">Seleccione un tipo*</label>
            <select className="select1">
                     
                        <option value="s" >Visita</option>
                        <option value="ss" >Proveedor </option>           
                   
                    </select>    */}
            
            <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} label="Tipo*"  />
            <br />
              <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert}  label="Descripción*" multiline rows={3} />
       
              <br />
              <TextField className={styles.inputMaterial} name="hs" onChange={handleChangeInsert}  label="Rango de horario*" />
            <br />
              <TextField className={styles.inputMaterial} name="days" onChange={handleChangeInsert}  label="Días disponibles*" />
              <TextField className={styles.inputMaterial} name="max" onChange={handleChangeInsert}  label="Max. Personas*" />

             
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
        <h3 className="my-5">Editar Regla</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} value={info && info.type} label="Tipo*" />
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
        <br />
        <TextField className={styles.inputMaterial} name="hs" onChange={handleChangeInsert} value={info && info.hs} label="Rango de horario*" />
        <br />
        <TextField className={styles.inputMaterial} name="days" onChange={handleChangeInsert} value={info && info.days} label="Días disponibles*" />
        <TextField className={styles.inputMaterial} name="max" onChange={handleChangeInsert} value={info && info.max} label="Max. Personas*" />
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
                <TitlePage titulo="Reglas para visitas y proveedoress" />
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

export default Visita