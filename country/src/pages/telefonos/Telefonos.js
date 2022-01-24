import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import down from "../../IMG/down.svg"
import {makeStyles} from '@material-ui/core/styles';
import { userContext } from '../../context/UserContext';

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
        title:"Descripción",
        field: "description"
    },
    {
        title:"Numero",
        field: "phone",       
       
    }]





function Telefonos() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [loading, setLoading] = useState(false);


    const { dataUser, setdataUser } = useContext(userContext);



    
    const [info, setInfo] = useState({
        
      description: "",
      phone:"" ,
      internalCode: "1",
    })

    const [error, setError] = useState(false)





    const{description, phone} = info;

  
    const baseUrl="https://back2.tinpad.com.pe/public/api/useful-information";
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

      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/useful-information`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data[0]);
        
          setdata((rtdo.data.data).filter(artista=>( artista.phone !== "1" && artista.phone !== null)));

          setdataUser(JSON.parse(localStorage.getItem('user')))
      }
      useEffect(() => {
      

        buscarCotizacion()
  }, []);



  const peticionPost=async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }

  const url1 ="https://back2.tinpad.com.pe/public/api/useful-information"
      await axios.post(url1, info, {headers})
      .then(response=>{
        // setdata(data.concat(response.data));
        console.log(response.data.data.id);
        abrirCerrarModalInsertar();
      }).catch(error=>{
        console.log(error);
      })
      buscarCotizacion()
    }

    const peticionDelete=async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
      await axios.delete(baseUrl+"/"+info.id, {headers}, info) 
      .then(response=>{
        // setdata(data.filter(artista=>artista.id!==info.id));
        abrirCerrarModalEliminar();
      }).catch(error=>{ 
        console.log(error);
      })
     buscarCotizacion()
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
    }


      const peticionPut=async()=>{       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
      const info2 = {
            
        phone: info.phone,
      
        description: info.description 
        
    
    }
    
        await axios.put(baseUrl+"/"+info.id,  info2 , {headers: headers})
        .then(response=>{
    
          abrirCerrarModalEditar();
         
        }).catch(error=>{
          console.log(error);
        })
    
        buscarCotizacion()
      }


      
      const onSubmitInsertar = (e) => {
        e.preventDefault();

if (description.trim() === ""||phone.trim() === "" ) {

setError(true);
return
}else {
setError(false);

peticionPost()
setInfo({
  description: "",
  phone:"" 
});

abrirCerrarModalInsertar();
}
setLoading(true)
setTimeout(() => {
setLoading(false)
}, 2000);

}
const onSubmitEditar = (e) => {
  e.preventDefault();
        peticionPut()
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
       
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
          <h3 className="my-5">Agregar Regla</h3>

          {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}

          <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*" multiline rows={3} />



          <br />
          {/* <TextField className={styles.inputMaterial} name="availableDays" onChange={handleChangeInsert} label="Días disponibles*" /> */}
          <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} label="Teléfono*" type="number" />

          <br /><br />

          <div align="right">
            <Button color="primary" type="submit" >Insertar</Button>
            <Button onClick={abrirCerrarModalInsertar}> Cancelar</Button>
          </div>
        </div>
      </form>
    )

  

      const bodyEditar = (
        <form action="" onSubmit={onSubmitEditar}>
          <div className={styles.modal}>
            <h3 className="my-5">Editar Regla</h3>
            {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

            <br />
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
            <br />
            <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} value={info && info.phone} label="Rango de horario*" />
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

    

    return (
        <div>
            <div>
                <TitlePage titulo="Información util" />
                <div className="flex justify-end ">
                    <button className="btn" onClick={()=>abrirCerrarModalInsertar()}>
                        Agregar
                    </button>
                   
                </div>
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

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

export default Telefonos