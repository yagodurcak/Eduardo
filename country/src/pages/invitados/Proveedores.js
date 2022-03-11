


// falta loi de mail en editar

import "../users/Users.css"

import {Button, Modal, TextField} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalDetails from '../../components/pageComponents/ModalDetails';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import { ProveedoresContext } from '../../context/ProveedoresContext';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import {makeStyles} from '@material-ui/core/styles';
import moment from "moment";
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
    title:"Tipo",
    field: "type"
    // render: data => (data.date).split(" ")[0].split("-").reverse().join("-")

},
{
    title:"Nombre",
    field: "name"
},

{
    title:"Documento",
    field: "document"
}
,
{
    title:"Placa",
    field: "licensePlate"
}
,
{
    title:"Cantidad",
    field: "quantity"},
    
    
    {
        title:"Manzana",    
        render: data => data.user.properties[0].block
    
      },
    {
        title:"Lote",    
        render: data => data.user.properties[0].lot
    
      }
]



function Proveedores() {

    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [showModalDetails, setShowModalDetails] = useState(false);
    const { dataProveedores, setdataProveedores } = useContext(ProveedoresContext);

    const { dataUser, setdataUser } = useContext(userContext);
    const [info, setInfo] = useState({

      name: "",
      lastName: "",
      document:"",
      licensePlate:"",
      quantity: "10"
      
    })

   

    const{document, lastName,  name, licensePlate } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/guest-provider";
    const handleChangeInsert = (e) => {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
    })

    }
    
        
    const buscarCotizacion = async() => {

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
        
      const url = `https://back2.tinpad.com.pe/public/api/guest-provider`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }


      const rtdo = await axios.get(url, {headers})

      console.log(rtdo.data.data);
      setdataProveedores(rtdo.data.data)
      setdataUser(JSON.parse(localStorage.getItem('user')))
  }
// }
useEffect(() => {
        
  if (dataProveedores.length === 0) {

      console.log(dataProveedores.length);
      buscarCotizacion()
      
  }else{
      console.log(dataProveedores.length);
      return
  }
}, []);


    

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }
    const seleccionarUser2=(user, caso)=>{
        setInfo(user);
        console.log(user);
  
        abrirCerrarModalDetails() 
      }


      const peticionPost=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
          await axios.post("https://back2.tinpad.com.pe/public/api/guest-provider", info, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
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
        }

        const peticionPut=async()=>{       

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
          await axios.put("https://back2.tinpad.com.pe/public/api/guest-provider"+"/"+info.id,  info , {headers: headers})
          .then(response=>{

            abrirCerrarModalEditar();
           
          }).catch(error=>{
            console.log(error);
          })
         buscarCotizacion()
        }
      

 

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "") {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
   
              name: "",
              lastName: "",
              document:"",
              licensePlate:"",
        
            });

            // set1
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
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
      const abrirCerrarModalDetails=()=>{
        setShowModalDetails(!showModalDetails);
        console.log(info);
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
            <h3 className="my-5">Agregar Nueva Visita</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} label="Nombres*"  />
            <br />
            <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert}  label="Apellidos*" />          
              <br />
              <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert}  label="Doc. de Identidad*" />
            <br />
              <TextField className={styles.inputMaterial} name="licensePlate" onChange={handleChangeInsert}  label="Patente*" />
              {/* <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert}  label="Telefono*" /> */}
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
      const bodyDetails =(
        <div className={styles.modal}>
            <div className="estilosmodalDetails">
                <h1>Detalle</h1>
                <div className='linea'></div>
                <h3 >Nombre proveedor: <span className="mt-5 detailsInfo">{info&&info.name}</span></h3>
                <h3 >Doc de Identidad: <span className="mt-5 detailsInfo">{info&&info.document}</span></h3>
                <h3 >Placa: <span className="mt-5 detailsInfo">{info&&info.licensePlate}</span></h3>
                <h3 >Cantidad: <span className="mt-5 detailsInfo">{info&&info.quantity}</span></h3>
                <h3 >Lote: <span className="mt-5 detailsInfo">{info.Propiedad&&info.Propiedad.lot}</span></h3>
                <h3 >Manzana: <span className="mt-5 detailsInfo">{info.Propiedad&&info.Propiedad.lot}</span></h3>
                {/* <h3 >Asunto: <span className="mt-5 detailsInfo">{info.proyect&&info.proyect.description}</span></h3> */}
                <h3 >Tipo: <span className="mt-5 detailsInfo">{info&&info.type}</span></h3>
                <h3 >Ingreso: <span className="mt-5 detailsInfo">{moment(info&&info.startingdate).format("DD-MM-YYYY")}</span></h3>
                { info.type === "permanente" &&
                
                <h3 >Egreso: <span className="mt-5 detailsInfo">{moment(info&&info.endingdate).format("DD-MM-YYYY")}</span></h3>
                }

                <button className="btn mt-5" onClick={()=>abrirCerrarModalDetails()}>Volver</button>

 


            </div>       
          </div>       
        )

      const bodyEditar=(
        <form action="" onSubmit={onSubmitEditar}>
          <div className={styles.modal}>
            <h3 className="my-5">Registrar usuario nuevo</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} value= {info&&info.name} label="Nombre" />
            <br />
            <TextField className={styles.inputMaterial} name="licensePlate" onChange={handleChangeInsert} value= {info&&info.licensePlate} label="Placa" />          
              <br />
              <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert} value= {info&&info.document} label="Doc. de Identidad" />
            <br />
              <TextField className={styles.inputMaterial} name="licensePlate" onChange={handleChangeInsert} value= {info&&info.licensePlate} label="Patente" />
            <br />
              <TextField className={styles.inputMaterial} name="quantity" onChange={handleChangeInsert} value= {info&&info.quantity} label="Cantidad" />
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
            <div>
                <TitlePage titulo="Invitados" />
                {/* { dataUser.roleId === "1" ?
                <div className="flex justify-end ">
                    <button className="btn" onClick={()=>abrirCerrarModalInsertar()}>
                        Agregar
                    </button>
                   
                </div>
                :null} */}
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

           {dataUser.roleId === "1" ? 


                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={dataProveedores}
                 actions= {[  
                    {
                        icon:() => <span class="material-icons find">
                        find_in_page
                        </span>,
                        tooltip:"Detalles",
                        onClick: (event, rowData) => seleccionarUser2(rowData, "Details") 
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
                 :  <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
                 actions= {[  
                    {
                        icon:() => <span class="material-icons find">
                        find_in_page
                        </span>,
                        tooltip:"Detalles",
                        onClick: (event, rowData) => seleccionarUser2(rowData, "Details") 
                    }
          
                ] }
              

                 /></div>}
            </div>
            <ModalDetails
            showModalDetails={showModalDetails}
            functionShow= {abrirCerrarModalDetails}
            // handleChangeInsert={handleChangeInsert}
            // onSubmitEditar={onSubmitEditar}
            info={info}
            bodyDetails={bodyDetails}
            />
            <ModalInsertar
            showmodalInsertar={showModalInsertar}
            functionShow= {abrirCerrarModalInsertar}
            handleChangeInsert={handleChangeInsert}
            onSubmitInsertar={onSubmitInsertar}
            error={error}
            bodyInsertar={bodyInsertar}
           
            
            />
              { dataUser.roleId === "1" ?
            <ModalEditar
            showModalEditar={showModalEditar}
            functionShow= {abrirCerrarModalEditar}
            handleChangeInsert={handleChangeInsert}
            onSubmitEditar={onSubmitEditar}
            info={info}
            bodyEditar={bodyEditar}
            />
            :null}
            { dataUser.roleId === "1" ?
            <ModalEliminar
            showModalEliminar={showModalEliminar}
            abrirCerrarModalEliminar= {abrirCerrarModalEliminar}
            onSubmitEditar={onSubmitEditar}
            info={info}
            peticionDelete={peticionDelete}
            bodyEliminar={bodyEliminar}
            />
            :null}
        </div>
    )
}

export default Proveedores