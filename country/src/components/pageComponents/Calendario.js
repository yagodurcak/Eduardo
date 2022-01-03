import '../../pages/users/Users.css'

import React, {useRef, useState} from 'react'

import AgregarEvento from './AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from 'axios'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

function Calendario() {

    const [modalOpen, setModalOpen] = useState(false)
    const calendarRef = useRef(null)
    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent(event)
    }

    const handleEventAdd = async (data) => {
        axios.post("/api/calendar/create", data.event)
    }

    return (
        <div>
            <button onClick={()=> setModalOpen(true)}>Agregar Evento</button>
            <div className='FullCalendar'>
                <FullCalendar
                ref={calendarRef}
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    eventAdd={event=>handleEventAdd(event)}
                />
            </div>

            <AgregarEvento isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </div>
    )
}

export default Calendario
