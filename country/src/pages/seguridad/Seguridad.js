


// falta loi de mail en editar

import "../users/Users.css"

import { Button, Modal, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ModalEditar from '../../components/pageComponents/ModalEditar';
import ModalEditar2 from '../../components/pageComponents/ModalEditar2';
import ModalEliminar from '../../components/pageComponents/ModalEliminar';
import ModalInsertar from "../../components/pageComponents/ModalInsertar"
import {SeguridadContext} from '../../context/SeguridadContext';
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from "axios"
import excel from "../../IMG/template_user_condominio.xlsx";
import { makeStyles } from '@material-ui/core/styles';
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
  iconos: {
    cursor: 'pointer'
  },
  inputMaterial: {
    width: '100%'
  }
}));


const customerTableHead = [

  {
    title: "Nombres",
    field: "name"
  },
  {
    title: "Apellidos",
    field: "lastName"
  },
  {
    title: "Doc. de Identidad",
    field: "document"
  },
  {
    title: "Role",

    render: data => data.role.name

  }
]



function Seguridad() {

  const [data, setdata] = useState([]);
  const [showModalInsertar, setShowModalInsertar] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false);
  const [showModalEditar2, setShowModalEditar2] = useState(false);
  const [showModalEliminar, setShowModalEliminar] = useState(false);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const { dataSeguridad, setdataSeguridad } = useContext(SeguridadContext);

  const { dataUser, setdataUser } = useContext(userContext);
  const [info, setInfo] = useState({
    id: "",
    name: "",
    lastName: "",
    document: "",
    email: "",
    phone: "0000",
    password: "12345678",
    password_confirmation: "12345678",
    roleId: "2"

  })



  const { document, lastName, name, email } = info;

  const baseUrl = "https://back2.tinpad.com.pe/public/api/user";
  const handleChangeInsert = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    })

  }


  const peticionPost2 = async (e) => {

    console.log("post2");

    const f = new FormData()


    f.append("file", selectedImage)

    const headers = {
      'Content-type': 'multipart/form-data',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

    }

    const url1 = "https://back2.tinpad.com.pe/public/api/import-user"
    await axios.post(url1, f, { headers })
      .then(response => {
        // setdata(data.concat(response.data));
        // abrirCerrarModalInsertar();


        console.log("exito -1");

      }).catch(error => {
        console.log(error);
        setSelectedImage()
      })

    // console.log(filesImg);

  }

  const seleccionarUser = (user, caso) => {
    setInfo(user);
    console.log(user);
    (caso === "Editar") ? abrirCerrarModalEditar()
      :
      abrirCerrarModalEliminar()
  }

  const buscarProperty = async () => {

    const url = `https://back2.tinpad.com.pe/public/api/user`;

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

    }

    const rtdo = await axios.get(url, { headers })

    // console.log(rtdo.data.data[0]);

    setdataUser(JSON.parse(localStorage.getItem('user')))
    setdataSeguridad((rtdo.data.data).filter(artista => artista.roleId !== "3"));


    console.log(rtdo.data.data);
  }
  useEffect(() => {

    if (dataSeguridad.length === 0) {

      console.log(dataSeguridad.length);
      buscarProperty()
      
  }else{
      console.log(dataSeguridad.length);
      return
  }

  }, []);



  // const buscarProperty = async () => {

  //   const url = `https://back2.tinpad.com.pe/public/api/user`;

  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

  //   }

  //   const rtdo = await axios.get(url, { headers })

  //   // console.log(rtdo.data.data[0]);


  //   setdata((rtdo.data.data).filter(artista => artista.roleId !== "3"));


  //   console.log("buscar property");

  // }



  const peticionPost = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

    }
    await axios.post("https://back2.tinpad.com.pe/public/api/register", info, { headers })
      .then(response => {
        // setdata(data.concat(response.data));
        abrirCerrarModalInsertar();
      }).catch(error => {
        console.log(error);
      })
    buscarProperty()
  }


  const peticionDelete = async () => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

    }
    await axios.delete(baseUrl + "/" + info.id, { headers }, info)
      .then(response => {
        // setdata(data.filter(artista=>artista.id!==info.id));
        abrirCerrarModalEliminar();
      }).catch(error => {
        console.log(error);
      })
    buscarProperty()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }

  const peticionPut = async () => {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('Authorization'),

    }
    await axios.put("https://back2.tinpad.com.pe/public/api/user" + "/" + info.id, info, { headers: headers })
      .then(response => {

        abrirCerrarModalEditar();

      }).catch(error => {
        console.log(error);
      })
    buscarProperty()
  }




  const onSubmitInsertar = (e) => {

    e.preventDefault();

    if (document.trim() === "" || lastName.trim() === "" || name.trim() === "" || email.trim() === "") {

      setError(true);
      return
    } else {
      setError(false);

      peticionPost()
      setInfo({
        id: "",
        name: "",
        lastName: "",
        document: "",
        email: "",
        phone: "0000",
        password: "12345678",
        password_confirmation: "12345678",
        roleId: "2"


      });

      // set1
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      // abrirCerrarModalInsertar()
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);

  }
  const onSubmitEditar = (e) => {

    e.preventDefault();
    peticionPut()
    // window.location.reload();
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2000);
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);

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


  const abrirCerrarModalInsertar = () => {

    setShowModalInsertar(!showModalInsertar)
  }

  const abrirCerrarModalEditar = () => {
    setShowModalEditar(!showModalEditar);
  }
  const abrirCerrarModalEditar2 = () => {
    setShowModalEditar2(!showModalEditar2);
  }
  const abrirCerrarModalEliminar = () => {
    setShowModalEliminar(!showModalEliminar);
  }
  const styles = useStyles();

  const gustos = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Seguridad' },
    { value: '4', label: 'Aprobador' }
  ]

  const bodyInsertar = (
    <form action="" onSubmit={onSubmitInsertar}>
      <div className={styles.modal}>
        <h3 className="my-5">Agregar Nuevo Usuario</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
        <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} label="Nombres*" />
        <br />
        <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert} label="Apellidos*" />
        <br />
        <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert} label="Doc. de Identidad*" />
        <br />
        <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} label="Email*" />
        <br />

        <select name="roleId" className="mt-4" onChange={handleChangeInsert}>

          <option value=""> Seleccione rol de usuario</option>
          {gustos.map(fbb =>
            <option key={fbb.value} value={fbb.value}>{fbb.label}</option>
          )};
        </select>


        {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}
        {/* <input type="text" className={styles.inputMaterial} name="role" value="2" className="hide" onChange={handleChangeInsert}/> */}


        <br /><br />
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
        <h3 className="my-5">Registrar usuario nuevo</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}
        <TextField className={styles.inputMaterial} name="name" onChange={handleChangeInsert} value={info && info.name} label="Nombre" />
        <br />
        <TextField className={styles.inputMaterial} name="lastName" onChange={handleChangeInsert} value={info && info.lastName} label="Apellido" />
        <br />
        <TextField className={styles.inputMaterial} name="document" onChange={handleChangeInsert} value={info && info.document} label="Doc. de Identidad" />
        <br />
        <TextField className={styles.inputMaterial} name="email" onChange={handleChangeInsert} value={info && info.email} label="Doc. de Identidad" />
        <br />

        <br /><br />
        <div align="right">
          <Button color="primary" type="submit" >Editar</Button>
          <Button onClick={() => abrirCerrarModalEditar()}> Cancelar</Button>
        </div>
      </div>
    </form>
  )

  const bodyEliminar = (
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar  <b>{info && info.name}</b>? </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>Sí</Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>

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

  const bodyEditar2 = (
    <form action="" onSubmit={onSubmitEditar2}>
      <div className={styles.modal}>
        <h3 className="my-5">Adjuntar Excel para su importación</h3>
        {error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null}
        {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
        {error ? <h4 className=" text-red-700">Completar todos los campos (*) del formulario</h4> : null}
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
          <Button onClick={abrirCerrarModalEditar2}> Cancelar</Button>
        </div>
      </div>
    </form>
  )



  return (
    <div>
      <div>
        <TitlePage titulo="Usuarios Autorizados" />
        {dataUser.roleId === "1" &&
          <div className="flex justify-between ">
            <button className="btn" >
              {/* <Link to="../../IMG/Pagos 1gastos.svg" target="_blank" download>Descagar Plantilla</Link> */}
              <a className="enlace" href={excel} download>Descagar Plantilla</a>

            </button>
            <button className="btn" onClick={() => abrirCerrarModalEditar2()}>
              Importar Plantilla
            </button>
            <button className="btn" onClick={() => abrirCerrarModalInsertar()}>
              Agregar Manualmente
            </button>

          </div>}
        {loading ? <Box sx={{ position: 'absolute', left: 500, top: 500, zIndex: 1 }}>

          <CircularProgress color="success" size={80} />
        </Box> : null}

        {dataUser.roleId === "1" ?


          <div className="mt-10"><Table2
            title=""
            columns={customerTableHead}
            data={dataSeguridad}
            actions={[

              {
                icon: () => <i class="material-icons edit">edit</i>,
                tooltip: "Editar",
                onClick: (event, rowData) => seleccionarUser(rowData, "Editar")
              },
              {
                icon: () => <i class="material-icons delete">highlight_off</i>,
                tooltip: "Eliminar",
                // onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")   
                onClick: (event, rowData) => seleccionarUser(rowData, "Eliminar")
              }

            ]}

          /></div>
          : <div className="mt-10"><Table2
            title=""
            columns={customerTableHead}
            data={data}


          /></div>}
      </div>
      <ModalInsertar
        showmodalInsertar={showModalInsertar}
        functionShow={abrirCerrarModalInsertar}
        handleChangeInsert={handleChangeInsert}
        onSubmitInsertar={onSubmitInsertar}
        error={error}
        bodyInsertar={bodyInsertar}


      />
      <ModalEditar
        showModalEditar={showModalEditar}
        functionShow={abrirCerrarModalEditar}
        handleChangeInsert={handleChangeInsert}
        onSubmitEditar={onSubmitEditar}
        info={info}
        bodyEditar={bodyEditar}
      />
      <ModalEditar2
        showModalEditar2={showModalEditar2}
        functionShow={abrirCerrarModalEditar2}
        handleChangeInsert={handleChangeInsert}
        onSubmitEditar={onSubmitEditar}
        info={info}
        bodyEditar2={bodyEditar2}
      />
      <ModalEliminar
        showModalEliminar={showModalEliminar}
        abrirCerrarModalEliminar={abrirCerrarModalEliminar}
        onSubmitEditar={onSubmitEditar}
        info={info}
        peticionDelete={peticionDelete}
        bodyEliminar={bodyEliminar}
      />
    </div>
  )
}

export default Seguridad
