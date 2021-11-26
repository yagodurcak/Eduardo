import "./App.css"

import Login from "./components/Login";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import styled from '@emotion/styled';

function App() {
  return (
    <div className="container">
      {/* <Sidebar/>
      <Topbar/> */}
      <Login/>
    </div>
  );
}

export default App;
