import React, {createContext, useState} from 'react'

export const SeguridadContext = createContext()



const SeguridadProvider = (props) => {


    const [dataSeguridad, setdataSeguridad] = useState([]);

    return (
        <SeguridadContext.Provider value={{dataSeguridad, setdataSeguridad}}>

{props.children}

        </SeguridadContext.Provider>
    )

}

export default SeguridadProvider
