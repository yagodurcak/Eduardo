import { Modal } from '@material-ui/core';
import React from 'react'

const ModalEditar2 = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showModalEditar2}
        onClose={props.functionShow}>
          {props.bodyEditar2}
        </Modal>
        </div>
    )
}

export default ModalEditar2
