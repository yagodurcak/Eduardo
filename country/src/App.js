import "./App.css"

import Home from "./pages/home/Home";
import Login from "./components/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import styled from '@emotion/styled';

function App() {
  return (
    <div className="container">
      <Sidebar/>
      <div  className="topbarContainer">
        <Topbar/>
        <Home/>
        </div>
      {/* <Login/> */}
    </div>
  );
}

export default App;
