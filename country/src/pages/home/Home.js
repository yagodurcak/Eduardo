import './Home.css'

import Featured from '../../components/featuredInfo/Featured'
import React from 'react';
import Table from "../../components/table/Table"
import TitlePage from '../../components/pageComponents/TitlePage';

function Home() {
    return (    
        <div className='homeContainer'>        
            <TitlePage titulo="Dashboards"/>
            <Featured/>            
            <Table/>
        </div>
    )
}

export default Home
