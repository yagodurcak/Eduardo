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

  const ModalEliminar = (props)=> {    



    const styles= useStyles();

    const bodyEliminar=(
        <div className={styles.modal}>
          <p>Estás seguro que deseas eliminar al artista <b>{props.info&&props.info.names}</b>? </p>
          <div align="right">
            <Button color="secondary" onClick={()=>props.peticionDelete()}>Sí</Button>
            <Button onClick={()=>props.abrirCerrarModalEliminar()}>No</Button>
    
          </div>
    
        </div>
      )
    

    
    return (
        <div>      
        <Modal
        open={props.showModalEliminar}
        onClose={props.abrirCerrarModalEliminar}>
          {bodyEliminar}
        </Modal>
        </div>
    )
}

export default ModalEliminar
