


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
      const [totalArea, setTotalArea] = useState(0);
      const [showModalInsertar, setShowModalInsertar] = useState(false);
      const [showModalEditar, setShowModalEditar] = useState(false);
      const [showModalEliminar, setShowModalEliminar] = useState(false);
      const [error, setError] = useState(false)
      const [loading, setLoading] = useState(false);
      const [selectedImage, setSelectedImage] = useState();
      const [selectedFilesPost, setSelectedFilesPost] = useState();
      
      const customerTableHead = [
        
        {
            title:"Propietario",
            render: data => data.users.name + " " +data.users.lastName
        },
        {
            title:"Doc de Identidad",
            render: data => data.users.document   
        },
        {
            title:"Mz.",
            render: data => data.block   
        },
        {
            title:"Lte.",
            render: data => data.lot  
        },  
    
        {
            title:"Pariticipacion (%)",
            // render: data => parseFloat((parseInt(data.property.area)/ totalArea  ) * 100).toFixed(2)
        },
        {
            title:"Subtotal(S/)",
            // render: data => parseFloat((((data.property.area/ totalArea  ) * 100)*total)/100).toFixed(2)
        }
        ,
        {
            title:"Cobranza(S/)",
            render: data => "10.00"
        }
        ,
        {
            title:"Total",
            // render: data => ((parseFloat((parseInt(data.property.area)/ totalArea  ) * 100).toFixed(2))*total)/100 + 10
        }

    ]
      const [info, setInfo] = useState({
          
          amount: "",
       
        concept: "",
       
        date: "",
        document: "",
        id: "",
        invoiceNumber: "",
      
        propertyId: "",
        transactionCost: ""

    })




   

    const{document, amount,  date, invoiceNumber, propertyId, transactionCost, concept } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/property";
    const handleChangeInsert = (e) => {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
    })

    }
    
        
    const sumarGastosTotales = () => {
        let suma = 0
        for (let i = 0; i < data2.length; i++) {
             suma = suma + parseFloat(data2[i].amount) 
             
            }
            console.log(suma);
            setTotal(suma)
    }
    // const sumarAreaTotales = () => {
    //     let area = 0
    //     for (let i = 0; i < data.length; i++) {
    //          area = area + parseFloat(data[i].property.area) 
             
    //         }
    //         console.log(area);
    //         setTotalArea(area)
    // }
    
    // useEffect(() => {
    //     console.log("ahora");
    //     sumarGastosTotales()
    //   }, [data2.length >= 1]);
    // useEffect(() => {
    //     console.log("ahora2");
    //     sumarAreaTotales()
    //   }, [data.length >= 1]);

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
      
      console.log(rtdo.data.data);
      setdata(rtdo.data.data)
    
      

  }
  const buscarCotizacion2 = async() => {



    const url = `https://back2.tinpad.com.pe/public/api/condominium-expense`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    }

    const rtdo = await axios.get(url, {headers})
    
    console.log(rtdo.data.data);
    setdata2(rtdo.data.data)


}
// }
// useEffect(() => {
//     console.log("ahora");
//     sumarAreaTotales()
//   }, [data.length >= 1]);
  
useEffect(() => {
  buscarCotizacion()
  buscarCotizacion2()
  sumarGastosTotales()

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
       
            
            
            
            
      
      
      
          // console.log(f);
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/property-user"
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
            <TextField className={styles.inputMaterial} name="concept" onChange={handleChangeInsert} label="Concepto*"  />
            <br />
            <TextField className={styles.inputMaterial} name="invoiceNumber" onChange={handleChangeInsert}  label="N° de Factura*" />          
              <br />
              <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert}  label="Monto" />
            <br />
              <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  label="Costo de Transacción*" />
              <br />
            <br />
              <label htmlFor="" className='mt-5'>Fecha de publicación</label>
         
            
            <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert} label="Fecha de Publicación*"  />

            <br />
            {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
            {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}

            <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='file'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">attach_file</i>
          </label>
        </div>
                </div> <br/>
     

            {selectedImage && (
          <div className='eliminarImg'>
      <h4 ><span className="detailsInfo">{info&&info.attached}</span></h4>
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )}
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
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="concept" onChange={handleChangeInsert} label="Concepto*" value= {info&&info.concept} />
            <br />
            <TextField className={styles.inputMaterial} name="invoiceNumber" onChange={handleChangeInsert}  label="N° de Factura*"  value= {info&&info.invoiceNumber}/>          
              <br />
              <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert}  value= {info&&info.amount} label="Monto" />
            <br />
              <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  value= {info&&info.transactionCost} label="Costo de Transacción*" />
              <br />
            
              <label htmlFor="" className='mt-5'>Fecha de publicación</label>
         
            
            <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert} label="Fecha de Publicación*" value= {info&&info.date} />

            <br />
            <br />
     
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Editar</Button>
              <Button onClick= {()=>sumarGastosTotales()}> Cancelar</Button>
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
                <TitlePage titulo="Calculo Gastos" />
                <div className="flex justify-between">
                            <button className='btn' >
                                <Link to="/GastosComunes" style={{ textDecoration: 'none' }}>
                                        <NavLink className="logoContainter1" exact to="/GastosComunes" activeClassName="linkactivo">
                                            {/* <img src={tramites} alt="" className='logo1' /> */}
                                            <h1 className="title1">Gastos Comunes</h1>
                                            {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                                        </NavLink>
                                </Link>
                            </button>
               
                        </div>
                { loading ?  <Box sx={{ position: 'absolute' , left: 600, top:500, zIndex:100}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

                <div className="flex justify-end mt-5 text-gray-400">
                    <h2>Subtotal de gastos: $ {total}</h2>
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
