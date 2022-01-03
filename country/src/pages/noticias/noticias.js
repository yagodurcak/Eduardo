import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

import ModalAdd from '../../components/pageComponents/ModalAdd';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
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
        title:"Fecha",
    
        render: data => (data.publicationDate).split(" ")[0].split("-").reverse().join("-")
    },
    {
        title:"Tipo",
        // render: data => data.type_release.name       
       
    },
    {
        title:"Titulo",
        field: "title"
    }]


const label = { inputProps: { 'aria-label': 'Switch demo' } };


function Noticias() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)
    const [spaceTypes, setSpaceTypes] = useState([])
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState([]);
    // const [showModalAdd, setShowModalAdd] = useState(false);

    const [info, setInfo] = useState({
      publicationDate: "",
      typeReleaseId: "",
        title:"" ,  
        description: "",
        image:null
     

    })

    const [error, setError] = useState(false)





    const{publicationDate, typeReleaseId, title, description, file, image} = info;

  
    const baseUrl="http://localhost:3001/Noticias";
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    const removeSelectedImage = () => {
      setSelectedImage();
  };
       
    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }

    // const traerFrase = async () => {
    //     const api = await fetch(baseUrl);
    //     const frase = await api.json()
    //     console.log(frase[0]);
    //     setdata(frase)
    // }
    const buscarCotizacion = async() => {
      
        const url = `https://back2.tinpad.com.pe/public/api/new-release`;

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

        }


        const rtdo = await axios.get(url, {headers})

        console.log(rtdo.data.data[0]);
        setdata(rtdo.data.data)

    }
    useEffect(() => {
     
    
  
      buscarCotizacion()
      
      console.log(data);
    }, []);


  //  buscar Tipos de noticias y menu desplegable 

  const abrirCerrarModalAdd=()=>{
    setShowModalAdd(!showModalAdd);
  }
  const handleChangeInsertType = (e) => {

    setInfoType({
        ...infoType,
        [e.target.name]: e.target.value
    })
    // console.log(e.target.name, e.target.value);
}

const [infoType, setInfoType] = useState({
  id: "",
  name: ""

})

    const buscarTipo = async() => {
        
      const url = `https://back2.tinpad.com.pe/public/api/release-type`;
  
      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
      }
  
  
      const rtdo = await axios.get(url, {headers})
  
      // console.log(rtdo.data.data);
    
      setSpaceTypes(rtdo.data.data)
  
  }
  useEffect(() => {
     
    buscarTipo()
    
    // console.log(data);
  }, []);

  const peticionPostAdd=async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }
  const url = `https://back2.tinpad.com.pe/public/api/space-type`;
      await axios.post(url, infoType, {headers})
      .then(response=>{
        // setSpaceTypes(spaceTypes.concat(response.data));
        // console.log(response.data);
        abrirCerrarModalAdd();
 
      }).catch(error=>{
        console.log(error);
      })
      buscarTipo()

    }

  const onSubmitInsertarAdd = (e) => {

    // abrirCerrarModalInsertar();

      e.preventDefault();

          peticionPostAdd()

    
  }


  const peticionPost=async()=>{
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }

  const url1 = "https://back2.tinpad.com.pe/public/api/new-release"
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
        await axios.delete(baseUrl+"/"+info.id, info)
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
      const url2 = `https://back2.tinpad.com.pe/public/api/new-release`
      console.log(info);
        await axios.put(url2+"/"+info.id,  info , {headers: headers})
        .then(response=>{
       
          abrirCerrarModalEditar();
         
        }).catch(error=>{
          console.log(error);
        })
     
        buscarCotizacion()
      }

      const handleChangeSwitch = () => {
          setSwitchOn(!switchOn)
        
      }
      
      
      const onSubmitInsertar = (e) => {
                    e.preventDefault();

        if (title.trim() === "" ||description.trim() === ""||typeReleaseId.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
              publicationDate: "",
              typeReleaseId: "",
                title:"" ,  
                description: "",
                file:"",
                image:"", 
            });

            abrirCerrarModalInsertar();
        }
        
    }
    const onSubmitEditar = (e) => {
      e.preventDefault()

            peticionPut()
           
        }
        const imageChange = (e) => {
          if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            console.log(e.target.files[0]);
            setSelectedFilesPost(e.target.files[0])
          }
      };
    
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
            <h3 className="my-5">Agregar noticia o comunicado</h3>

            {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
            <select className='select1' onChange={handleChangeInsert} name="typeReleaseId" value={typeReleaseId}>


              {/* <label htmlFor=""  value="">Seleccione un tipo*</label>  */}
              <option value="" >Seleccione un tipo de noticia*</option>
              {spaceTypes.map(tipos => (
                <option value={tipos.id} key={tipos.id} >{tipos.name}</option>
              ))}



            </select>

                
            {/* <button className='mt-5' onClick={() => abrirCerrarModalAdd()}>Crear nuevo tipo de espacio</button> */}
            <TextField className={styles.inputMaterial} name="title" onChange={handleChangeInsert} label="Titulo*" />
            <br />
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*" multiline rows={3} />
                
            <br />
            <br />
            <label htmlFor="" className='mt-5'>Fecha de publicación</label>
            <br />
            <br />
            
            <input type="date" className={styles.inputMaterial} name="publicationDate" onChange={handleChangeInsert} label="Fecha de Publicación*"  />

            {/* agregar pdf */}
            <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='image'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">attach_file</i>
          </label>
        </div>
                </div> <br/>
     
                {/* cambiar a pdf  */}
            {/* {selectedImage && (
          <div className='eliminarImg'>
            <img
              src={URL.createObjectURL(selectedImage)}
              className='foto1'
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )} */}
            {/* agregar imagen */}
            <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='image'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">add_a_photo</i>
          </label>
        </div>
                </div> <br/>
     

            {selectedImage && (
          <div className='eliminarImg'>
            <img
              src={URL.createObjectURL(selectedImage)}
              className='foto1'
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )}

            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick={abrirCerrarModalInsertar}> Cancelar</Button>
            </div>
          </div>
        </form>
      )

      const bodyAdd=(
        <form action="" onSubmit={onSubmitInsertarAdd} >
      
          <div className={styles.modal}>
            <h3 className="my-5">Agregar Nuevo Espacio</h3>

            {/* { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null } */}
          
    
            <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsertType}  label="Nombre nuevo tipo de espacio" />          
             
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalAdd}> Cancelar</Button>
            </div>
          </div>
        </form>)



  const bodyEditar = (
    <form action="" onSubmit={onSubmitEditar}>
      <div className={styles.modal}>
        <h3 className="my-5">Editar noticia o comunicado</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <select className='select1' onChange={handleChangeInsert} name="typeReleaseId" value={typeReleaseId}>


{/* <label htmlFor=""  value="">Seleccione un tipo*</label>  */}
<option value="" >Seleccione un tipo de noticia*</option>
{spaceTypes.map(tipos => (
  <option value={tipos.id} key={tipos.id} >{tipos.name}</option>
))}



</select>
        <br />
        <TextField className={styles.inputMaterial} name="title" onChange={handleChangeInsert} value={info && info.title} label="Titulo*" />
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" multiline rows={3} />
        <br />
         {/* agregar pdf */}
         <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='image'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">attach_file</i>
          </label>
        </div>
                </div> <br/>
     
                {/* cambiar a pdf  */}
            {/* {selectedImage && (
          <div className='eliminarImg'>
            <img
              src={URL.createObjectURL(selectedImage)}
              className='foto1'
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )} */}
            {/* agregar imagen */}
            <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='image'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">add_a_photo</i>
          </label>
        </div>
                </div> <br/>
     

            {selectedImage && (
          <div className='eliminarImg'>
            <img
              src={URL.createObjectURL(selectedImage)}
              className='foto1'
              alt="Thumb"
            />
            <button onClick={removeSelectedImage} style={styles.delete}>
              Eliminar
            </button>
          </div>
        )}
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
                <TitlePage titulo="Noticias y comunicados" />
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
                        <ModalAdd
      showModalAdd={showModalAdd}
      functionShow= {abrirCerrarModalAdd}
      handleChangeInsert={handleChangeInsert}
      onSubmitEditar={onSubmitInsertarAdd}
      info={info}
      bodyAdd={bodyAdd}
            />
        </div>
    )
}

export default Noticias