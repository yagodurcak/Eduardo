import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import {
    Link,
} from "react-router-dom";
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
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
        title:"Ticket N°",
        field: "ticket",       
       
    },
    {
        title:"Fecha",
        field: "date"
    },
    {
        title:"Tipo",
        field: "type"
    },
    {
        title:"Proyecto",
        field: "proyecto"
    },
    {
        title:"Propietario",
        field: "propietario"
    },
    {
        title:"Estado",
        field: "estado"
    },
    {
        title:"Actualiz.",
        field: "update"
    }
]



function Telefonos() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);




    
    const [info, setInfo] = useState({
        
        ticket: "",
        type:"" ,
        proyecto:"" ,
        propietario:"" ,
        estado:"" ,


    })

    const [error, setError] = useState(false)

    const{ticket, type, proyecto, propietario, estado } = info;

  
    const baseUrl="http://localhost:3001/Tramites";
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

    const traerFrase = async () => {
        const api = await fetch(baseUrl);
        const frase = await api.json()
        console.log(frase[0]);
        setdata(frase)
    }

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
              artista.description=info.description;

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

        if (ticket.trim() === "") {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
                description: "",
                number:""
            });

            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = () => {

            peticionPut()
           
        }

    useEffect(() => {
        traerFrase()
    }, [])

    
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
            <h3 className="my-5">Agregar teléfono</h3>

            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }

    
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*"  />
            <br />
            <TextField className={styles.inputMaterial} name="number" onChange={handleChangeInsert} label="Número"  />
            <br />            
            
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
        <h3 className="my-5">Editar teléfono</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
        <br />
        <TextField className={styles.inputMaterial} name="number" onChange={handleChangeInsert} value={info && info.number} label="Número*" />
        <br />

             
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
              <p>Estás seguro que deseas eliminar  <b>{info&&info.description}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

        const PaginaNUeva = () => (
            <Link  to="/Users" style={{ textDecoration: 'none' }}>
            </Link>
        )
    

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Trámites de los propietarios" />
                <div className="flex justify-end ">
            
                   
                </div>

                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
                 actions= {[

                    {
                        icon:() => <Link  to="/Detalle" style={{ textDecoration: 'none' }}>
                         <span class="material-icons find">
                        find_in_page
                        </span>
                        </Link>,
                        tooltip:"Detalles",
                     
                    }, 
                            {
                        icon:() => <span class="material-icons">
                        history
                        </span>,
                        tooltip:"Actualizar",
                        onClick: (event, rowData) => seleccionarUser(rowData, "Editar") 
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

export default Telefonos