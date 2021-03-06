import '../../pages/users/Users.css'
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import React, {useContext, useEffect, useRef, useState} from 'react';

import AgregarEvento from './AgregarEvento'
import {CalendarioContext} from '../../context/CalendarioContext';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import axios from 'axios'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import moment from "moment"
import timeGridPlugin from '@fullcalendar/timegrid';
import { userContext } from '../../context/UserContext';

function Calendario() {

    const [data, setdata] = useState([]);
    const { dataCalendario, setdataCalendario } = useContext(CalendarioContext);

    const [data1, setdata1] = useState([{
        id:"21",
        end: "2022-02-11 12:02:00",
        start: "2022-02-11 12:02:00",
        description: "hola",
    title:"Juego de diversión para niños",
    extendedProps: {
        department: 'BioChemistry'
      },
      description: 'Lecture'}
    ]);

    const [modalOpen, setModalOpen] = useState(false)
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null)
    const { dataUser, setdataUser } = useContext(userContext);




    const buscarCotizacion = async() => {

              
        const url = `https://back2.tinpad.com.pe/public/api/reservation`;
  
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),
        }
  
        const rtdo = await axios.get(url, {headers})
        setdataUser(JSON.parse(localStorage.getItem('user')))
        console.log(rtdo.data.data);
        setdataCalendario(rtdo.data.data)
    }

    useEffect(() => {
        
        if (dataCalendario.length === 0) {

            console.log(dataCalendario.length);
            buscarCotizacion()
            
        }else{
            console.log(dataCalendario.length);
            return
        }
    }, []);

     

    return (
        <div>
            <button onClick={()=> setModalOpen(true)}>Agregar Evento</button>
            <div className='FullCalendar' >
                <FullCalendar 
                locale={esLocale}
                ref={calendarRef}
                events={dataCalendario}
   
                eventClick={
                    function(arg){
                        let data2 = ((data).filter(artista=> artista.id === parseInt(arg.event.id) ))
                        let data3 = data2[0]
                        console.log(data3);
                      alert(
                          'Propietario: ' + data3.user.name + " " + data3.user.lastName +  '.\n' +
                          "Espacio: " + data3.title + '.\n'+ 
                      "Comienza: " + moment(data3.start).format('DD-MM-YYYY HH:MM')  + '.\n'+
                      "Termina: " + moment(data3.end).format('DD-MM-YYYY HH:MM')  + '.\n'
      
                      
                      )
                      
                        
                    }
                  }
                plugins={[ dayGridPlugin, listPlugin ]}                
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                  }}
                    defaultView="dayGridMonth"
                    // eventAdd={event=>handleEventAdd(event)}
                    // datesSet={(date )=> handleDateSet(date)}
                />
            </div>

            {/* <AgregarEvento isOpen={modalOpen} onClose={()=> setModalOpen(false)} onEventAdded={event => onEventAdded(event)}/> */}
        </div>
    )
}

export default Calendario
