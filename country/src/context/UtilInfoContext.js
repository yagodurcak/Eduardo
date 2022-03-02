import React, {createContext, useState} from 'react'

export const UtilInfoContext = createContext()



const UtilInfoProvider = (props) => {


    const [dataUtilInfo, setdataUtilInfo] = useState([]);

    return (
        <UtilInfoContext.Provider value={{dataUtilInfo, setdataUtilInfo}}>

{props.children}

        </UtilInfoContext.Provider>
    )

}

export default UtilInfoProvider
