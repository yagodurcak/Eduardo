import React, {createContext, useState} from 'react'

export const TramitesContext = createContext()



const TramitesProvider = (props) => {


    const [dataTramites, setdataTramites] = useState([]);

    return (
        <TramitesContext.Provider value={{dataTramites, setdataTramites}}>

{props.children}

        </TramitesContext.Provider>
    )

}

export default TramitesProvider
