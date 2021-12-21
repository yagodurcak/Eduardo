import './Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
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
      transform: 'translate(-50%, -50%)'
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
        title:"Id",
        field: "id",       
       
    },
    {
        title:"Nombres",
        field: "names"
    },
    {
        title:"Apellidos",
        field: "lastname"
    },
    {
        title:"Doc. de Identidad",
        field: "dni"
    },
    {
        title:"Teléfono",
        field: "phone"
    },
    {
        title:"Mz.",
        field: "block"
    },
    {
        title:"Lte.",
        field: "lot"
    },
    {
        title:"Correo",
        field: "email"
    }
]

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Users() {

    const [data, setdata] = useState([]);
    const [userInfo, setUserInfo] = useState([])
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)

    
   
    
    const [info, setInfo] = useState({
        id: "",
        email: "",
        lastname: "",
        lte: "",
        block: "",
        names: "",
        area:"",
        phone: ""
    })

    const [error, setError] = useState(false)
   

    const{id,dni,  lastname, lte, mza, phone, names, area, email} = info;
  
    const baseUrl="http://localhost:3001/Users";
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
     
    
      const buscarProperty = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/property`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data[0]);
          setdata(rtdo.data.data)
  
      }
  
      buscarProperty()
      
      // console.log(data);
    }, []);


    useEffect(() => {
     
    
      const buscarUser = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/user`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          console.log(rtdo.data.data);
          setUserInfo(rtdo.data.data)
  
      }
  
      buscarUser()
      
      // console.log(data);
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
              artista.id=info.id;
              artista.lastname=info.lastname;
              artista.dni=info.dni;
              artista.lte=info.lte;
              artista.mza=info.mza;
              artista.email=info.email;
              artista.phone=info.phone;
  
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

        if (dni.trim() === "" || lastname.trim() === "" ||names.trim() === "" ||lte.trim() === "" ||mza.trim() === "" ||email.trim() === "" ||area.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
                dni: "",
                email: "",
                lastname: "",
                lte: "",
                mza: "",
                names: "",
                area: "",
                phone: ""
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
            <h3 className="my-5">Agregar Nuevo Usuario</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="names" onChange={handleChangeInsert} label="Nombres*"  />
            <br />
            <TextField className={styles.inputMaterial} name="lastname" onChange={handleChangeInsert}  label="Apellidos*" />          
              <br />
              <TextField className={styles.inputMaterial} name="dni" onChange={handleChangeInsert}  label="Doc. de Identidad*" />
            <br />
              <TextField className={styles.inputMaterial} name="mza" onChange={handleChangeInsert}  label="Manzana*" />
              <TextField className={styles.inputMaterial} name="lte" onChange={handleChangeInsert}  label="Lote*" />
              <TextField className={styles.inputMaterial} name="area" onChange={handleChangeInsert}  label="Area (m2)*" />
              <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert}  label="Correo*" />
              <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} label="Teléfono" />
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalInsertar}> Cancelar</Button>
            </div>
          </div>
        </form>
      )



      const bodyEditar=(
          <form action="" onSubmit={onSubmitEditar}>
            <div className={styles.modal}>
              <h3 className="my-5">Editar Usuario</h3>
              { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
              <TextField className={styles.inputMaterial} name="names" onChange={handleChangeInsert} value= {info&&info.names} label="Nombre" />
              <br />
              <TextField className={styles.inputMaterial} name="lastname" onChange={handleChangeInsert} value= {info&&info.lastname} label="Apellido" />          
                <br />
                <TextField className={styles.inputMaterial} name="dni" onChange={handleChangeInsert} value= {info&&info.dni} label="Doc. de Identidad" />
              <br />
                <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} value= {info&&info.phone} label="Teléfono" />
                <TextField className={styles.inputMaterial} name="mza" onChange={handleChangeInsert} value= {info&&info.mza} label="Mz." />
                <TextField className={styles.inputMaterial} name="lte" onChange={handleChangeInsert} value= {info&&info.lte} label="Lte." />
                <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} value= {info&&info.email} label="Correo" />
              <br /><br />
              <div align="right">
                <Button color="primary" type="submit" >Editar</Button>
                <Button onClick= {()=>abrirCerrarModalEditar()}> Cancelar</Button>
              </div>
            </div>
          </form>
        )

        

        const bodyEliminar=(
            <div className={styles.modal}>
              <p>Estás seguro que deseas eliminar  <b>{info&&info.names}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Usuarios Propietarios" />
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

export default Users
