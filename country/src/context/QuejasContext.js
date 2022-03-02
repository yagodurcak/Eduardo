import React, {createContext, useState} from 'react'

export const QuejasContext = createContext()



const QuejasProvider = (props) => {


    const [dataQuejas, setdataQuejas] = useState([]);

    return (
        <QuejasContext.Provider value={{dataQuejas, setdataQuejas}}>

{props.children}

        </QuejasContext.Provider>
    )

}

export default QuejasProvider
