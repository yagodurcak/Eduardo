import './Home.css'

import React, {useContext, useEffect} from 'react';

import Featured from '../../components/featuredInfo/Featured'
import Table from "../../components/table/Table"
import TitlePage from '../../components/pageComponents/TitlePage';
import axios from 'axios';
import { userContext } from '../../context/UserContext';

function Home() {
    const { dataUser, setdataUser } = useContext(userContext);

    // const { dataUser } = useContext(userContext);

         
    const buscarCotizacion = async() => {

     
        setdataUser(JSON.parse(localStorage.getItem('user')))
             
      }
      // }
  useEffect(() => {

  
    buscarCotizacion()
    

  }, []);
  

    console.log(dataUser);
    return (    
        <div className='homeContainer'>        
            <TitlePage titulo="Dashboards"/>
            <Featured/>            
            <Table/>
            <h1>{dataUser.id}</h1>
        </div>
    )
}

export default Home
