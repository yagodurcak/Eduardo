import React, {createContext, useState} from 'react'

export const PersonalContext = createContext()



const PersonalProvider = (props) => {


    const [dataPersonal, setdataPersonal] = useState([]);

    return (
        <PersonalContext.Provider value={{dataPersonal, setdataPersonal}}>

{props.children}

        </PersonalContext.Provider>
    )

}

export default PersonalProvider
