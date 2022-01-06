

// falta adjuntar archivos

import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{Component, useEffect, useState}  from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Input from '@material-ui/core/Input';
import ModalAdd from '../../components/pageComponents/ModalAdd';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Select from 'react-select'
import Switch from '@mui/material/Switch';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import {makeStyles} from '@material-ui/core/styles';
import mas from "../../IMG/space/mas.svg"

// import Select from '@mui/material/Select';







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

 

  
  
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  
  

function Espacio() {
 
    const [data, setdata] = useState([]);
    const [spaceTypes, setSpaceTypes] = useState([])
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [switchOn, setSwitchOn] = useState(true)
    const [Archivos, setArchivos] = useState([])
    const [spaceId, setSpaceId] = useState("")

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedFilesPost, setSelectedFilesPost] = useState([]);
    const [selectedImage, setSelectedImage] = useState();
    const [pathImg, setPathImg] = useState()
    const [infoImg, setInfoImg] = useState()
    const [loading, setLoading] = useState(false);


    // console.log(data);
    const customerTableHead = [
  
      {
          title:"Tipo de espacio",
          // field: data.space_type,    
          render: data => data.space_type.name},
      {
          title:"Descripción",
          field: "description"
      },
      {
          title:"N° o Nombre",
          field: "internalCode"
      },
      {
          title:"Tiempo previo para reservar",
          render: data => data.previusReservationTime + " hs"
        
      },
      {
          title:"Horas máximas al mes",
          render: data => data.maximiunReservationTime +  " hs"
         
      },
  ]

  const gustos = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11', label: '11' },
    { value: '12', label: '12' }
  ]


    const imageChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        setSelectedImage(e.target.files[0]);
        console.log(e.target.files[0]);
        setSelectedFilesPost(e.target.files[0])
      }
  };


  const removeSelectedImage = () => {
    setSelectedImage();
};
      
  





   
    const [info, setInfo] = useState({
        id: "",
        spaceTypeId: "",
        description: "",
        internalCode: "",
        previusReservationTime: "",
        maximiunReservationTime: "",
        rulesOfUse: "",
        visibility: "", 
    })

    const [infoType, setInfoType] = useState({
        id: "",
        name: ""
  
    })
    

    // console.log(spaceTypes);

    
    
    const [error, setError] = useState(false)
    
    
    
    const{maximiunReservationTime,rulesOfUse, spaceTypeId, description, internalCode, previusReservationTime, id} = info;





    const{name} = infoType;




  
    const baseUrl="https://back2.tinpad.com.pe/public/api/space";
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        // console.log(e.target.name, e.target.value);
    }
    const handleChangeInsertType = (e) => {

        setInfoType({
            ...infoType,
            [e.target.name]: e.target.value
        })
        // console.log(e.target.name, e.target.value);
    }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(user.id);       
        (caso==="Editar")? abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }

      useEffect(() => {
      
      const buscarCotizacion = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/space`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data[0]);
        
          setdata(rtdo.data.data)

  
      }
     
    
  
      buscarCotizacion()
      
      // console.log(data);
      
    }, []);

        
    const buscarCotizacion = async() => {
        
      const url = `https://back2.tinpad.com.pe/public/api/space`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

      }


      const rtdo = await axios.get(url, {headers})

      // console.log(rtdo.data.data[0]);
    
      setdata(rtdo.data.data)


  }
  const buscarTipo = async() => {
        
    const url = `https://back2.tinpad.com.pe/public/api/space-type`;

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

    }


    const rtdo = await axios.get(url, {headers})

    // console.log(rtdo.data.data);
  
    setSpaceTypes(rtdo.data.data)

}

const [spaceIdDelete, setSpaceIdDelete] = useState([])
let result=[];
let result2= null
const buscarSpaceId = async() => {
        
  const url = `https://back2.tinpad.com.pe/public/api/space-image`;

  const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }


  // console.log(typeof(info.id));
  const idSeek = (info.id).toString()
  // console.log(typeof(idSeek));
  axios.get(url,{headers})
    .then( (response) =>{

          response.data.data.forEach((req) => {
          if (req.spaceId === idSeek) {

                    result.push(req);
            } 
          })
          // this.setState({results:results});   
          console.log(result);
          console.log(result.path);
    
   
    })
  .catch(function (error) {
    console.log(error);
  }) 
  console.log(pathImg);
  
}

const seleccionarVisibility=(user, caso)=>{
  setInfo(user);
  console.log(user);        
  // console.log(user.user);
  peticionPutVisibility(user)

}

const peticionPutVisibility=async(InfoUser)=>{    
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

}
  if (switchOn) {
    await axios.put("https://back2.tinpad.com.pe/public/api/space"+"/"+InfoUser.id,  {visibility: "0"} , {headers: headers})
    .then(response=>{

      console.log("visi1");
      
      buscarCotizacion()  
    }).catch(error=>{
      console.log(error);
    })
  } else{
    await axios.put("https://back2.tinpad.com.pe/public/api/space"+"/"+InfoUser.id,  {visibility: "1"} , {headers: headers})
    .then(response=>{

      console.log("visi2");
      
      buscarCotizacion()   
    }).catch(error=>{
      console.log(error);
    })
  }}


useEffect(() => {

  const buscarSpaceId2 = async() => {
          
    const url = `https://back2.tinpad.com.pe/public/api/space-image`;
  
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
  
    // console.log(typeof(info.id));
    const idSeek = (info.id).toString()
    console.log(info.id);
    axios.get(url,{headers})
      .then( (response) =>{
  
            response.data.data.forEach((req) => {
            if (req.spaceId === idSeek) {
  
                      result2 = req;
                      setInfoImg(req)
              } 
            })
            // this.setState({results:results});   
            console.log(result2);
            console.log(result);
            // result2 = "https://back2.tinpad.com.pe/public/" + result2.path
  
            setPathImg("https://back2.tinpad.com.pe/public/" + result2.path)
            console.log(result2);
          
  
          })
          .catch(function (error) {
            console.log(error);
            setPathImg()
          })         
          
  }
  
  buscarSpaceId2()
}, [showModalEditar]);

const eliminarImg = async () => {

  console.log("borrandoimg");
  const url = `https://back2.tinpad.com.pe/public/api/space-image`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

}

// console.log(result2.id);


  await axios.delete(url+"/"+infoImg.id, {headers}) 
  .then(response=>{
    // setdata(data.filter(artista=>artista.id!==info.id));
   
    console.log("eliminado de space-image");
  }).catch(error=>{ 
    
    console.log(error);
    
  })
  setPathImg()

}

const eliminarTodos = async () => {
          
  const url = `https://back2.tinpad.com.pe/public/api/space-image`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

}
  
  for (let index = 0; index < result.length; index++) {
    console.log(result[index].id);
    await axios.delete(url+"/"+result[index].id, {headers}) 
    .then(response=>{
      // setdata(data.filter(artista=>artista.id!==info.id));
      abrirCerrarModalEliminar();
      console.log("eliminado de space-image");
      setSelectedImage()
    }).catch(error=>{ 
      
      console.log(error);
      setSelectedImage()

    })
}
console.log("eliminjar todos 2");
 // setSpaceTypes(rtdo.data.data)

}


    useEffect(() => {
     
    
      const buscarTipo = async() => {
        
          const url = `https://back2.tinpad.com.pe/public/api/space-type`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
  
  
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data);
        
          setSpaceTypes(rtdo.data.data)
  
      }
  
      buscarTipo()
      
      // console.log(data);
    }, []);
    


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
          setSpaceId(response.data.data.id)
        }).catch(error=>{
          console.log(error);
        })
        buscarCotizacion()
      }

      const peticionPost2=async()=>{
        console.log("post2");

        const f = new FormData()   
  
   
        console.log(selectedFilesPost);

       

            f.append("file", selectedFilesPost)
            f.append("spaceId", spaceId)
   
          // console.log(f);

          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
    
          const url1= "https://back2.tinpad.com.pe/public/api/space-image"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
              setSelectedFiles([])
              setSelectedFilesPost([])
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
              setSelectedFiles([])
              setSelectedFilesPost([])
            })

        // console.log(filesImg);
          // buscarCotizacion()
        }
      const peticionPost3=async(casa)=>{
        console.log("post2");

        const f = new FormData()   
  
   
        console.log(selectedFilesPost);

       

            f.append("file", selectedFilesPost)
            f.append("spaceId", casa)
   
          // console.log(f);

          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
    
          const url1= "https://back2.tinpad.com.pe/public/api/space-image"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
              setSelectedFiles([])
              setSelectedFilesPost([])
              console.log("exito -1");
            }).catch(error=>{
              console.log(error);
              setSelectedFiles([])
              setSelectedFilesPost([])
            })

        // console.log(filesImg);
          // buscarCotizacion()
        }


      useEffect(() => {


          
        
          peticionPost2()
      }, [spaceId]);
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

      const peticionDelete=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
       const url1 = "https://back2.tinpad.com.pe/public/api/space"
        await axios.delete(url1+"/"+info.id, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          abrirCerrarModalEliminar();
          console.log("eliminado de space");
        }).catch(error=>{ 
          
          console.log(error);
        })
        buscarCotizacion()

        buscarSpaceId()
        console.log("eliminjar todos");
        setTimeout(() => {
          
          eliminarTodos()
        }, 4000);

    

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
      console.log(info);
        await axios.put(baseUrl+"/"+info.id,  info , {headers: headers})
        .then(response=>{
       
          abrirCerrarModalEditar();
         
        }).catch(error=>{
          console.log(error);
        })
        peticionPost3(info.id)
        buscarCotizacion()
      }

      const peticionPutSwitch=async()=>{       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
        await axios.put(baseUrl+"/"+info.id, {headers}, info) 
        .then(response=>{
          setdata(data.visibility= 0 );
          abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })
      }

      const handleChangeSwitch = () => {
          setSwitchOn(!switchOn)
        
      }

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (description.trim() === "" || spaceTypeId.trim() === "" ||internalCode.trim() === "" ||previusReservationTime.trim() === "" || maximiunReservationTime.trim() === "" || rulesOfUse.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()    
            

            setInfo({
              id: "",
              spaceTypeId: "",
        description: "",
        internalCode: "",
        previusReservationTime: "",
        maximiunReservationTime: "",
        rulesOfUse: ""
            });
            setSelectedImage()

            abrirCerrarModalInsertar();
            buscarCotizacion()
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000);

            // setTimeout(() => {
            //   window.location.reload();
            // }, 1000);
            // window.location.reload();
            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitInsertarAdd = (e) => {

      // abrirCerrarModalInsertar();

        e.preventDefault();

            peticionPostAdd()

      
    }
    const onSubmitEditar = (e) => {

      e.preventDefault();

     
            peticionPut()
            setSelectedImage()
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000);
            // window.location.reload();
 
        }

        const abrirCerrarInsertar = () => {
          abrirCerrarModalInsertar();
          setSelectedFiles([])
          setSelectedImage()
          setInfoImg() 
         
        }
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

      const abrirCerrarModalEditar=()=>{
        
        
        setShowModalEditar(!showModalEditar);
        console.log(pathImg);
        setSelectedImage()
        setInfoImg() 
        
    
   
      }
      const abrirCerrarModalEliminar=()=>{
        setShowModalEliminar(!showModalEliminar);
      }
      const abrirCerrarModalAdd=()=>{
        setShowModalAdd(!showModalAdd);
      }
      const styles= useStyles();

      const bodyInsertar=(
        <form action="" onSubmit={onSubmitInsertar}>

          <div className={styles.modal}>
            <h3 className="my-5">Agregar Nuevo Espacio</h3>

            {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
            <select className='select1' onChange={handleChangeInsert} name="spaceTypeId" value={spaceTypeId}>


              {/* <label htmlFor=""  value="">Seleccione un tipo*</label>  */}
              <option value="" >Seleccione un tipo de espacio</option>
              {spaceTypes.map(tipos => (
                <option value={tipos.id} key={tipos.id} >{tipos.name}</option>
              ))}



            </select>

            <button className='mt-5' onClick={() => abrirCerrarModalAdd()}>Crear nuevo tipo de espacio</button>
            {/* <TextField className={styles.inputMaterial} name="type" onChange={handleChangeInsert} label="Tipo*"  />  */}
            <br />
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Descripción*" multiline rows={3} />
            {/* <TextField className={styles.inputMaterial} name="spaceTypeId" onChange={handleChangeInsert}  label="typeid*" /> */}
            <TextField className={styles.inputMaterial} name="internalCode" onChange={handleChangeInsert} label="ID (N° o nombre)*" />
            <br />
            <br />
            {/* <TextField className={styles.inputMaterial} name="previusReservationTime" onChange={handleChangeInsert} label="Tiempo previo de reserva (horas)*" /> */}
            <select className='select1' onChange={handleChangeInsert} name="previusReservationTime">


              {/* <label htmlFor=""  value="">Seleccione un tipo*</label>  */}
              <option value="" >Tiempo previo para reservar</option>
  
                      {gustos.map(tipos => (
                <option value={tipos.value} key={tipos.value} >{tipos.label}</option>
              ))}



            </select>
            <br />
            <TextField className={styles.inputMaterial} name="maximiunReservationTime" onChange={handleChangeInsert} label="Horas máximas de reservas al mes por usuario*" type="number" />
            <TextField className={styles.inputMaterial} name="rulesOfUse" onChange={handleChangeInsert} label="Normas de Uso*" multiline rows={5} />
            {/* <div class="image-upload">
              <label for="file-input">
                <img src={mas} />
              </label>
              <input type="file" className="mt-10" name="file" id="file-input" multiple onChange={(e) => subirArchivos(e.target.files)} />
            </div> */}
            {/* <br /><br /> */}

            <div className='mt-5'>
              {/* <label>Choose File to Upload: </label> */}
              <input type="file" onChange={imageChange} id="file" />
              <div className="label-holder">
                <label htmlFor="file" className="label">
                  <i className="material-icons">add_a_photo</i>
                </label>
              </div>
            </div> <br />


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


            {/* aparte  */}
            <div align="right">
              <Button color="primary" type="submit">Insertar</Button>
              <Button onClick={abrirCerrarInsertar}> Cancelar</Button>
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
        </form>
      )



  const bodyEditar = (
    <form action="" onSubmit={onSubmitEditar}>
      <div className={styles.modal}>
        <h3 className="my-5">Editar Espacio</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}
        <select className='select1' onChange={handleChangeInsert} name="spaceTypeId" value={spaceTypeId}>


          {/* <label htmlFor=""  value="">Seleccione un tipo*</label>  */}
          <option value="" >Seleccione un tipo de espacio</option>
          {spaceTypes.map(tipos => (
            <option value={tipos.id} key={tipos.id} >{tipos.name}</option>
          ))}



        </select>

        {/* <TextField className={styles.inputMaterial} name="spaceTypeId" onChange={handleChangeInsert} value={info && info.spaceTypeId} label="Tipo*" /> */}
        <br />
        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Descripción*" />
        <br />
        <TextField className={styles.inputMaterial} name="internalCode" onChange={handleChangeInsert} value={info && info.internalCode} label="ID (N° o nombre)*" />
        <br />
        <TextField className={styles.inputMaterial} name="previusReservationTime" onChange={handleChangeInsert} value={info && info.previusReservationTime} label="TTiempo previo de reserva (horas)*" />
        <TextField className={styles.inputMaterial} name="maximiunReservationTime" onChange={handleChangeInsert} value={info && info.maximiunReservationTime} label="Horas máximas de reservas al mes por usuario*" />
        <TextField className={styles.inputMaterial} name="rulesOfUse" onChange={handleChangeInsert} value={info && info.rulesOfUse} label="Normas de Uso*" />
        <br /><br />

        { pathImg ? null :      <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" />
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">add_a_photo</i>
          </label>
        </div>
                </div> }

                {selectedImage && (
          <div className='eliminarImg mt-5'>
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

   
     
        {pathImg && (

          <div className='eliminarImg'>
            <img
              src={pathImg}
              className='foto1'
            // alt="Thumb"
            />

            <button onClick={() => eliminarImg()} style={styles.delete}>
              Eliminar
            </button>
          </div>

        )}
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
                <Button onClick={()=>buscarSpaceId()}>No</Button>
        
              </div>
        
            </div>
          )

    

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Espacios de uso común" />
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
                    icon:() =>  <Switch {...label} defaultChecked onChange={handleChangeSwitch} className="toggle-button"/>,
                    tooltip:"add",
                    onClick: (event, rowData) => seleccionarVisibility(rowData, "Visibility") 
                    
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

export default Espacio