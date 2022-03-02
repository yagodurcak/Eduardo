import React, {createContext, useState} from 'react'

export const CalendarioContext = createContext()



const CalendarioProvider = (props) => {


    const [dataCalendario, setdataCalendario] = useState([]);

    return (
        <CalendarioContext.Provider value={{dataCalendario, setdataCalendario}}>

{props.children}

        </CalendarioContext.Provider>
    )

}

export default CalendarioProvider
