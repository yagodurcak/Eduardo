


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


  
  

  function Energia() {

      
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [data3, setdata3] = useState([]);

    const [fecha, setFecha] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [unitCost, setunitCost] = useState("");
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
    const [info2, setInfo2] = useState({
        
        // propertyId: "",
        
        consume: "",
        date:"",
        amount:""
        
      
        
    })
    
    const customerTableHead = [
    
        {
            title:"Propietario",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            field: 'name',
            render: data => {for (let i = 0; i < data.users.length; i++) {
              return data.users[i].name + " " + data.users[i].lastName
              
            }   }},

        // {
        //     title:"Doc de Identidad",
 

        //     render: data => {for (let i = 0; i < data.users.length; i++) {
        //       return data.users[i].document
              
        //     }   }
        //     },
        {
            title:"Mz.",
                            cellStyle: {
        minWidth: 10,
        maxWidth: 10
      },
            render: data => data.block     },
        {
            title:"Lte.",
                            cellStyle: {
        minWidth: 10,
        maxWidth: 10
      },
            render: data => data.lot  
        },
        {
            title:"Fecha",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            field: 'date',
       
            render: data => {for (let i = data.light_expenditures.length; i = data.light_expenditures.length; i++) {
              return (data.light_expenditures[i-1].date).split(" ")[0].split("-").reverse().join("-").slice(3, 10)  
              
            }   } 
        },
        {
            title:"Consumo (KW)",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            render: data => {for (let i = data.light_expenditures.length; i = data.light_expenditures.length; i++) {
              return parseInt(data.light_expenditures[i-1].consume) 
              
            }   } 
        }
        ,  {
          title:"SubTotal",
                          cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
          render: data => {for (let i = data.light_expenditures.length; i = data.light_expenditures.length; i++) {
            return parseFloat(data.light_expenditures[i-1].consume * unitCost).toFixed(2)
            
          }   } 
      },
        {
            title:"Cobranza(S/)",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            render: data => data3.amount},
        {
            title:"Total",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            render: data => {for (let i = data.light_expenditures.length; i = data.light_expenditures.length; i++) {
              return parseInt(data.light_expenditures[i-1].consume * unitCost)  + parseInt(data3.amount) 
              
            }   } 
        }
    ]




   

    const{document,    invoiceNumber, propertyId, transactionCost, concept } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/property";
    const handleChangeInsert = (e) => {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
    })

    }
    const handleChangeInsert2 = (e) => {
      setInfo2({
        ...info2,
        [e.target.name]: e.target.value
    })

    }

    const{consume, amount,  date } = info2;
    
        
    const buscarCotizacion = async() => {

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);

      const url = `https://back2.tinpad.com.pe/public/api/property`;

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
  // let fecha = "";
  let monto = "";
  let consumo = "";
  let costoUnidad = "";

    const buscarTotalLight = async() => {

      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);

      const url = `https://back2.tinpad.com.pe/public/api/total-light-expenditure`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }

      const rtdo = await axios.get(url, {headers})
      const rtdo2 = rtdo.data.data
  
     
      console.log(fecha);
      setdata2(rtdo2)    

  }

    const buscarCobranza = async() => {


      const url = `https://back2.tinpad.com.pe/public/api/collection-expense`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }

      const rtdo = await axios.get(url, {headers})
      const rtdo2 = rtdo.data.data
  
     
      console.log(rtdo2[0]);
      setdata3(rtdo2[0])    

  }

  const SaveData = () => {
    if (data2.length > 0) {
    
      setFecha((data2[data2.length - 1].date).split(" ")[0].split("-").reverse().join("-"))
      setTotalAmount(data2[data2.length - 1].amount)
      setunitCost(data2[data2.length - 1].consume)
    }
  }


useEffect(() => {
  SaveData()
}, )


// }
useEffect(() => {
   buscarCotizacion()
   buscarTotalLight()
   buscarCobranza()

}, []);

    

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }

      const peticionPost2=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
          await axios.post("https://back2.tinpad.com.pe/public/api/total-light-expenditure", info2, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            abrirCerrarModalInsertar();
          }).catch(error=>{
            console.log(error);
          })
          buscarCotizacion()
        }


      const peticionPost=async()=>{
        console.log("post2");
      
        const f = new FormData()   
      
      
        
        console.log(info);
        // console.log(selectedFilesPost.length > 0);
          
                // if (selectedFilesPost) {
                  
                //   f.append("file", selectedFilesPost)
                // }
      
      
            f.append("propertyId", info.id)
            f.append("date", info.date)
            f.append("consume", info.consume)
            f.append("unitCost", unitCost)
            f.append("transactionCost", data3.amount )
            f.append("unit","kw" )
       
       
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/light-expenditure"
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
      


    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (consume.trim() === ""|| date.trim() === ""||amount.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost2()
            setInfo2({
              consume: "",
              date:"",
              amount:""        
            });

            // set1
            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
            abrirCerrarModalInsertar()
            buscarCotizacion()
            buscarTotalLight()
            SaveData()
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
            <label htmlFor="">Monto total*</label> <br />
            <input type="number" name="amount" onChange={handleChangeInsert2}  label="Monto total*" type="number" step="any"/>
            {/* <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert2}  label="Monto total*" type="number" step="0.1"/>           */}
              <br />
              <br />
              <label htmlFor="">Costo Unitario kw*</label>
            <input className={styles.inputMaterial} name="consume" onChange={handleChangeInsert2} label="Costo Unitario kw*" type="number" step="any"/>
            {/* <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert2}  label="Monto total*" type="number" />           */}
        
            {/* <TextField className={styles.inputMaterial} name="consume" onChange={handleChangeInsert2} label="Costo Unitario kw*" type="number" /> */}
            <br />
              <br />
              
              <label htmlFor="">Fecha de factura*</label>
              <br />
              <br />
              <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert2} label="Fecha de factura*"  />

              
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
            {/* <TextField className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Kw consumidos*" type="number" /> */}
            <label htmlFor="">Kw consumidos*</label>
            <br />
            <br />
            <input className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Kw consumidos*" type="number" step="any"/>
            <br />
                
              
              <br />
            <label htmlFor="" className='mt-5'>Fecha de Consumo*</label>
            <br />
            <br />
            
              <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert} label="Fecha de Publicación*"  />

            <br />
            <br />
     
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalEditar}> Cancelar</Button>
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
                <TitlePage titulo="Gasto Energía" />
                <div className="flex justify-center">
            <button className='btn-3' >
              <Link to="/GastosComunes" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1" exact to="/GastosComunes" activeClassName="linkactivo">
                  {/* <img src={tramites} alt="" className='logo1' /> */}
                  <h1 className="title1">Condominio</h1>
                  {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                </NavLink>
              </Link>
            </button>
            <button className='btn-3' >
              <Link to="/Energia" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1" exact to="/Energia" activeClassName="linkactivo">
                  {/* <img src={tramites} alt="" className='logo1' /> */}
                  <h1 className="title1">Energia</h1>
                  {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                </NavLink>
              </Link>
            </button>
            <button className='btn-3' >
              <Link to="/Prueba" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1" exact to="/Prueba" activeClassName="linkactivo">
                  {/* <img src={tramites} alt="" className='logo1' /> */}
                  <h1 className="title1">Agua</h1>
                  {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                </NavLink>
              </Link>
            </button>
      
          </div>
                <div className="flex justify-between">
  
                                            <button className="btn"  onClick={()=>abrirCerrarModalInsertar()}>
                            Agregar gasto
                                                </button>
                                                <div>
                                                <div className="flex justify-end mt-1 text-gray-400">
                {/* render: data => (data.publicationDate).split(" ")[0].split("-").reverse().join("-") */}
                {data2.length > 0 ?  <h3>Fecha: {fecha} </h3> 
                :
                 null
                 }
                 </div>
               

                 <div className="flex justify-end mt-1 text-gray-400">
                {data2.length > 0 ?    <div className="flex justify-end mt-1 text-gray-400">

<h3>Total de gastos: $ {totalAmount}</h3>

</div> 
                :
                 null
                 }  
                 </div> 

<div className="flex justify-end mt-1 text-gray-400">
                {data2.length > 0 ?    <div className="flex justify-end mt-1 text-gray-400">

<h3>Costo unitario (kw): {unitCost}</h3>

</div> 
                :
                 null
                 }
                    
                    </div> 
                                                </div>
                        </div>
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:100}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

               

   

                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
                 
                 actions= {[                    
                
                            {
                        icon:() => <i class="material-icons edit">add</i>,
                        tooltip:"Agregar",
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

export default Energia
