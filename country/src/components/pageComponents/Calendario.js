import '../../pages/users/Users.css'
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import React, {useEffect, useRef, useState} from 'react'

import AgregarEvento from './AgregarEvento'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from 'axios'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import moment from "moment"
import timeGridPlugin from '@fullcalendar/timegrid';

// import "@fullcalendar/core/main.css";












// import timeGridPlugin from "@fullcalendar/timegrid";


function Calendario() {

    const [data, setdata] = useState([]);

    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null)


    const onEventAdded = event => {
        let calendarApi = calendarRef.current.getApi()
        calendarApi.addEvent({
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: event.title}
        )
    }

    const handleEventAdd = async (data) => {
        console.log((data.event));
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
      
        }
        axios.post("https://back2.tinpad.com.pe/public/api/reservation", {
            start: moment(data.event.start).format('YYYY-MM-DD HH:MM:SS'),
            end: moment(data.event.end).format('YYYY-MM-DD HH:MM:SS'),
            title: data.event.title}, {headers})
    }

    const buscarCotizacion = async() => {

              
        const url = `https://back2.tinpad.com.pe/public/api/reservation`;
  
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        }
  
        const rtdo = await axios.get(url, {headers})
        
        console.log(rtdo.data.data);
        setdata(rtdo.data.data)
    }

    useEffect(() => {
        buscarCotizacion()
        console.log(data);

      
      }, []);


    return (
        <div>
            <button onClick={()=> setModalOpen(true)}>Agregar Evento</button>
            <div className='FullCalendar'>
                <FullCalendar
                ref={calendarRef}
                events={data}
                plugins={[dayGridPlugin]}
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                      }}
                    defaultView="dayGridMonth"
                    eventAdd={event=>handleEventAdd(event)}
                    // datesSet={(date )=> handleDateSet(date)}
                />
            </div>

            <AgregarEvento isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/>
        </div>
    )
}

export default Calendario
