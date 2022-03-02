import React, {createContext, useState} from 'react'

export const InvitadosContext = createContext()



const InvitadosProvider = (props) => {


    const [dataInvitados, setdataInvitados] = useState([]);

    return (
        <InvitadosContext.Provider value={{dataInvitados, setdataInvitados}}>

{props.children}

        </InvitadosContext.Provider>
    )

}

export default InvitadosProvider
