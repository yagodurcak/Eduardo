


// falta loi de mail en editar

import "../users/Users.css";

import {Button, Modal, TextField} from '@material-ui/core';
import {
    Link,
    NavLink,
} from "react-router-dom";
import React, {useContext, useEffect, useState} from 'react';

import $ from "jquery";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import DatePicker from "react-datepicker";
import { Day } from "@material-ui/pickers";
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import { TableCell } from '@mui/material';
import TitlePage from '../../components/pageComponents/TitlePage';
import XLSX from 'xlsx'
import axios from "axios"
import { format } from 'date-fns'
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


  
  

  function Energia() {

      
    const [data, setdata] = useState([]);
    const [data2, setdata2] = useState([]);
    const [data3, setdata3] = useState([]);
    const [data4, setdata4] = useState([]);
const [base, setBase] = useState(0);
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
    const [startDate, setStartDate] = useState(new Date());
    const [year,setYear]=useState('all')
    const { dataUser, setdataUser } = useContext(userContext);
    const [filteredData,setFilteredData]=useState([])
    const [filteredData2,setFilteredData2]=useState([])
    const [linkEncode, setlinkEncode] = useState("");
    
const [exito, setExito] = useState(false);
    const [info, setInfo] = useState({
        
        // propertyId: "",
        
        consume: "",
        
        // unitCost: "",
        transactionCost: "0"
        
    })
    const [info2, setInfo2] = useState({
        
        // propertyId: "",
        
        consume: "",
        date:format(new Date(), "yyyy/MM/dd"),
        amount:""
        
      
        
    })
    const customerTableHead2 = [


      {
          title:"Id de Propiedad",
          field: "id"
      },
      {
          title:"Nombre",
          field: "nombre"
      },
      {
          title:"Apellido",
          field: "apellido"
      },
      {
          title:"DNI",
          field: "documento"
      },
      {
          title:"Consumo kw",
          field: "consume"
      },
        {
            title:"Fecha",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            field: 'date',
       
            render: data => fecha  
        }
      ]
    
    const customerTableHead = [
    
        {
            title:"Propietario",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            field: 'name',
            render: data => {for (let i = 0; i < data.property.users.length; i++) {
              return data.property.users[i].name + " " + data.property.users[i].lastName
              
            }   }
          },

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
            render: data => data.property.block     },
        {
            title:"Lte.",
                            cellStyle: {
        minWidth: 10,
        maxWidth: 10
      },
      render: data => data.property.lot    
        },
        {
            title:"Fecha",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
            field: 'date',
       
            render: data => fecha  
        },
        {
            title:"Consumo (KW)",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50

       
      },
      render: data => data.consume
      // render: data => {for (let i = 0; i <data.light_expenditures.length; i++) {

      //   if (data.light_expenditures[i].date === (data2[data2.length - 1].date)) {
      //     setBase(data.light_expenditures[i].consume)
      //     return parseInt(data.light_expenditures[i].consume) 
      //   } 

        
      // }   } 

        
      
      
      }
        ,  {
          title:"SubTotal",
                          cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
      render: data => parseFloat(data.consume* unitCost).toFixed(2)
       
            
          
      },
        {
            title:"Cobranza(S/)",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
      render: data => parseInt(data3.amount) 
          },
        {
            title:"Total",
                            cellStyle: {
        minWidth: 50,
        maxWidth: 50
      },
      render: data => parseFloat(data.consume* unitCost + parseFloat(data3.amount) ).toFixed(2)
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
      }, 4000);

      const url = `https://back2.tinpad.com.pe/public/api/property-user`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }

      const rtdo = await axios.get(url, {headers})
      const rtdo2 = rtdo.data.data
     const rtdo3=  rtdo2.map(obj=> ({ id:obj.propertyId, nombre: obj.user.name, apellido: obj.user.lastName, documento: obj.user.document , consumo: 0}))
      
      console.log(rtdo3);
      setdata(rtdo3)    
      setdataUser(JSON.parse(localStorage.getItem('user')))

  }
    const buscarFecha = async() => {

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
      const rtdo2 = rtdo.data.data
    //  const rtdo3=  rtdo2.map(obj=> ({ ...obj, consume: 0, transactionCost: 0 }))
      
      console.log(rtdo2);
      setdata4(rtdo2)    
    

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
  
     
      console.log(rtdo2);
      setdata2(rtdo2)    


  }

    const buscarCobranza = async() => {


      const url = `https://back2.tinpad.com.pe/public/api/collection-expense`;

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      }

      const rtdo = await axios.get(url, {headers})
      const rtdo2 = (rtdo.data.data).filter(artista=> artista.id === 4)
  
     
      console.log(rtdo2[0]);
      setdata3(rtdo2[0]);  

  }


  
const fechaActual = new Date
const fechaActual1 = moment(fechaActual).format("YYYY-MM")
const fechaActual2 = moment(fechaActual).format("YYYY-MM-DD")

useEffect(() => {
  setFilteredData(data4.filter(dt=>dt.date.slice(0, 7) === fechaActual1))
  console.log(fechaActual1);
}, [data4])

useEffect(() => {
  setFilteredData2(data2.filter(dt=>dt.date.slice(0, 7) === fechaActual1))
  // console.log(fechaActual1);
}, [data2])


useEffect(() => {
 
  console.log("date");
   setYear(moment(startDate).format("YYYY-MM"))
  }, [startDate])

  useEffect(()=>{
    setFilteredData(data4.filter(dt=>dt.date.slice(0, 7) === year))
    setFilteredData2(data2.filter(dt=>dt.date.slice(0, 7) === year))
    console.log(year);
   
      },[year])
      
  const SaveData = () => {
    if (filteredData2.length > 0) {
    
      setFecha((filteredData2[filteredData2.length - 1].date).split(" ")[0].split("-").reverse().join("-"))
      setTotalAmount(filteredData2[filteredData2.length - 1].amount)
      setunitCost(filteredData2[filteredData2.length - 1].consume)
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
   buscarFecha()
 
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
          buscarTotalLight()
          buscarCotizacion()
        }

        const peticionPost=async(e)=>{
          console.log("post2");
     
          const f = new FormData()   
        
        
          
          console.log(info);
          // console.log(selectedFilesPost.length > 0);
            
                  // if (selectedFilesPost) {
                    
          f.append("file", selectedImage)
                  // }
        
        
              // f.append("propertyId", info.id)
              // f.append("date", (fechaActual2))
              // f.append("consume", info.consume)
              // f.append("unitCost", unitCost)
              // f.append("transactionCost", data3.amount )
              // f.append("unit","kw" )
         
  
  
         
        
            const headers = {
              'Content-type': 'multipart/form-data',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        
          }
        
            const url1= "https://back2.tinpad.com.pe/public/api/import-light-expenditures"
              await axios.post(url1, f, {headers})
              .then(response=>{
                // setdata(data.concat(response.data));
                // abrirCerrarModalInsertar();
        
                
                console.log("exito -1");
                setExito(!exito)
              }).catch(error=>{
                console.log(error);
                setSelectedImage()
              })
        
          // console.log(filesImg);
     
          }
          useEffect(() => {
            setTimeout(() => {
              console.log("fecha");
              buscarFecha()
            }, 3000);
             }, [exito]);
       
       


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

        if (consume.trim() === ""||amount.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost2()
            setInfo2({
              consume: "",
              date:fechaActual2,
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
        setTimeout(() => {
          SaveData()
        }, 2000);
        
    }
    const onSubmitEditar = (e) => {

      e.preventDefault();       

            peticionPost()
            // window.location.reload();
            // setTimeout(() => {
            //   window.location.reload();
            // }, 2000);
            abrirCerrarModalEditar()
            setSelectedImage()
        }

    
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

      const abrirCerrarModalEditar=()=>{
        setShowModalEditar(!showModalEditar);
        setSelectedImage()
      }
      const abrirCerrarModalEliminar=()=>{
        setShowModalEliminar(!showModalEliminar);
      }

      function fnExcelReport()
			{

        setlinkEncode(encodeURIComponent(tab_text))
				var todayDate = new Date().toISOString().slice(0, 10);

				var utf = "<meta http-equiv='content-type' content='application/vnd.ms-excel; charset=UTF-8' > ";
				var name_file = "<head><meta name='content-disposition' content='inline; filename=filename.xls'><head>";
			    var tab_text=name_file+ utf+ "<table border='2px'><tr bgcolor='#87AFC6'>";
			    var textRange; var j=0;	


			    var link = document.getElementById('link');
		        
		     var tab_text=  "<table border='2px'>"+
         "<tr>"+
             "<th rowspan='2'>id</th>"+
             "<th rowspan='2'>nombre</th>"+
             "<th rowspan='2'>documento</th>"+
             "<th rowspan='2'>consumo</th>"+
         "</tr><table/>"; 
			    // link.href='data:application/vnd.ms-excel,' + encodeURIComponent(tab_text);
			    // link.download='Reporte_Detallado_De_Documentos_Por_Vencer '+todayDate+'.xls';
			    // link.click();
          console.log(encodeURIComponent(tab_text));
			 
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
              
              {/* <label htmlFor="">Fecha de factura*</label>
              <br /> */}
              {/* <br />
              <input type="date" className={styles.inputMaterial} name="date" onChange={handleChangeInsert2} label="Fecha de factura*"  /> */}

              
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {abrirCerrarModalInsertar}> Cancelar</Button>
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

      const bodyEditar=(
        <form action="" onSubmit={onSubmitEditar}>
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

     
      const downloadExcel=()=>{
        const newData=data.map(row=>{
          delete row.tableData
          return row
        })
        const workSheet=XLSX.utils.json_to_sheet(newData)
        const workBook=XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook,workSheet,"students")
        //Buffer
        let buf=XLSX.write(workBook,{bookType:"xlsx",type:"buffer"})
        //Binary string
        XLSX.write(workBook,{bookType:"xlsx",type:"binary"})
        //Download
        XLSX.writeFile(workBook,"StudentsData.xlsx")
  
  
      }

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
          <div className="pickFecha mt-10 ">
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
          </div>
          <div className="flex justify-between mt-16">
          <button className="btn" onClick={()=>downloadExcel()}>
              Descargar Plantilla
            </button>
          
     

            <button className="btn" onClick={()=>abrirCerrarModalEditar()}>
              Importar PLantilla
            </button>
            <div>

              <div className="flex justify-end mt-1 text-gray-400">

                <button className="btn" onClick={() => abrirCerrarModalInsertar()}>
                  Agregar gasto
                </button>
              </div>
              <div className="flex justify-end mt-1 text-gray-400">
                {/* render: data => (data.publicationDate).split(" ")[0].split("-").reverse().join("-") */}
                {filteredData2.length > 0 ? <h3>Fecha: {fecha} </h3>
                  :
                  null
                }
              </div>
               

                 <div className="flex justify-end mt-1 text-gray-400">
                {filteredData2.length > 0 ?    <div className="flex justify-end mt-1 text-gray-400">

<h3>Total de gastos: $ {totalAmount}</h3>

</div> 
                :
                 null
                 }  
                 </div> 

<div className="flex justify-end mt-1 text-gray-400">
                {filteredData2.length > 0 ?    <div className="flex justify-end mt-1 text-gray-400">

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



           <div className="mt-10 datagrid"><Table2 
                 title="" 
                 columns={customerTableHead2} 
                 data={data}
              
                 /></div>

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

export default Energia
