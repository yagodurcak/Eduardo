import "./Topbar.css"

import React, {useState} from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Redirect} from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

function Topbar() {

    const [redirect, setRedirect] = useState(false);

    const logout = () => {
        localStorage.setItem('user', "") 
        localStorage.setItem('Authorization', "") 
        setRedirect(true)
      }
     if (redirect) {
        return <Redirect to="/"/>;
       
      }

    return (
        <div>
            <div className="topbar-flex">

                    <button className="btn1" onClick={logout}>Cerrar Sesion</button>

                    <div>
                        <NotificationsIcon color="disabled"/>
                        <ArrowDropDownIcon/>
                    </div>
                    <div>
                        <SettingsIcon color="disabled"/>
                        <ArrowDropDownIcon/>
                    </div>
                </div>            
        </div>
    )
}

export default Topbar
