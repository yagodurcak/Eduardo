import React, {createContext, useState} from 'react'

export const EspacioContext = createContext()



const EspacioProvider = (props) => {


    const [dataEspacio, setdataEspacio] = useState([]);

    return (
        <EspacioContext.Provider value={{dataEspacio, setdataEspacio}}>

{props.children}

        </EspacioContext.Provider>
    )

}

export default EspacioProvider
