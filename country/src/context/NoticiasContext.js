import React, {createContext, useState} from 'react'

export const NoticiasContext = createContext()



const NoticiasProvider = (props) => {


    const [dataNoticias, setdataNoticias] = useState([]);

    return (
        <NoticiasContext.Provider value={{dataNoticias, setdataNoticias}}>

{props.children}

        </NoticiasContext.Provider>
    )

}

export default NoticiasProvider
