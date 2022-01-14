// import './App.css';

import {Button, Modal, TextField} from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table'
import axios from "axios"

function Energia() {
 
  const [data, setData] = useState([])
  const [consume, setconsume] = useState(0);


  const url = `https://back2.tinpad.com.pe/public/api/property-user`;
  const buscarCotizacion = async() => {
      

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

    }


    const rtdo = await axios.get(url, {headers})

    console.log(rtdo.data.data);
    setData(rtdo.data.data)

}
useEffect(() => {
  buscarCotizacion()
 

}, []);

   
  
  const columns = [
    { title: "Propietario",   render: data => data.user.name + " "+ data.user.lastName },
    {
      title: "Documento", render: data => data.user.document

    },
    { title: "Manzana", render: data => data.property.block },
    {
      title: "Lote", render: data => data.property.lot 

    },
    {
      title: "Consumo (kw)", field: "calories",
      render: data =>    <TextField
      // style={{ width: "8rem" }}
      onChange={(e) =>setconsume(e.target.value)}
      name="calories"
      // value={data.calories}
      />,
      // validate: rowData => rowData.consume === undefined || rowData.consume === "" ? "Required" : true 
    },
    {
      title: "Consumo (kw)", field: "consume",
      validate: rowData => rowData.consume === undefined || rowData.consume === "" ? "Required" : true 
    },
    {
      title: "Cobranza", field: "transactionCost",
      validate: rowData => rowData.transactionCost === undefined || rowData.transactionCost === "" ? "Required" : true
    }
    // {
    //   title: "Total", field: 'total',
    //   render: data => parseFloat((parseInt(data.property.area)/ totalArea  ) * 100).toFixed(2)   
    //  }
    // ]
  ]
  return (
    <div className="">
      <h1 align="center">React-App</h1>
      <h4 align='center'>CRUD operation with Json-Server (with Validation) in Material Table</h4>
      <MaterialTable
        title="Student Details"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd:  (newData) => new Promise((resolve, reject) => {
            //Backend call
      
              const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
          
            }
                 axios.post("https://back2.tinpad.com.pe/public/api/light-expenditure", JSON.stringify(newData), {headers})
                .then(response=>{
                  // setdata(data.concat(response.data));
                  // abrirCerrarModalInsertar();
                  resolve()
                }).catch(error=>{
                  console.log(error);
                })
      
                buscarCotizacion()
             
                
             
          }),
          onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
            //Backend call
            const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        
          }
           const info= {
             propertyId: parseInt(oldData.propertyId) ,
             consume: newData.consume,
             unitCost: 10,
             transactionCost: newData.transactionCost,
             unit:"kw"
           }
             axios.post("https://back2.tinpad.com.pe/public/api/light-expenditure",  info , {headers: headers})
            .then(response=>{
  
              resolve()
            }).catch(error=>{
              console.log(error);
            })
            setTimeout(() => {
              buscarCotizacion()
            }, 3000);
           

          }),
          onRowDelete: (oldData) => new Promise((resolve, reject) => {

            const headers = {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        
          }
             axios.delete("https://back2.tinpad.com.pe/public/api/employe"+"/"+oldData.id, {headers}) 
            .then(response=>{
              // setdata(data.filter(artista=>artista.id!==info.id));
              resolve()
            }).catch(error=>{ 
              console.log(error);
            })
            setTimeout(() => {
              buscarCotizacion()
            }, 3000);
         
          })
        }}
      />
    </div>
  );
}

export default Energia;
