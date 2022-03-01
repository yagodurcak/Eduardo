


// falta loi de mail en editar

import "../users/Users.css"

import {Button, Modal, TextField} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEditar2 from '../../components/pageComponents/ModalEditar2';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import {PersonalContext} from '../../context/PersonalContext';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import excel from "../../IMG/template_employe_condominio.xlsx";
import {makeStyles} from '@material-ui/core/styles';
import {userContext} from '../../context/UserContext';

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
    title:"Nombres",
    field: "name"
},
{
    title:"Apellidos",
    field: "lastName",
    
}
,
{
    title:"Doc. de Identidad",
    field: "document"
}
,
{
    title:"Teléfono",
    field: "phone"
}
]



function Personal2() {
    const styles= useStyles();

    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar2, setShowModalEditar2] = useState(false);

    const [showModalEditar, setShowModalEditar] = useState(false);
    const [showModalEliminar, setShowModalEliminar] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState();
    const { dataUser, setdataUser } = useContext(userContext);
    const { dataPersonal, setdataPersonal } = useContext(PersonalContext);
    
    const [info, setInfo] = useState({

      name: "",
      lastName: "",
      document:"",
      email:"",
      phone:""
    })

   

    const{document, lastName,  name, email, phone } = info;
  
    const baseUrl="https://back2.tinpad.com.pe/public/api/employe";
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
        console.log("buscando datapersonal");
      const url = `https://back2.tinpad.com.pe/public/api/employe`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }


      const rtdo = await axios.get(url, {headers})

      console.log(rtdo.data.data[0]);
      console.log(localStorage.getItem('user'));
      setdataUser(JSON.parse(localStorage.getItem('user')))
      setdataPersonal(rtdo.data.data)
      
    }
    // }

    if (dataPersonal.length === 0) {

        console.log(dataPersonal.length);
        // buscarCotizacion()
      
    }else{
        console.log(dataPersonal.length);
    }


// useEffect(() => {
 


//   buscarCotizacion()
  
//   console.log(data);
// }, []);

    

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
          await axios.post("https://back2.tinpad.com.pe/public/api/employe", info, {headers})
          .then(response=>{
            // setdata(data.concat(response.data));
            abrirCerrarModalInsertar();
          }).catch(error=>{
            console.log(error);
          })

          buscarCotizacion()
      
        }
 
        const peticionPost2=async(e)=>{

          console.log("post2");
     
          const f = new FormData()   
    
                    
          f.append("file", selectedImage)
    
            const headers = {
              'Content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        
          }
        
            const url1= "https://back2.tinpad.com.pe/public/api/import-employe"
              await axios.post(url1, f, {headers})
              .then(response=>{
                // setdata(data.concat(response.data));
                // abrirCerrarModalInsertar();
        
                
                console.log("exito -1");
                setTimeout(() => {
                  buscarCotizacion()
                }, 3000);
              }).catch(error=>{
                console.log(error);
                setSelectedImage()
              })
        
          // console.log(filesImg);
     
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
          await axios.put("https://back2.tinpad.com.pe/public/api/employe"+"/"+info.id,  info , {headers: headers})
          .then(response=>{

            abrirCerrarModalEditar();
     
          }).catch(error=>{
            console.log(error);
          })
         buscarCotizacion()
        }
      
        const onSubmitEditar2 = (e) => {

          e.preventDefault();
                peticionPost2()
                // window.location.reload();
                // setTimeout(() => {
                //   window.location.reload();
                // }, 2000);
                setLoading(true)
                setTimeout(() => {
                  setLoading(false)
                }, 2000);
                console.log("listo");
                abrirCerrarModalEditar2()
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
      const abrirCerrarModalEditar2=()=>{
        setShowModalEditar2(!showModalEditar2);
      }

      const abrirCerrarModalEditar=()=>{
        setShowModalEditar(!showModalEditar);
      }
      const abrirCerrarModalEliminar=()=>{
        setShowModalEliminar(!showModalEliminar);
      }
     

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
          <p>Estás seguro que deseas eliminar  <b>{info&&info.name}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
            <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )
      const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
          console.log(e.target.files[0]);
          // setSelectedFilesPost(e.target.files[0])
        }
    };
      const bodyEditar2=(
        <form action="" onSubmit={onSubmitEditar2}>
          <div className={styles.modal}>
            <h3 className="my-5">Adjuntar Excel para su importación</h3>
            { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            { error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null }
            {/* <TextField className={styles.inputMaterial} name="consume" onChange={handleChangeInsert} label="Kw consumidos*" type="number" /> */}
     
            <div className='mt-5'>
              {/* <label>Choose File to Upload: </label> */}
              <input type="file" onChange={imageChange} id="file" />
              <div className="label-holder">
                <label htmlFor="file" className="label">
                  <i className="material-icons">note_add</i>
                </label>
              </div>
            </div> <br />
            {selectedImage && (
              <div className='eliminarImg'>
                <h4>{selectedImage.name}</h4>
  
                {/* <button onClick={removeSelectedImage} style={styles.delete}>
                  Eliminar
                </button> */}
              </div>
            )}
  
     
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Importar</Button>
              <Button onClick= {abrirCerrarModalEditar2}> Cancelar</Button>
            </div>
          </div>
        </form>
      )

    return (
        <div>
            <div>
                <TitlePage titulo="Personal de Servicio" />
               { dataUser.roleId === "1" ?
                <div className="flex justify-between ">
                <button className="btn" >
                    {/* <Link to="../../IMG/Pagos 1gastos.svg" target="_blank" download>Descagar Plantilla</Link> */}
                    <a className="enlace" href= {excel} download>Descagar Plantilla</a>
                        
                    </button>
                    <button className="btn" onClick={()=>abrirCerrarModalEditar2()}>
                        Importar Plantilla
                    </button>
                    <button className="btn" onClick={()=>abrirCerrarModalInsertar()}>
                        Agregar
                    </button>
                   
                </div>
                : null}
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}


           {dataUser.roleId === "1" ? 


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
                 :   <div className="mt-10"><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={data}
     

                 /></div>}
            </div>
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
                        <ModalEditar2
            showModalEditar2={showModalEditar2}
            functionShow= {abrirCerrarModalEditar2}
            handleChangeInsert={handleChangeInsert}
            onSubmitEditar={onSubmitEditar}
            info={info}
            bodyEditar2={bodyEditar2}
            />
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

export default Personal2
