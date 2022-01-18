import './Home.css'

import React, {useEffect, useContext} from 'react';

import Featured from '../../components/featuredInfo/Featured'
import Table from "../../components/table/Table"
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

function Home() {

    const { dataUser } = useContext(userContext);

    console.log(dataUser);
    return (    
        <div className='homeContainer'>        
            <TitlePage titulo="Dashboards"/>
            <Featured/>            
            <Table/>
            {/* <h1>{dataUser.id}</h1> */}
        </div>
    )
}

export default Home
