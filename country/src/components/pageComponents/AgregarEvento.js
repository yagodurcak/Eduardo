import React, {useState} from 'react'

import Datetime from 'react-datetime';
import Modal from "react-modal"

function AgregarEvento({isOpen, onClose, onEventAdded}) {
    const [title, setTitle] = useState("")
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())

    const onSubmit = (e) => {
        e.preventDefault()
        onEventAdded({
            title,
            start,
            end
        })
        onClose()
    }


    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <form action="" onSubmit={onSubmit}>
                <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                <div>
                    <label htmlFor="">Inicio</label>
                    <Datetime value={start} onChange={date => setStart(date)} />
                </div>
                <div>
                    <label htmlFor="">Final</label>
                    <Datetime value={end} onChange={date => setEnd(date)} />
                </div>
                <button>Reservar Espacio</button>
            </form>
        </Modal>
    )
}

export default AgregarEvento
