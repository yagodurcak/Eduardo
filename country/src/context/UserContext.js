import React, {createContext, useState} from 'react'


export const userContext = createContext()



const UserProvider = (props) => {


    const [dataUser, setdataUser] = useState({});

    return (
        <userContext.Provider value={{dataUser, setdataUser}}>

{props.children}

        </userContext.Provider>
    )

}

export default UserProvider
