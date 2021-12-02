import './Users.css'

import CustomerList from "../../assets/customers-list.json"
import React from 'react';
import Table from "../../components/table/Table"
import TitlePage from '../../components/pageComponents/TitlePage';

const headerItems = [
    "Nombres",
    "Correo",
    // "Apellidos",
    "Teléfono",
    "Doc. de Identidad",
    "Mz.",
"Lte.",
  
  ];

//   const renderHeader = (item, index) => <th key= {index}>{item}</th>


function Users() {
    return (
        <div>
            <div className='Container'>
                <TitlePage titulo="Usuarios Propietarios" />
            <div className="flex justify-end ">
                <button className="btn">
                  Agregar
                </button>
            </div>
                <div className="mt-10">
                    <Table
                    limit='10'
                    headerTitle = {headerItems}
                    bodyInfo={CustomerList}
                    // renderHeader= {(item, index)=> renderHeader(item, index)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Users
