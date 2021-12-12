import {Button, Modal, TextField} from '@material-ui/core';
import React, {useState} from 'react';

import {makeStyles} from '@material-ui/core/styles';

const ModalMostrar = (props)=> {    

    return (
        <div>      
        <Modal
        open={props.showModalMostrar}
        onClose={props.abrirCerrarModalMostrar}>
          {props.bodyMostrar}
        </Modal>
        </div>
    )
}

export default ModalMostrar
