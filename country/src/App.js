import Login from "./components/Login";
import styled from '@emotion/styled';

const Container = styled.div `
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  /* background-color: wheat; */

`


function App() {
  return (
    <Container>
   
      <Login/>
    </Container>
  );
}

export default App;
