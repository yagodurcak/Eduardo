


// falta loi de mail en editar

import "../users/Users.css"

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
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
    title:"Nombres",
    field: "name"
},
{
    title:"Apellidos",
    field: "lastName"
},
{
    title:"Doc. de Identidad",
    field: "document"
}
]



function Seguridad() {

    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [error, setError] = useState(false)
 
    
    const [info, setInfo] = useState({
      id: "",
      name: "",
      lastName: "",
      document:"",
      email: "",
      password:"12345678",
      password_confirmation:"12345678",
      roleId: "2"

    })

   

    const{document, lastName,  name, email } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/user";
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
     
    
        const buscarProperty = async() => {
          
            const url = `https://back2.tinpad.com.pe/public/api/user`;
  
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
            }    
    
            const rtdo = await axios.get(url, {headers})
   
            // console.log(rtdo.data.data[0]);
            setdata((rtdo.data.data).filter(artista=> artista.roleId === "2"));
      
            
            console.log(rtdo.data.data);
        }
    
        buscarProperty()
        
      }, []);
      
  


      const peticionPost=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
          await axios.post("https://back2.tinpad.com.pe/public/api/register", info, {headers})
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
          await axios.put("https://back2.tinpad.com.pe/public/api/user"+"/"+info.id,  info , {headers: headers})
          .then(response=>{
            var dataNueva= data;
            dataNueva.map(artista=>{
              if(artista.id===info.id){
                artista.name=info.name;
                artista.lastName=info.lastName;
                artista.document=info.document;
                // artista.email=info.email
                            }              
            });
            setdata(dataNueva);
            abrirCerrarModalEditar();
           
          }).catch(error=>{
            console.log(error);
          })
        }
      

 

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "" ||email.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
              id: "",
              name: "",
              lastName: "",
              document:"",
              email: ""

        
            });

            // set1
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = (e) => {

      e.preventDefault();
            peticionPut()
            // window.location.reload();
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
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
            <br />
            {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
            {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}


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
            <h3 className="my-5">Registrar usuario nuevo</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} value= {info&&info.name} label="Nombre" />
            <br />
            <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert} value= {info&&info.lastName} label="Apellido" />          
              <br />
              <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert} value= {info&&info.document} label="Doc. de Identidad" />
            <br />
              {/* <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} value= {info&&info.email} label="Doc. de Identidad" /> */}
            <br />
     
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
          <p>Estás seguro que deseas eliminar  <b>{info&&info.name}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Personal de Seguridad" />
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

export default Seguridad
