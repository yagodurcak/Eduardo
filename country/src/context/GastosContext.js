import React, {createContext, useState} from 'react'

export const GastosContext = createContext()



const GastosProvider = (props) => {


    const [dataGastos, setdataGastos] = useState([]);

    return (
        <GastosContext.Provider value={{dataGastos, setdataGastos}}>

{props.children}

        </GastosContext.Provider>
    )

}

export default GastosProvider
