import '../users/Users.css'

import Calendario from '../../components/pageComponents/Calendario'
import React from 'react'
import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc{
    background-image: none;
    height: 70vh;
    
}
`


function Calendar() {
    return (

        <div className="Container">
            <StyleWrapper>
                <Calendario/>
                </StyleWrapper>
        </div>
    )
}

export default Calendar
