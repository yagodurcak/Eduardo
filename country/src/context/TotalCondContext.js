import React, {createContext, useState} from 'react'


export const TotalCondoContext = createContext()



const TotalCondoProvider = (props) => {


    const [totalCondo, setTotalCondo] = useState(0);

    return (
        <TotalCondoContext.Provider value={{totalCondo, setTotalCondo}}>

{props.children}

        </TotalCondoContext.Provider>
    )

}

export default TotalCondoProvider
