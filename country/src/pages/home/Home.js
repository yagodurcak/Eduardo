import './Home.css'

import Featured from '../../components/featuredInfo/Featured'
import React from 'react';
import TitlePage from '../../components/pageComponents/TitlePage';

function Home() {
    return (    
        <div className='homeContainer'>        
            <TitlePage titulo="Dashboard"/>
            <Featured/>
            
        </div>
    )
}

export default Home
