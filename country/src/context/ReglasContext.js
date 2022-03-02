import React, {createContext, useState} from 'react'

export const ReglasContext = createContext()



const ReglasProvider = (props) => {


    const [dataReglas, setdataReglas] = useState([]);

    return (
        <ReglasContext.Provider value={{dataReglas, setdataReglas}}>

{props.children}

        </ReglasContext.Provider>
    )

}

export default ReglasProvider
