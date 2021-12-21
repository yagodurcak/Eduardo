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
        title:"Tipo de espacio",
        // field: data.space_type,    
        render: data => data.space_type.name 
       
    },
    {
        title:"Descripción",
        field: "description"
    },
    {
        title:"N° o Nombre",
        field: "internalCode"
    },
    {
        title:"Tiempo previo para reservar",
        render: data => data.previusReservationTime + " hs"
      
    },
    {
        title:"Horas máximas al mes",
        render: data => data.maximiunReservationTime +  " hs"
       
    },
]


const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Espacio() {
 
    const [data, setdata] = useState([]);
    const [spaceTypes, setSpaceTypes] = useState("")
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)
    
    const [info, setInfo] = useState({
        id: "",
        spaceTypeId: "",
        description: "",
        internalCode: "",
        previusReservationTime: "",
        maximiunReservationTime: "",
        rulesOfUse: ""
    })

    
    
    const [error, setError] = useState(false)
    
    
    
    const{maximiunReservationTime,rulesOfUse, spaceTypeId, description, internalCode, previusReservationTime,id} = info;


  
    const baseUrl="https://back2.tinpad.com.pe/public/api/space";
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

    useEffect(() => {
     
    
      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/space`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data[0]);
        
          setdata(rtdo.data.data)

  
      }
  
      buscarCotizacion()
      
      // console.log(data);
      
    }, []);

    useEffect(() => {
     
    
      const buscarTipo = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/space-type`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data);
        
          setSpaceTypes(rtdo.data.data)
  
      }
  
      buscarTipo()
      
      // console.log(data);
    }, []);
    

    const peticionPost=async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
        await axios.post(baseUrl, info, {headers})
        .then(response=>{
          setdata(data.concat(response.data));
          abrirCerrarModalInsertar();
        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionDelete=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
        await axios.delete(baseUrl+"/"+info.id, {headers}, info) 
        .then(response=>{
          setdata(data.filter(artista=>artista.id!==info.id));
          abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })
      }


      const peticionPut=async()=>{

       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
        await axios.put(baseUrl+"/"+info.id,  info , {headers: headers})
        .then(response=>{
          var dataNueva= data;
          dataNueva.map(artista=>{
            if(artista.id===info.id){
              artista.spaceTypeId =info.spaceTypeId;
              artista.internalCode=info.internalCode;
              artista.description=info.description;
              artista.previusReservationTime=info.previusReservationTime;
              artista.maximiunReservationTime=info.maximiunReservationTime;
              artista.rulesOfUse=info.rulesOfUse  
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

        if (description.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
              id: "",
              spaceTypeId: "",
        description: "",
        internalCode: "",
        previusReservationTime: "",
        maximiunReservationTime: "",
        rulesOfUse: ""
            });
            // window.location.reload();
            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = (e) => {

      e.preventDefault();
            peticionPut()
           
        }


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
            <h3 className="my-5">Agregar Nuevo Espacio</h3>

            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            {/* <label htmlFor="">Seleccione un tipo*</label> */}
            {/* <select className="select1">
                     
            <option value="cat" >Seleccione la categoria</option>
                        {spaceTypes.map(tipos=> (
                            <option value={tipos.id} key={tipos.id} >{tipos.id}</option>
                        ))}
                        <option value="">Crear nuevo</option>
                        
                   
          </select>    */}

            
            {/* <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} label="Tipo*"  />  */}
            <br />
              <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert}  label="Descripción*"  multiline rows={3}/>
              <TextField className={styles.inputMaterial} name="spaceTypeId" onChange={handleChangeInsert}  label="typeid*" />
            <TextField className={styles.inputMaterial} name="internalCode" onChange={handleChangeInsert}  label="ID (N° o nombre)*" />          
              <br />
              <TextField className={styles.inputMaterial} name="previusReservationTime" onChange={handleChangeInsert}  label="Tiempo previo de reserva (horas)*" />
            <br />
              <TextField className={styles.inputMaterial} name="maximiunReservationTime" onChange={handleChangeInsert}  label="Horas máximas de reservas al mes por usuario*" />
              <TextField className={styles.inputMaterial} name="rulesOfUse" onChange={handleChangeInsert}  label="Normas de Uso*" multiline rows={5}/>
              <input type="file" className="mt-10"/>
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
        <h3 className="my-5">Editar Espacio</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <TextField className={styles.inputMaterial} name="spaceTypeId" onChange={handleChangeInsert} value={info && info.spaceTypeId} label="Tipo*" />
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
        <br />
        <TextField className={styles.inputMaterial} name="internalCode" onChange={handleChangeInsert} value={info && info.internalCode} label="ID (N° o nombre)*" />
        <br />
        <TextField className={styles.inputMaterial} name="previusReservationTime" onChange={handleChangeInsert} value={info && info.previusReservationTime} label="TTiempo previo de reserva (horas)*" />
        <TextField className={styles.inputMaterial} name="maximiunReservationTime" onChange={handleChangeInsert} value={info && info.maximiunReservationTime} label="Horas máximas de reservas al mes por usuario*" />
        <TextField className={styles.inputMaterial} name="rulesOfUse" onChange={handleChangeInsert} value={info && info.rulesOfUse} label="Normas de Uso*" />
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
              <p>Estás seguro que deseas eliminar  <b>{info&&info.id}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Espacios de uso común" />
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

export default Espacio