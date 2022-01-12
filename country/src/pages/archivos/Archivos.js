import '../users/Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React,{useEffect, useState}  from 'react';

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
        title:"Tamaño",
        render: data => parseInt(data.size / 1000) + " kb"     
       
    },
    {
        title:"Descripción",
        field: "description"
    }]





function Archivos() {
 
    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedFilesPost, setSelectedFilesPost] = useState();
    const [loading, setLoading] = useState(false);
    const [pathImg, setPathImg] = useState()



    
    const [info, setInfo] = useState({
        
        publicationDate: "",
        internalCode: "",
        description:"" ,
        internalCode: "1",
       phone: "1"      
   
    })

    const [error, setError] = useState(false)





    const{description, publicationDate} = info;

  
    const baseUrl="https://back2.tinpad.com.pe/public/api/useful-information";
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
        
    }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(info);  
        
  
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
        
          setdata((rtdo.data.data).filter(artista=> (artista.phone === null || artista.phone === "1")));

  
      }
      useEffect(() => {
      

        buscarCotizacion()
  }, []);

  const removeSelectedImage = () => {
    setSelectedImage();
};

const peticionPost=async()=>{
  console.log("post2");

  const f = new FormData()   


  
  console.log(info);
  // console.log(selectedFilesPost.length > 0);
    
          if (selectedFilesPost) {
            
            f.append("attached", selectedFilesPost)
          }


      f.append("publicationDate", info.publicationDate)
      f.append("description", info.description)
      f.append("internalCode", "1")
      f.append("phone", "1")
      

    // console.log(f);

    const headers = {
      'Content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }

    const url1= "https://back2.tinpad.com.pe/public/api/useful-information"
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

// const peticionPost=async()=>{
//   const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

// }
//     await axios.post(baseUrl, info, {headers})
//     .then(response=>{
//       // setdata(data.concat(response.data));
//       abrirCerrarModalInsertar();
//     }).catch(error=>{
//       console.log(error);
//     })
//    buscarCotizacion()
//   }
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
  const eliminarImg = async () => {

    console.log("borrandoimg");
    const url = `https://back2.tinpad.com.pe/public/api/useful-information`;
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
  }
  
  // console.log(result2.id);
  
  
    await axios.put(url+"/"+info.id,{atached:null}, {headers}) 
    .then(response=>{
      // setdata(data.filter(artista=>artista.id!==info.id));
     
      console.log("cambiado a null");
    }).catch(error=>{ 
      
      console.log(error);
      
    })
    setPathImg()
    
  
  }



  const peticionPut=async()=>{       

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

  }
  const info2 = {
        
    publicationDate: info.publicationDate,
  
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

        if (description.trim() === ""||publicationDate.trim() === "") {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setPathImg()
            setSelectedImage()
            setInfo({
                publicationDate: "",
                description:"" ,  

            });

            abrirCerrarModalInsertar()
        }
        buscarCotizacion()

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

        const abrirCerrarInsertar = () => {
          abrirCerrarModalInsertar();
          setPathImg()
          setSelectedImage()
  
         
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

      const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
          console.log(e.target.files[0]);
          setSelectedFilesPost(e.target.files[0])
        }
    };

    useEffect(() => {
      setPathImg("https://back2.tinpad.com.pe/public/" + info.attached)
    }, [abrirCerrarModalEditar]);

      const bodyInsertar=(
        <form action="" onSubmit={onSubmitInsertar}>
      
          <div className={styles.modal}>
            <h3 className="my-5">Agregar archivo</h3>

            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }

    
            <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} label="Titulo*"  />
            <br />
            <br />
            <br />
              <label htmlFor="">Fecha de Publicación*</label>
            <input type="date" className={styles.inputMaterial} name="publicationDate" onChange={handleChangeInsert} label="Fecha de Publicación*"  />

   
            <div className='mt-5'>
                {/* <label>Choose File to Upload: </label> */}
                <input type="file"  onChange={imageChange} id="file" name='image'/>
            <div className="label-holder">
          <label htmlFor="file" className="label">
            <i className="material-icons">attach_file</i>
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
              <Button onClick= {abrirCerrarInsertar}> Cancelar</Button>
            </div>
          </div>
        </form>
      )



  const bodyEditar = (
    <form action="" onSubmit={onSubmitEditar}>
      <div className={styles.modal}>
        <h3 className="my-5">Editar archivo</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}

        <TextField className={styles.inputMaterial} name="description" onChange={handleChangeInsert} value={info && info.description} label="Titulo*" />
        <br />  <br />  <br />
        <input type="date" className={styles.inputMaterial} name="publicationDate" onChange={handleChangeInsert} value={info && info.publicationDate} label="Fecha de Publicación*" />
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
              <p>Estás seguro que deseas eliminar  <b>{info&&info.title}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    

    return (
        <div>
            <div className='Container'>
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

export default Archivos