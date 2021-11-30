import React from 'react';
import styled from '@emotion/styled'

const Titulo = styled.h1`
        color: #422F8A;
    font-weight: 500;
    padding: 20px 10px;
`

function TitlePage({titulo}) {
    return (
        <div>
            <Titulo>{titulo}</Titulo>
        </div>
    )
}

export default TitlePage
