


// falta loi de mail en editar

import "../users/Users.css"

import {Button, Modal, TextField} from '@material-ui/core';
import {
    Link,
    NavLink,
} from "react-router-dom";
import React,{useEffect, useState}  from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import { TableCell } from '@mui/material';
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


  
  

  function Prueba() {

      
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState();

   
    
    const [info, setInfo] = useState({
        
        // propertyId: "",
        
        consume: "",
        
        // unitCost: "",
        transactionCost: "0"
        
    })
    
    const customerTableHead = [
    
        {
            title:"Propietario",
            render: data => data.user.name + " " +   data.user.lastName   
        },
        {
            title:"Doc de Identidad",
            render: data => data.user.document   
        },
        {
            title:"Mz.",
            render: data => data.property.block     },
        {
            title:"Lte.",
            render: data => data.property.lot  
        },
        {
            title:"Consumo (KW)",
            render: data => data.consume 
        },
    
        
        {
            title:"Subtotal(S/)",
            render: data => data.consume + 20
            
        }
        ,
        {
            title:"Cobranza(S/)",
            render: data => data.transactionCost         }
        ,
        {
            title:"Total",
            render: data => data.consume + 20 + data.transactionCost  
        }
    ]





   

    const{document, amount,  date, invoiceNumber, propertyId, transactionCost, concept } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/property-user";
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

      const url = `https://back2.tinpad.com.pe/public/api/property-user`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }

      const rtdo = await axios.get(url, {headers})
      const rtdo2 = rtdo.data.data
     const rtdo3=  rtdo2.map(obj=> ({ ...obj, consume: 0, transactionCost: 0 }))
      
      console.log(rtdo3);
      setdata(rtdo3)
     

  }

  const AgregarDato = () => {
    data.map(obj=> ({ ...obj, consume: 'false' }))
  }
// }
useEffect(() => {
   buscarCotizacion()
  
   AgregarDato()

  
  console.log(data);
}, []);

    

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }


      const peticionPost=async()=>{
        console.log("post2");
      
        const f = new FormData()   
      
      
        
        console.log(info);
        // console.log(selectedFilesPost.length > 0);
          
                if (selectedFilesPost) {
                  
                  f.append("file", selectedFilesPost)
                }
      
      
            f.append("propertyId", 1)
            f.append("date", info.date)
            f.append("concept", info.concept)
            f.append("invoiceNumber", info.invoiceNumber)
            f.append("amount", parseInt(info.amount) )
            f.append("transactionCost",parseInt(info.transactionCost) )
       
       
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/condominium-expense"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
      
              setSelectedFilesPost([])
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
      
              setSelectedFilesPost([])
            })
      
        // console.log(filesImg);
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
           
        }).catch(error=>{ 
            console.log(error);
        })
        buscarCotizacion()
        abrirCerrarModalEliminar();
        }

        const peticionPut=async()=>{       

          const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
          await axios.put("https://back2.tinpad.com.pe/public/api/condominium-expense"+"/"+info.id,  info , {headers: headers})
          .then(response=>{

            abrirCerrarModalEditar();
           
          }).catch(error=>{
            console.log(error);
          })
         buscarCotizacion()
        }
      

        const removeSelectedImage = () => {
            setSelectedImage();
        };
        const imageChange = (e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedImage(e.target.files[0]);
              console.log(e.target.files[0]);
              setSelectedFilesPost(e.target.files[0])
            }
        };

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (concept.trim() === ""  ) {
        
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
              email: "",

        
            });

            // set1
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
            abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = (e) => {

      e.preventDefault();
            peticionPost()
            // window.location.reload();
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
            abrirCerrarModalEditar()
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
            <h3 className="my-5">Agregar detalles de Consumo y gestión</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Kw consumidos*" type="number" />
            <br />
            <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  label="Costo de transacción*" type="number" />          
              <br />
              
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
            <h3 className="my-5">Registrar consumo y gestión</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Kw consumidos*" type="number" />
            <br />
            <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  label="Costo de transacción*" type="number" />          
              <br />
            <br />
            <br />
     
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button> Cancelar</Button>
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
                <TitlePage titulo="Gastos Comunes" />
                <div className="flex justify-between">
                            <button className='btn btn-2' >
                                <Link to="/Calculos" style={{ textDecoration: 'none' }}>
                                        <NavLink className="logoContainter1" exact to="/Calculos" activeClassName="linkactivo">
                                            {/* <img src={tramites} alt="" className='logo1' /> */}
                                            <h1 className="title1">Calculos</h1>
                                            {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                        </NavLink>
                                </Link>
                            </button>
                                            <button className="btn"  onClick={()=>abrirCerrarModalInsertar()}>
                            Agregar gasto
                                                </button>
                        </div>
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:100}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

                <div className="flex justify-end mt-5 text-gray-400">
                    <h2>Total de gastos: $ {total}</h2>
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

export default Prueba