


// falta loi de mail en editar

import "../users/Users.css"
import "react-datepicker/dist/react-datepicker.css";

import {Button, Modal, TextField} from '@material-ui/core';
import {Checkbox, MenuItem, Select} from '@material-ui/core'
import {
  Link,
  NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DatePicker from "react-datepicker";
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
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






function Historial() {
  const [data, setdata] = useState([]);
  const [showModalInsertar, setShowModalInsertar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [dates, setDates] = useState([]);
  const [filter, setFilter]=useState(true)
  const [year,setYear]=useState('all')
  const [filteredData,setFilteredData]=useState([])
  const [startDate, setStartDate] = useState(new Date());
  const { dataUser, setdataUser } = useContext(userContext);
    const [info, setInfo] = useState({

      name: "",
      lastName: "",
      document:"",
      email:"",
      phone:""
    })
    useEffect(() => {
      setFilteredData(data.filter(dt=>dt.date.slice(0, 7) === fechaActual1))
      console.log(fechaActual1);
    }, [data])

useEffect(() => {

console.log("date");
 setYear(moment(startDate).format("YYYY-MM"))
}, [startDate])

useEffect(()=>{
  setFilteredData(data.filter(dt=>dt.date.slice(0, 7) === year))
  console.log(year);

    },[year])

 


    const customerTableHead = [

      {
          title:"Propietario",
          
          render: data => data.property.users[0].name +  " " + data.property.users[0].lastName },
          
      
      {
          title:"Fecha",
          // field: "date",
          render: data => (data.date).slice(0,7)
      },
      
      {
          title:"Consumo kw",
          field: "consume"
      },
      {
          title:"Costo por kw",
          field: "unitCost"
      },
      {
          title:"Cobranza",
          field: "transactionCost"
      },
      {
          title:"Total",
          render: data => parseInt(data.consume)  * parseInt(data.unitCost) + parseInt(data.transactionCost) 
      }
      ]
   

    const{document, lastName,  name, email, phone } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/light-expenditure";
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
        
      const url = `https://back2.tinpad.com.pe/public/api/light-expenditure`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }


      const rtdo = await axios.get(url, {headers})

      console.log(rtdo.data.data);
      setdata(rtdo.data.data)
      
      setdataUser(JSON.parse(localStorage.getItem('user')))
  }
  let fechas = []

  useEffect(() => {
    for (let i = 0; i < data.length; i++) {
      console.log(data[i].date);      
      fechas = [...fechas, data[i].date]
      // setDates([...dates, data[i].date])
    }
    setDates(fechas)
   console.log(fechas);
  }, [data])

  // console.log(dates);
// }
useEffect(() => {
 


  buscarCotizacion()
  
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
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
          await axios.post("https://back2.tinpad.com.pe/public/api/light-expenditure", info, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            abrirCerrarModalInsertar();
          }).catch(error=>{
            console.log(error);
          })

          buscarCotizacion()
      
        }

        const fechaActual = new Date
        const fechaActual1 = moment(fechaActual).format("YYYY-MM")
        const fechaActual2 = moment(fechaActual).format("YYYY-MM-DD")

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
          await axios.put("https://back2.tinpad.com.pe/public/api/light-expenditure"+"/"+info.id,  info , {headers: headers})
          .then(response=>{

            abrirCerrarModalEditar();
           
          }).catch(error=>{
            console.log(error);
          })
         buscarCotizacion()
        }
      

 

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "" ||email.trim() === ""||phone.trim() === "") {
        
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
              <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert}  label="Telefono*" />
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
              <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} value= {info&&info.email} label="Doc. de Identidad" />
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
          <p>Est??s seguro que deseas eliminar  <b>{info&&info.name}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>S??</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )


      let fechasss= new Date().getFullYear();

    return (
        <div>
            <div>
                <TitlePage titulo="Historial de cobros de luz" />
                {/* { dataUser.id === 92 ?       */}
                {/* ( */}
                  <div className="flex justify-end">
            <button className='btn' >
              <Link to="/HistorialAgua" style={{ textDecoration: 'none' }}>
                <NavLink className="logoContainter1" exact to="/HistorialAgua" activeClassName="linkactivo">
                  {/* <img src={tramites} alt="" className='logo1' /> */}
                  <h1 className="title1">Historial Agua</h1>
                  {/* <a href=""><img src={down} alt="" className='logo2' /></a> */}
                </NavLink>
              </Link>
            </button> 
             </div>
             {/* )  */}
            {/* //  : null} */}
           
           
      
         
 
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>


           </Box> : null}
           <div className="pickFecha mt-16">
            <div className="flex">
              <h3>Filtrar: </h3> <br />
              <DatePicker
              wrapperClassName="datePicker"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                  />
            </div>
            <br /><br /><br /><br />
          </div>

                 <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={filteredData}
       

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

export default Historial
