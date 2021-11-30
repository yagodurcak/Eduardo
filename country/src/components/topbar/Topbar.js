import "./Topbar.css"

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';

function Topbar() {
    return (
        <div>
            <div className="topbar-flex">

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
