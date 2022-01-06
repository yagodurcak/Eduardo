import { Modal } from '@material-ui/core';
import React from 'react'

const ModalRespuestaQueja = (props)=> {
    
    return (
        <div>      
            <Modal
        open={props.showModalRespuestaQueja}
        onClose={props.functionShow}>
          {props.bodyRespuestaQueja}
        </Modal>
        </div>
    )
}

export default ModalRespuestaQueja
