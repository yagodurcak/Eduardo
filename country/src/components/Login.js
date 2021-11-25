import Container from "@mui/material/Container"
import React from 'react';
import imagen from "../IMG/Groupicono.png"
import styled from '@emotion/styled';

const Title= styled.h1`
    font-size: 20px;
    color: red;
`
const Icono = styled.img`
    height: 200px;
    width: 200px;
    
`

function Login() {
    return (
        <Container>
            <div>
                <Icono src={imagen} alt="" />
                <h1>asasd</h1>
            </div>

        </Container>
    )
}

export default Login
    