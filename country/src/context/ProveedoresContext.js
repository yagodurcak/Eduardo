import React, {createContext, useState} from 'react'

export const ProveedoresContext = createContext()



const ProveedoresProvider = (props) => {


    const [dataProveedores, setdataProveedores] = useState([]);

    return (
        <ProveedoresContext.Provider value={{dataProveedores, setdataProveedores}}>

{props.children}

        </ProveedoresContext.Provider>
    )

}

export default ProveedoresProvider
