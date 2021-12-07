import {Button, Modal, TextField} from '@material-ui/core';
import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';

const ModalEliminar = (props)=> {    




    

    
    return (
        <div>      
        <Modal
        open={props.showModalEliminar}
        onClose={props.abrirCerrarModalEliminar}>
          {props.bodyEliminar}
        </Modal>
        </div>
    )
}

export default ModalEliminar
