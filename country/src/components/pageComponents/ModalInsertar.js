import {Button, Modal, TextField} from '@material-ui/core';
import React, {useState} from 'react';

const ModalInsertar = (props)=> {

       
    return (
        <div>      
            <Modal
        open={props.showmodalInsertar}
        onClose={props.functionShow}>
          {props.bodyInsertar}
        </Modal>
        </div>
    )
}

export default ModalInsertar
