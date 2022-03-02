import React, {createContext, useState} from 'react'

export const UsuariosContext = createContext()



const UsuariosProvider = (props) => {


    const [dataUsuarios, setdataUsuarios] = useState([]);

    return (
        <UsuariosContext.Provider value={{dataUsuarios, setdataUsuarios}}>

{props.children}

        </UsuariosContext.Provider>
    )

}

export default UsuariosProvider
