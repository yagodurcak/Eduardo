import './Home.css'

import React, {useEffect} from 'react';

import Featured from '../../components/featuredInfo/Featured'
import Table from "../../components/table/Table"
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from 'axios';

function Home() {

    useEffect(() => {
     
    
        const buscarCotizacion = async() => {
          
            const url = `https://back2.tinpad.com.pe/public/api/project/1`;

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  localStorage.getItem('Authorization'),

            }
    
    
            const rtdo = await axios.get(url, {headers})
   
            console.log(rtdo);
    
    
        }
    
        buscarCotizacion()     }, []);
    return (    
        <div className='homeContainer'>        
            <TitlePage titulo="Dashboards"/>
            <Featured/>            
            <Table/>
        </div>
    )
}

export default Home
