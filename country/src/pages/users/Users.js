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
import uuid from "uuid/dist/v4"

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
        title:"Nombres",
        render: data => data.user.name
    },
    {
        title:"Apellidos",
        render: data => data.user.lastName
    },
    {
        title:"Doc. de Identidad",
        render: data => data.user.document
    },  
    {
        title:"Teléfono",
        render: data => data.user.phone
    },
    {
        title:"Mz.",
        render: data => data.property.block
    },
    { 
        title:"Lte.",
        render: data => data.property.lot
    },
    {
        title:"Correo",
        render: data => data.user.email
    }
]

const label = { inputProps: { 'aria-label': 'Switch demo' } };

function Users() {

    const [data, setdata] = useState([]);
    const [dataUser, setdataUser] = useState([])

    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)
    const [infoid, setinfoid] = useState("")
    const [infoPropertyId, setinfoPropertyId] = useState("")
    const [InfoUser, setInfoUser] = useState({})
    const [InfoUserProperty, setInfoUserProperty] = useState([])


    
   
    
    const [info, setInfo] = useState({

      name: "",
      lastName: "",
      document:"",
      email: "",
      phone: 0,
      password:"12345678",
      password_confirmation:"12345678",
      roleId: "3"

    })

    const [infoProperty, setInfoProperty] = useState({

      block: "",
      lot: "",
      area:""
    })

 
    const [error, setError] = useState(false)
   

    const{document, lastName,  name, email, phone } = info;
    const{block, lot,  area } = infoProperty;

  
    const baseUrl="http://localhost:3001/Users";
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value,
       
        })
    }
    const handleChangeInsertProperty = (e) => {

        setInfoProperty({
            ...infoProperty,
            [e.target.name]: e.target.value,
          
        })
    }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
     
        // console.log(user.user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }

      useEffect(() => {
        setInfoUser(info.user)
        setInfoUserProperty(info.property)
      }, []);

    useEffect(() => {
     
    
      const buscarProperty = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/property-user`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data);
          setdata(rtdo.data.data)
  
      }
  
      buscarProperty()
      
      // console.log(data);
    }, []);




    const peticionPost=async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
        await axios.post("https://back2.tinpad.com.pe/public/api/register", info, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          setinfoid(response.data.user.id)
          console.log(response.data.user.id);
          // abrirCerrarModalInsertar();
        
        }).catch(error=>{
          console.log(error);
        });
      }
;
    const peticionPost2 =async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
        await axios.post("https://back2.tinpad.com.pe/public/api/property", infoProperty, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          setinfoPropertyId(response.data.data.id)
          console.log(response.data.data.id);
          // abrirCerrarModalInsertar();

        }).catch(error=>{
          console.log(error);
        })
      }

      const peticionDelete=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
       const url1 = "https://back2.tinpad.com.pe/public/api/property-user"
        await axios.delete(url1+"/"+info.id, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })
       const url2 = "https://back2.tinpad.com.pe/public/api/user"
        await axios.delete(url2+"/"+info.userId, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          // abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })
       const url3 = "https://back2.tinpad.com.pe/public/api/property"
        await axios.delete(url3+"/"+info.propertyId, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          // abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })

        // set1
            //  setTimeout(() => {
            //   window.location.reload();
            // }, 500);
      }

      const peticionPut=async()=>{       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
        await axios.put("https://back2.tinpad.com.pe/public/api/user"+"/"+InfoUser.id,  InfoUser , {headers: headers})
        .then(response=>{

          var dataNueva= InfoUser;
          console.log(dataNueva);
          dataNueva.map(artista=>{
            if(artista.userId===info.userId){
              artista.user.name=info.user.name;
              artista.user.lastName=info.user.lastName;
              artista.user.document=info.user.document;
              artista.user.email=info.user.email;
              artista.user.phone=info.user.phone;
              // artista.email=info.email
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

        if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "" ||email.trim() === "" ||block.trim() === "" ||lot.trim() === "" ||area.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            peticionPost2()
            
            setInfo({
              id: "",
              name: "",
              lastName: "",
              document:"",
              email: "",
              phone:"",
            });
            setInfoProperty({
              id: "",
              block: "",
              lot: "",
              area:""
            });
 
            abrirCerrarModalInsertar()
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
        }
        
        console.log(infoid, infoPropertyId);
    }

    useEffect(() => {


          const peticionPost3 =async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),}   


        await axios.post("https://back2.tinpad.com.pe/public/api/property-user", {
          userId: infoid ,
          propertyId: infoPropertyId
        }, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          // abrirCerrarModalInsertar();

          // set1
            //    setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
        }).catch(error=>{
          console.log(error);
        })
      }


      peticionPost3()
    }, [infoid]);

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
            <h3 className="my-5">Agregar Nuevo Usuario</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} label="Nombres*"  />
            <br />
            <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert}  label="Apellidos*" />          
              <br />
              <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert}  label="Doc. de Identidad*" />
            <br />
              <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert}  label="Email*" />
              <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} label="Teléfono" />
            <br />
              <TextField className={styles.inputMaterial} name="block" onChange={handleChangeInsertProperty}  label="Manzana*" />
              <TextField className={styles.inputMaterial} name="lot" onChange={handleChangeInsertProperty}  label="Lote*" />
              <TextField className={styles.inputMaterial} name="area" onChange={handleChangeInsertProperty}  label="Area (m2)*" />
          
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
              <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} value= {InfoUser&&InfoUser.name} label="Nombre" />
              <br />
              <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert} value= {InfoUser&&InfoUser.lastName} label="Apellido" />          
                <br />
                <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert} value= {InfoUser&&InfoUser.document} label="Doc. de Identidad" />
              <br />
                <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} value= {InfoUser&&InfoUser.phone} label="Teléfono" />
                <TextField className={styles.inputMaterial} name="block" onChange={handleChangeInsert} value= {InfoUserProperty&&InfoUserProperty.block} label="Mz." />
                <TextField className={styles.inputMaterial} name="lot" onChange={handleChangeInsert} value= {InfoUserProperty&&InfoUserProperty.lot} label="Lte." />
                <TextField className={styles.inputMaterial} name="area" onChange={handleChangeInsert} value= {InfoUserProperty&&InfoUserProperty.area} label="Area." />
                <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} value= {InfoUser&&InfoUser.email} label="Correo" />
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
