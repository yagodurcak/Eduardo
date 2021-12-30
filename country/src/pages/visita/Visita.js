import '../users/Users.css'

import {Button, Modal, TextField,} from '@material-ui/core';
import {
  DatePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
  TimePicker,
} from '@material-ui/pickers';
import React,{useEffect, useState}  from 'react';

import DateMomentUtils from '@date-io/moment';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import {makeStyles} from '@material-ui/core/styles';

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
        title:"Tipo de visita",
        field: "typeVisitId",       
       
    },
    {
        title:"Descripción",
        field: "description"
    },
    {
        title:"Max. personas",
        field: "maximunNumberPerson"
    },
    {
        title:"Horario de entrada (hs)",
        render: data => data.startingTimeRange + " hs"
  
    },
    {
        title:"Horario de salida (hs)",
        render: data => data.endingTimeRange + " hs"
  
    },
    {
        title:"Dias disponibles",
        field: "availableDays"
    },
]



const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Visita() {
  
  const [data, setdata] = useState([]);
  const [showModalInsertar, setShowModalInsertar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)

    const [horaInicio, setHoraInicio] = useState(0);
    const [horaFinal, setHoraFinal] = useState(new Date());
    const [ visitTypes, setVisitTypes] = useState([])


    
    const [info, setInfo] = useState({
      typeVisitId: "",
      description: "",
      startingTimeRange: 0,
      endingTimeRange: 12,
      availableDays: "{\"day1\": \"lunes\",\"day2\": \"jueves\"}",
      maximunNumberPerson: "",
      // monday: "0",
      // tusday: "0",
      // wednesday: "0",
      // thursday: "0",
      // friday: "0",
      // satuday: "0",
      // sunday: "0",
      spaceId: "12"
      
    })

    const diasSemana = [
      {
        label: 'Lunes',
        value: 'Mon',
      },
      {
        label: 'Martes',
        value: 'Tue',
      },
      {
        label: 'Miercoles',
        value: 'Wed',
      },
      {
        label: 'Jueves',
        value: 'Thu',
      },
      {
        label: 'Viernes',
        value: 'Fri',
      },
      {
        label: 'Sabado',
        value: 'Sat',
      },
      {
        label: 'Domingo',
        value: 'dom',
      },
    ];

    
    const [error, setError] = useState(false)
    
    const{typeVisitId, startingTimeRange, description, endingTimeRange, availableDays, maximunNumberPerson} = info;
    
    
    const baseUrl="https://back2.tinpad.com.pe/public/api/rules-visit-provider";
    const handleChangeInsert = (e) => {
      
      setInfo({
        ...info,
        [e.target.name]: e.target.value
      })
    }
    const handleChangeInsertInt = (e) => {
      
      setInfo({
        ...info,
        [e.target.name]: parseInt(e.target.value) 
      })
    }
    
    const seleccionarUser=(user, caso)=>{
      setInfo(user);
      (caso==="Editar")?abrirCerrarModalEditar()
      : 
      abrirCerrarModalEliminar() 
    }
    
    // const traerFrase = async () => {
    //   const api = await fetch(baseUrl);
    //   const frase = await api.json()
    //   console.log(frase[0]);
    //   setdata(frase)
    
      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/rules-visit-provider`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          console.log(rtdo.data.data[0]);
          setdata(rtdo.data.data)
  
      }
    // }
    useEffect(() => {
     
      buscarTipo()
  
      buscarCotizacion()
      
      console.log(data);
    }, []);


    const buscarTipo = async() => {
        
      const url = `https://back2.tinpad.com.pe/public/api/visit-type`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
  
      // console.log(rtdo.data.data);
    
      setVisitTypes(rtdo.data.data)
  
  }

  const peticionPost=async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }
      await axios.post(baseUrl, info, {headers})
      .then(response=>{
        // setdata(data.concat(response.data));
        console.log(response.data.data.id);
        abrirCerrarModalInsertar();
        // setSpaceId(response.data.data.id)
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
              artista.type=info.type;
              artista.hs=info.hs;
              artista.description=info.description;
              artista.max=info.max;
              artista.days=info.days
  
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

        if (description.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
              typeVisitId: "",
              description: "",
              startingTimeRange: 2,
              endingTimeRange: 4,
              availableDays: "",
              maximunNumberPerson: "",
              // monday: "0",
              // tusday: "0",
              // wednesday: "0",
              // thursday: "0",
              // friday: "0",
              // satuday: "0",
              // sunday: "0",
              spaceId: "12"
            });
            abrirCerrarModalInsertar()
            buscarCotizacion()
        }
        
    }
    const onSubmitEditar = () => {

            peticionPut()
           
        }

    // useEffect(() => {
    //     traerFrase()
    // }, [])

    
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


            <select className='select1' onChange={handleChangeInsert} name="typeVisitId">

              <option value="" >Seleccione un tipo de visita</option>
              {visitTypes.map(tipos => (
                <option value={tipos.id} key={tipos.id} >{tipos.name}</option>
              ))}

            </select>



            <br />
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*" multiline rows={3} />



            <br />
            {/* <TextField className={styles.inputMaterial} name="availableDays" onChange={handleChangeInsert} label="Días disponibles*" /> */}
            <TextField className={styles.inputMaterial} name="maximunNumberPerson" onChange={handleChangeInsert} label="Max. Personas*" />

            <br /><br />
            <MuiPickersUtilsProvider utils={DateMomentUtils}>
{/* 
              <TimePicker value={horaInicio} onChange={setHoraInicio} label="Rango horario - Inicio" name="startingTimeRange" />
              <TimePicker value={horaFinal} onChange={setHoraFinal} label="Rango horario - Final"  name="endingTimeRange" /> */}

              <br /><br />
            </MuiPickersUtilsProvider>
            <label htmlFor="">"Rango horario - Inicio"</label>
            <br /><br />
            <input type="time" name="startingTimeRange"  onChange={handleChangeInsertInt}/>
            <br /><br />
            <label htmlFor="">"Rango horario - Final"</label>
            <br /><br />
            <input type="time" name="endingTimeRange"  onChange={handleChangeInsertInt}/>
            <br /><br />
            <select className='select1' onChange={handleChangeInsert} name="typeVisitId" value={typeVisitId}>



              <option value="" >Rango de días - Inicio</option>
              {diasSemana.map(tipos => (
                <option value={tipos.value} key={tipos.value} >{tipos.label}</option>
              ))}



            </select>
            <br /><br />
            <select className='select1' onChange={handleChangeInsert} name="typeVisitId" value={typeVisitId}>



              <option value="" >Rango de días - Final</option>
              {diasSemana.map(tipos => (
                <option value={tipos.value} key={tipos.value} >{tipos.label}</option>
              ))}



            </select>

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

        <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} value={info && info.type} label="Tipo*" />
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
        <br />
        <TextField className={styles.inputMaterial} name="hs" onChange={handleChangeInsert} value={info && info.hs} label="Rango de horario*" />
        <br />
        <TextField className={styles.inputMaterial} name="days" onChange={handleChangeInsert} value={info && info.days} label="Días disponibles*" />
        <TextField className={styles.inputMaterial} name="max" onChange={handleChangeInsert} value={info && info.max} label="Max. Personas*" />
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
              <p>Estás seguro que deseas eliminar  <b>{info&&info.type}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Reglas para visitas y proveedoress" />
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

export default Visita