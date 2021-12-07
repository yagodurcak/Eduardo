import { Modal } from '@material-ui/core';
import React from 'react'

const ModalEditar = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showModalEditar}
        onClose={props.functionShow}>
          {props.bodyEditar}
        </Modal>
        </div>
    )
}

export default ModalEditar
