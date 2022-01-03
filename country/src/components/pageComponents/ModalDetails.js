import { Modal } from '@material-ui/core';
import React from 'react'

const ModalDetails = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showModalDetails}
        onClose={props.functionShow}>
          {props.bodyDetails}
        </Modal>
        </div>
    )
}

export default ModalDetails
