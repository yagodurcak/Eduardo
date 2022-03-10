


// falta loi de mail en editar

import "../users/Users.css"
import "react-datepicker/dist/react-datepicker.css";

import {Button, Modal, TextField} from '@material-ui/core';
import {Checkbox, MenuItem, Select} from '@material-ui/core'
import {
    Link,
    NavLink,
} from "react-router-dom";
import React,{useContext, useEffect, useState}  from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DatePicker from "react-datepicker";
import {GastosContext} from '../../context/GastosContext';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import { TotalCondoContext } from "../../context/TotalCondContext";
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

// {
//     title:"Item",
//     field: "id"
// },
{
    title:"Concepto",
    field: "concept"
},
{
    title:"N° de Factura",
    field: "invoiceNumber"
},
{
    title:"Fecha",
    field: "date",
    render: data => (data.date).split(" ")[0].split("-").reverse().join("-").slice(3, 10)
},
{
    title:"Monto",
    field: "amount"
},
{
    title:"Archivo",
    field: "document"
}
]



function GastosComunes() {


    const [data, setdata] = useState([]);
    const [totalAmount, setTotalAmount] = useState([]);
    const [total, setTotal] = useState(0);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState();
    const [year,setYear]=useState('all') 
    const [filteredData,setFilteredData]=useState([])
    const [startDate, setStartDate] = useState(new Date());
    const { dataGastos, setdataGastos } = useContext(GastosContext);

const [exito, setExito] = useState(false);

    const { totalCondo, setTotalCondo } = useContext(TotalCondoContext);

    const { dataUser, setdataUser } = useContext(userContext);
    
    const [info, setInfo] = useState({

        amount: "",
       
        concept: "",
       
        date: "",
        document: "",
        id: "",
        invoiceNumber: "",

        transactionCost: ""

    })

    let suma = 0
    const sumarGastosTotales = () => {
        // console.log("calculando total");

   
       console.log("gastos totales");
        
            for (let i = 0; i < filteredData.length; i++) {
    
                suma = suma + parseFloat(filteredData[i].amount) 
                
                // console.log(suma);
               }
              //  console.log(suma);
               setTotal(suma)
               setTotalCondo(suma)

    }


    const{document, amount,  date, invoiceNumber, propertyId, transactionCost, concept } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/condominium-expense";
    const handleChangeInsert = (e) => {
      setInfo({
        ...info,
        [e.target.name]: e.target.value
    })

    }
    
        

    // }

    const buscarCotizacion1 = async() => {
     
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 2000);
  
      const url = `https://back2.tinpad.com.pe/public/api/condominium-expense`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }
  
      const rtdo = await axios.get(url, {headers})
      
     
        
        setdataGastos(rtdo.data.data)
      
      console.log(rtdo.data.data);
      
      setdataUser(JSON.parse(localStorage.getItem('user')))
      
    }


useEffect(() => {

  let mounted = true;


  const buscarCotizacion = async() => {
     
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);

    const url = `https://back2.tinpad.com.pe/public/api/condominium-expense`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    }

    const rtdo = await axios.get(url, {headers})
    
    if (mounted) {
      
      setdataGastos(rtdo.data.data)
    }
    console.log(rtdo.data.data);
    
    
    
  }
  if (dataGastos.length === 0) {

    console.log(dataGastos.length);
    buscarCotizacion()
    
}else{
    console.log(dataGastos.length);
    return
}



  return ()=>{
    mounted= false
  }


}, []);


const fechaActual = new Date
const fechaActual1 = moment(fechaActual).format("YYYY-MM")
const fechaActual2 = moment(fechaActual).format("YYYY-MM-DD")

useEffect(() => {
  setFilteredData(dataGastos.filter(dt=>dt.date.slice(0, 7) === fechaActual1))
  console.log(fechaActual1);
}, [dataGastos])

useEffect(() => {
  // console.log("ahora");
  sumarGastosTotales()
}, [filteredData]);

useEffect(() => {
 
  console.log("date");
   setYear(moment(startDate).format("YYYY-MM"))
  }, [startDate])

  useEffect(()=>{
    setFilteredData(dataGastos.filter(dt=>dt.date.slice(0, 7) === year))
    console.log(year);
    suma = 0
      },[year])
    

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
      
      
            // f.append("propertyId", null)
            f.append("date", fechaActual2)
            f.append("concept", info.concept)
            f.append("invoiceNumber", info.invoiceNumber)
            f.append("amount", parseInt(info.amount) )
            f.append("transactionCost","1" )
       
       
      
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/condominium-expense"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
      
              setSelectedFilesPost()
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
      
              setSelectedFilesPost()
            })
      
        // console.log(filesImg);
          buscarCotizacion1()
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
        buscarCotizacion1()
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
         buscarCotizacion1()
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
              file: ""

        
            });
            setSelectedFilesPost()

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
            <h3 className="my-5">Agregar Nuevo Gasto</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="concept" onChange={handleChangeInsert} label="Concepto*"  />
            <br />
            <TextField className={styles.inputMaterial} name="invoiceNumber" onChange={handleChangeInsert}  label="N° de Factura*" />          
              <br />
              <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert}  label="Monto" />
            <br />
              {/* <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  label="Costo de Transacción*" /> */}
    
              {/* <label htmlFor="" className='mt-5'>Fecha de publicación</label> */}
         
            
            {/* <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert} label="Fecha de Publicación*"  /> */}

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
            <h3 className="my-5">Registrar gasto nuevo</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="concept" onChange={handleChangeInsert} label="Concepto*" value= {info&&info.concept} />
            <br />
            <TextField className={styles.inputMaterial} name="invoiceNumber" onChange={handleChangeInsert}  label="N° de Factura*"  value= {info&&info.invoiceNumber}/>          
              <br />
              <TextField className={styles.inputMaterial} name="amount" onChange={handleChangeInsert}  value= {info&&info.amount} label="Monto" />
            <br />
              {/* <TextField className={styles.inputMaterial} name="transactionCost" onChange={handleChangeInsert}  value= {info&&info.transactionCost} label="Costo de Transacción*" /> */}
              <br />
            
              <label htmlFor="" className='mt-5'>Fecha de publicación</label>
         
            
            <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert} label="Fecha de Publicación*" value= {info&&info.date} />

            <br />
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

      let fechasss= new Date().getFullYear();

      const peticionPostTotal=async()=>{

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
       
       


    
      
          await axios.post("https://back2.tinpad.com.pe/public/api/invoice", {propertyId:1, stateId:1}, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            abrirCerrarModalInsertar();
          }).catch(error=>{
            console.log(error);
          })

          // buscarCotizacion()
      
        }


      const actualizarState = async() => {

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }

        for (let i = 0; i < dataGastos.length; i++) {
          
        await axios.put("https://back2.tinpad.com.pe/public/api/condominium-expense"+"/"+dataGastos[i].id,  {approved:"1"} , {headers: headers})
        .then(response=>{

          console.log("exitoso");
          setExito(true)
        }).catch(error=>{
          console.log(error);
        }) 
          
          }
          
        }
      
 

    return (
      <div>
        <div >
          <TitlePage titulo="Gastos Comunes" />

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
          {dataUser.roleId === "4" && <div className="flex justify-end">


{ exito ?         null    :
<button className='btn btn-2' onClick={actualizarState} >

      <h1 className="title1">Aprobar</h1>

</button>  } 
</div>
}

          {loading ? <Box sx={{ position: 'absolute', left: 500, top: 500, zIndex: 100 }}>

            <CircularProgress color="success" size={80} />
          </Box> : null}
          <div className="flex justify-between mt-16">
          {dataUser.roleId === "1" &&

 <button className="btn" onClick={() => abrirCerrarModalInsertar()}>
   Agregar gasto
 </button> }
 
<div className="pickFecha">
 <div className="flex">
   <h3>Periodo: </h3> <br />
   <DatePicker
   wrapperClassName="datePicker"
         selected={startDate}
         onChange={(date) => setStartDate(date)}
         dateFormat="MM/yyyy"
         showMonthYearPicker
       />
 </div>
</div>

<div className="text-gray-400">
 <h2>Total de gastos: $ {total}</h2>
 
</div>
</div>

{dataUser.roleId === "1" ?

<div className="mt-10"><Table2
title=""
columns={customerTableHead}
data={filteredData}
actions={[

  {
    icon: () => <i class="material-icons edit">edit</i>,
    tooltip: "Editar",
    onClick: (event, rowData) => seleccionarUser(rowData, "Editar")
  },
  {
    icon: () => <i class="material-icons delete">highlight_off</i>,
    tooltip: "Eliminar",
    // onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")   
    onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")
  }


]}

/></div>
: <div className="mt-10"><Table2
title=""
columns={customerTableHead}
data={filteredData}


/></div>

}
   
          
                    <div className="flex justify-end mt-5 ">
            <button className='btn btn-2 mr-5'>
              <Link to="/Calculos" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1" exact to="/Calculos" activeClassName="linkactivo">
                  {/* <img src={tramites} alt="" className='logo1' /> */}
                  <h1 className="title1">Ver Cálculos</h1>
                  {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                </NavLink>
              </Link>
            </button>
 

          </div>
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

export default GastosComunes
