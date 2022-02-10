import React, {createContext, useEffect, useState} from 'react'

import axios from "axios"

export const CondoContext = createContext()



const CondoProvider = (props) => {

    const [dataCondo, setDataCondo] = useState([]);


  

    return (
        <CondoContext.Provider value={{dataCondo, setDataCondo}}>

{props.children}

        </CondoContext.Provider>
    )

}

export default CondoProvider
