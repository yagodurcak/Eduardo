import './Users.css'

import React,{useEffect, useState}  from 'react';

import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"

const customerTableHead = [
    {
        title:"Id",
        field: "id",       
       
    },
    {
        title:"Nombres",
        field: "names"
    },
    {
        title:"Apellidos",
        field: "lastname"
    },
    {
        title:"Doc. de Identidad",
        field: "dni"
    },
    {
        title:"Teléfono",
        field: "phone"
    },
    {
        title:"Mz.",
        field: "mza"
    },
    {
        title:"Lte.",
        field: "lte"
    },
    {
        title:"Correo",
        field: "email"
    }
]


function Users() {

    const [data, setdata] = useState([]);
    const [showModalInsertar, setShowModalInsertar] = useState(false);
    const [showModalEditar, setShowModalEditar] = useState(false);
    const [info, setInfo] = useState({
        dni: "",
        email: "",
        lastname: "",
        lte: "",
        mza: "",
        names: "",
        phone: ""
    })

    const [error, setError] = useState(false)
   

    const{dni, lastname, lte, mza, phone, names} = info;
  
    const baseUrl="http://localhost:3001/Users";
    const handleChangeInsert = (e) => {

        
        
        setInfo({
            ...info,
            [e.target.name]: e.target.value
        })
    }

    // const handleChangeEdit = (e) => {
    //         setInfo({
    //         ...info,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const seleccionarUser=(user, caso)=>{
        setInfo(user);
        (caso==="Editar")&&abrirCerrarModalEditar()
        console.log(user);
 
      }

    const traerFrase = async () => {
        const api = await fetch(baseUrl);
        const frase = await api.json()
        console.log(frase[0]);
        setdata(frase)
    }

    const peticionPost=async()=>{
        await axios.post(baseUrl, info)
        .then(response=>{
          setdata(data.concat(response.data));
          abrirCerrarModalInsertar();
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
              artista.names=info.names;
              artista.lastname=info.lastname;
              artista.dni=info.dni;
              artista.lte=info.lte;
              artista.mza=info.mza;
              artista.email=info.email;
              artista.phone=info.phone;
  
            }
          });
          setdata(dataNueva);
          abrirCerrarModalEditar();
        }).catch(error=>{
          console.log(error);
        })
      }

    const onSubmitInsertar = (e) => {

        e.preventDefault();

        if (dni.trim() === "" || lastname.trim() === "" ||names.trim() === "" ||lte.trim() === "" ||mza.trim() === "" ) {
        
         setError(true);
         return
        }else {
            setError(false);

            peticionPost()
            setInfo({
                dni: "",
                email: "",
                lastname: "",
                lte: "",
                mza: "",
                names: "",
                phone: ""
            });
            // abrirCerrarModalInsertar()
        }
        
    }
    const onSubmitEditar = () => {

            peticionPut()
           
        }
        
    
    
    useEffect(() => {
        traerFrase()
    }, [])

    
    const abrirCerrarModalInsertar = () => {
          
        setShowModalInsertar(!showModalInsertar)
      }

      const abrirCerrarModalEditar=()=>{
        setShowModalEditar(!showModalEditar);
      }

    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Usuarios Propietarios" />
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
                        icon:() => <i class="material-icons edit">edit</i>,
                        tooltip:"Editar",
                        onClick: (event, rowData) => seleccionarUser(rowData, "Editar") 
                    },
                    {
                        icon:() => <i class="material-icons delete">highlight_off</i>,
                        tooltip:"Eliminar",
                        onClick: (event, rowdata) => alert("¿Quiere eliminar al usuario:  " + rowdata.artista + "?")   
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
           
            
            />
            <ModalEditar
            showModalEditar={showModalEditar}
            functionShow= {abrirCerrarModalEditar}
            handleChangeInsert={handleChangeInsert}
            onSubmitEditar={onSubmitEditar}
            // error={error}
           
            
            />
        </div>
    )
}

export default Users
