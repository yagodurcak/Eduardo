import { Modal } from '@material-ui/core';
import React from 'react'

const ModalAdd = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showModalAdd}
        onClose={props.functionShow}>
          {props.bodyAdd}
        </Modal>
        </div>
    )
}

export default ModalAdd
