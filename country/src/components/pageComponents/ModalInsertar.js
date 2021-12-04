import {Button, Modal, TextField} from '@material-ui/core';
import React, {useState} from 'react';

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
      transform: 'translate(-50%, -50%)'
    },
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '100%'
    }
  }));

const ModalInsertar = (props)=> {

    


    const styles= useStyles();

    const bodyInsertar=(
        <form action="" onSubmit={props.onSubmitInsertar}>
          <div className={styles.modal}>
            <h3 className="my-5">Agregar Nuevo Usuario</h3>
            { props.error ? <h4 className=" text-red-700">Completar todos los campos del formulario</h4> : null }
            <TextField className={styles.inputMaterial} name="names" onChange={props.handleChangeInsert} label="Nombre" />
            <br />
            <TextField className={styles.inputMaterial} name="lastname" onChange={props.handleChangeInsert} label="Apellido" />          
              <br />
              <TextField className={styles.inputMaterial} name="dni" onChange={props.handleChangeInsert} label="Doc. de Identidad" />
            <br />
              <TextField className={styles.inputMaterial} name="phone" onChange={props.handleChangeInsert} label="Teléfono" />
              <TextField className={styles.inputMaterial} name="mza" onChange={props.handleChangeInsert} label="Mz." />
              <TextField className={styles.inputMaterial} name="lte" onChange={props.handleChangeInsert} label="Lte." />
              <TextField className={styles.inputMaterial} name="email" onChange={props.handleChangeInsert} label="Correo" />
            <br /><br />
            <div align="right">
              <Button color="primary" type="submit" >Insertar</Button>
              <Button onClick= {props.functionShow}> Cancelar</Button>
            </div>
          </div>
        </form>
      )

    
    return (
        <div>      
            <Modal
        open={props.showmodalInsertar}
        onClose={props.functionShow}>
          {bodyInsertar}
        </Modal>
        </div>
    )
}

export default ModalInsertar
