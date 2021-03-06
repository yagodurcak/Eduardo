import './Users.css'

import {Button, Modal, TextField} from '@material-ui/core';
import React, {useContext, useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEditar2 from '../../components/pageComponents/ModalEditar2';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Switch from '@mui/material/Switch';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import {UsuariosContext} from '../../context/UsuariosContext';
import axios from "axios"
import excel from "../../IMG/template_owner.xlsx";
import {makeStyles} from '@material-ui/core/styles';
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

  
  
  
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
 
  function Users() {
    
    const [data, setdata] = useState([]);
  
    // const [dataUser, setdataUser] = useState([])
    
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
   const [showModalEliminar, setShowModalEliminar] = useState(false);
   const [switchOn, setSwitchOn] = useState(true)
   const [infoid, setinfoid] = useState("")
   const [infoPropertyId, setinfoPropertyId] = useState("")

   const [InfoUserProperty, setInfoUserProperty] = useState([])
   const [refresh, setrefresh] = useState(false)
   const [postSuccess, setpostSuccess] = useState(false)
   const [postSuccess2, setpostSuccess2] = useState(false)
   const [loading, setLoading] = useState(false);
   const [showModalEditar2, setShowModalEditar2] = useState(false);
   const { dataUser, setdataUser } = useContext(userContext);
   const [selectedImage, setSelectedImage] = useState();
   const [aprobador, setAprobador] = useState(false);
   const { dataUsuarios, setdataUsuarios } = useContext(UsuariosContext);
   const nuevoArray = () => {
     
   }



   const customerTableHead = [
   
     {
           title:"Nombres",
           render: data => data.user.name + " " + data.user.lastName 
          },
      //     {
      //      title:"Apellidos",
      //      render: data => data.user.lastName, width: "1%"
      //  },
       {
           title:"Doc. de Identidad",
           render: data => data.user.document, width: "10%"
       },  
       {
           title:"Tel??fono",
           render: data => data.user.phone, width: "10%"
       },
       {
         title:"Mz.",
         render: data => data.property.block, width: "5%"
       },
       { 
         title:"Lte.",
         render: data => data.property.lot, width: "5%"
        }
        // {
        //   title:"Correo",
        //   render: data => data.user.email, width: "20%"
        // }
      ]
      

    const [info, setInfo] = useState({

      name: "",
      lastName: "",
      document:"",
      email: "",
      phone: 0,
      password:"12345678",
      password_confirmation:"12345678",
      roleId: "3"

    })

    const [InfoUser, setInfoUser] = useState({
      name: "",
      lastName: "",
      document:"",
      email: "",
      phone: 0,
 


    })

    const [infoProperty, setInfoProperty] = useState({

      block: "",
      lot: "",
      area:""
    })

 
    const [error, setError] = useState(false)
   

    const{document, lastName,  name, email, phone } = info;
    const{block, lot,  area } = infoProperty;

  
    const baseUrl="http://localhost:3001/Users";

    const refreshPag=()=>{
      setrefresh(!refresh);
    }
    const handleChangeInsert = (e) => {

        setInfo({
            ...info,
            [e.target.name]: e.target.value,
       
        })
    }
    const handleChangeInsert2 = (e) => {

      setInfoUser({
            ...InfoUser,
            [e.target.name]: e.target.value,
       
        })
    }
    const handleChangeInsertProperty = (e) => {

        setInfoProperty({
            ...infoProperty,
            [e.target.name]: e.target.value,
          
        })
    }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        console.log(user);        
        // console.log(user.user);
        (caso==="Editar")?abrirCerrarModalEditar()
        : 
        abrirCerrarModalEliminar() 
      }
    const seleccionarVisibility=(user, caso)=>{
     if (dataUser.roleId === "1") {
       
       setInfo(user);
       console.log(user);        
       // console.log(user.user);
       peticionPutVisibility(user)
     } else {
       return null
     }    
   
      }
      
      useEffect(() => {
        setInfoUser(info.user)
        setInfoUserProperty(info.property)
      }, [info]);

      const buscarProperty = async() => {
         
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);
        console.log("buscando datapersonal");
          const url = `https://back2.tinpad.com.pe/public/api/property-user`;

          const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

          }
          const rtdo = await axios.get(url, {headers})
 
          // console.log(rtdo.data.data);
          setdataUser(JSON.parse(localStorage.getItem('user')))
          setdataUsuarios(rtdo.data.data)
          console.log(rtdo.data.data);
      }
      
    useEffect(() => {

      if (dataUsuarios.length === 0) { 
        console.log(dataUsuarios.length);
        buscarProperty()
    
    
    }else{
      console.log(dataUsuarios.length);
      return
  }
  
  
  }, []);

    useEffect(() => {
    if (dataUser.roleId === 4) {
        setAprobador(true)
    }
    }, [dataUser]);

    


    const peticionPost=async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
        await axios.post("https://back2.tinpad.com.pe/public/api/register", info, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          console.log("exito-1");
          setinfoid(response.data.user.id)
          peticionPost2()
          // console.log(response.data.user.id);
          // abrirCerrarModalInsertar();
          // setpostSuccess(!true)
        
        }).catch(error=>{
          console.log(info);
          console.log(error);
        });
      }
;
    const peticionPost2 =async()=>{
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
        await axios.post("https://back2.tinpad.com.pe/public/api/property", infoProperty, {headers})
        .then(response=>{
          // setdata(data.concat(response.data));
          setinfoPropertyId(response.data.data.id)
          console.log("exito-2");
          // console.log(response.data.data.id);
          // abrirCerrarModalInsertar();
          setpostSuccess2(true)
          
        }).catch(error=>{
          console.log(error);
        })
      }
      const peticionPost4=async(e)=>{

        console.log("post2");
   
        const f = new FormData()   
  
                  
        f.append("file", selectedImage)
  
          const headers = {
            'Content-type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
      
          const url1= "https://back2.tinpad.com.pe/public/api/import-owner"
            await axios.post(url1, f, {headers})
            .then(response=>{
              // setdata(data.concat(response.data));
              // abrirCerrarModalInsertar();
      
              
              console.log("exito -1");
              setTimeout(() => {
                buscarApi()
              }, 3000);
            }).catch(error=>{
              console.log(error);
              setSelectedImage()
            })
      
        // console.log(filesImg);
   
        }


        const onSubmitInsertar = (e) => {
    
            e.preventDefault();
    
            if (document.trim() === "" || lastName.trim() === "" ||name.trim() === "" ||email.trim() === "" ||block.trim() === "" ||lot.trim() === "" ||area.trim() === "" ) {
            
             setError(true);
             return
            }else {
                setError(false);
    
                peticionPost()
              
                 
                  // if (postSuccess2) {
                  //   peticionPost3()
                  //   setpostSuccess2(false)
                  // }
      
                
                setInfo({
                  id: "",
                  name: "",
                  lastName: "",
                  document:"",
                  email: "",
                  phone:"",
                  password:"12345678",
                  password_confirmation:"12345678",
                  roleId: "3"
                });
                setInfoProperty({
                  id: "",
                  block: "",
                  lot: "",
                  area:""
                });
     
                abrirCerrarModalInsertar()
                // buscarApi()
               
                // setTimeout(() => {
                //   window.location.reload();
                // }, 100000);
                
              
    
            }
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000);
            


        }
    
      
     
            useEffect(() => {
       
              const peticionPost3 =async()=>{
         
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),}   
                
                await axios.post("https://back2.tinpad.com.pe/public/api/property-user", {
                  userId: infoid ,
                  propertyId: infoPropertyId
                }, {headers})
                .then(response=>{
                  // setdata(data.concat(response.data));
                  // abrirCerrarModalInsertar();
                  console.log(response.data);
                  // set1
                    //    setTimeout(() => {
                    //   window.location.reload();
                    // }, 1000);
                    buscarApi()
                }).catch(error=>{
                  console.log(error);
                })
              }


              peticionPost3()
            }, [infoPropertyId]);

      const peticionDelete=async()=>{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
       const url1 = "https://back2.tinpad.com.pe/public/api/property-user"
        await axios.delete(url1+"/"+info.id, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          abrirCerrarModalEliminar();
        }).catch(error=>{ 
          
          console.log(error);
        })
       const url2 = "https://back2.tinpad.com.pe/public/api/user"
        await axios.delete(url2+"/"+info.userId, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          // abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        })
       const url3 = "https://back2.tinpad.com.pe/public/api/property"
        await axios.delete(url3+"/"+info.propertyId, {headers}) 
        .then(response=>{
          // setdata(data.filter(artista=>artista.id!==info.id));
          // abrirCerrarModalEliminar();
        }).catch(error=>{ 
          console.log(error);
        });

        buscarApi()
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 2000);

        // set1
            //  setTimeout(() => {
            //   window.location.reload();
            // }, 500);
      }

      const peticionPut=async()=>{       

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
    
      }
        await axios.put("https://back2.tinpad.com.pe/public/api/user"+"/"+InfoUser.id,  InfoUser , {headers: headers})
        .then(response=>{

          console.log("bienput");
          
          buscarApi()   
        }).catch(error=>{
          console.log(error);
        })
      }

      const handleChangeSwitch = () => {
          setSwitchOn(!switchOn)
        
      }





      
    

      const peticionPutVisibility=async(InfoUser)=>{    
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
  
    }
      if (switchOn) {
        await axios.put("https://back2.tinpad.com.pe/public/api/user"+"/"+InfoUser.userId,  {visibility: "0"} , {headers: headers})
        .then(response=>{

          console.log("visi1");
          
          buscarApi()   
        }).catch(error=>{
          console.log(error);
        })
      } else{
        await axios.put("https://back2.tinpad.com.pe/public/api/user"+"/"+InfoUser.userId,  {visibility: "1"} , {headers: headers})
        .then(response=>{

          console.log("visi2");
          
          buscarApi()   
        }).catch(error=>{
          console.log(error);
        })
      }}


   
    

      const buscarApi = async() => {
        
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

        setdataUsuarios(rtdo.data.data)

    }

        
  

    //   setTimeout(() => {
    //     peticionPost3()
        
    //   }, 2000);

    //   setTimeout(() => {
    //     refreshPag(true)
    //   }, 1500);
      
    // }, [postSuccess2]);

    const onSubmitEditar = (e) => {
      e.preventDefault();
            peticionPut()
            abrirCerrarModalEditar();
            console.log("exit");
            buscarApi()    
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
            }, 2000);       
           
        }


    
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

      const abrirCerrarModalEditar=()=>{
        setShowModalEditar(!showModalEditar);
      }
      const abrirCerrarModalEditar2=()=>{
        setShowModalEditar2(!showModalEditar2);
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
              <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert}  label="Email*" />
              <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert}  label="Doc. de Identidad*" />
            <br />
              <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert} label="Tel??fono" />
            <br />
              <TextField className={styles.inputMaterial} name="block" onChange={handleChangeInsertProperty}  label="Manzana*" />
              <TextField className={styles.inputMaterial} name="lot" onChange={handleChangeInsertProperty}  label="Lote*" />
              <TextField className={styles.inputMaterial} name="area" onChange={handleChangeInsertProperty}  label="Area (m2)*" />
          
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
              <h3 className="my-5">Editar Usuario</h3>
              { error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
              <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert2} value= {InfoUser&&InfoUser.name} label="Nombre" />
              <br />
              <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert2} value= {InfoUser&&InfoUser.lastName} label="Apellido" />          
                <br />
                <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert2} value= {InfoUser&&InfoUser.document} label="Doc. de Identidad" />
              <br />
                <TextField className={styles.inputMaterial} name="phone" onChange={handleChangeInsert2} value= {InfoUser&&InfoUser.phone} label="Tel??fono" />
                <TextField className={styles.inputMaterial} name="block" onChange={handleChangeInsert2} value= {InfoUserProperty&&InfoUserProperty.block} label="Mz." />
                <TextField className={styles.inputMaterial} name="lot" onChange={handleChangeInsert2} value= {InfoUserProperty&&InfoUserProperty.lot} label="Lte." />
                <TextField className={styles.inputMaterial} name="area" onChange={handleChangeInsert2} value= {InfoUserProperty&&InfoUserProperty.area} label="Area." />
                <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert2} value= {InfoUser&&InfoUser.email} label="Correo" />
              <br /><br />
              <div align="right">
                <Button color="primary" type="submit" >Editar</Button>
                <Button onClick= {()=>abrirCerrarModalEditar()}> Cancelar</Button>
              </div>
            </div>
          </form>
        )
        
      const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
          console.log(e.target.files[0]);
          // setSelectedFilesPost(e.target.files[0])
        }
    };

        const onSubmitEditar2 = (e) => {

          e.preventDefault();
                peticionPost4()
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

        const bodyEditar2=(
          <form action="" onSubmit={onSubmitEditar2}>
            <div className={styles.modal}>
              <h3 className="my-5">Adjuntar Excel para su importaci??n</h3>
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

        

        const bodyEliminar=(
            <div className={styles.modal}>
              <p>Est??s seguro que deseas eliminar  <b>{info&&info.names}</b>? </p>
              <div align="right">
                <Button color="secondary" onClick={()=>peticionDelete()}>S??</Button>
                <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
        
              </div>
        
            </div>
          )

    return (
        <div>
            <div>
                <TitlePage titulo="Usuarios Propietarios" />
                
                {dataUser.roleId === "1"  ? 
                <div className="flex justify-between">
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
                :null}
                { loading ?  <Box sx={{ position: 'absolute' , left: 500, top:500, zIndex:1}}>
           
           <CircularProgress color="success" size={80}/>
           </Box> : null}

           {dataUser.roleId  === "1"  ?
             
                 <div className="mt-5 "><Table2 
                 title="" 
                 columns={customerTableHead} 
                 data={dataUsuarios}
             
                 actions= 
                 {
                   [
                     
                     {
                       icon:() =>                        
                 <Switch {...label} defaultChecked onChange={handleChangeSwitch} className="toggle-button"/>,
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
                
              ] 
            } 
 

                 /></div>
           : 
            <div className="mt-5 "><Table2 
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
             {dataUser.roleId === "1"  ? 
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
               {dataUser.roleId === "1"  ? 
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

export default Users
