import './Users.css'

import React from 'react';
import Table from "../../components/table/Table"
import Table2 from '../../components/Table2';
import TitlePage from '../../components/pageComponents/TitlePage';
import customerList from "../../assets/customers-list.json";
import editar from "../../IMG/users/edit.svg"
import eliminar from "../../IMG/users/eliminar.svg"

const customerTableHead = [
    'id',
    'nombre',
    'email',
    'Telefono',
    'Mza',
    'total spend',
    'location',
    "action"
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
        <td>
                            
                            <button className="border-0 mx-2 cursor-pointer bg-white"><img src={editar} alt="" /></button>
                            <button className="border-0 mx-2 cursor-pointer bg-white"><img src={eliminar} alt="" /></button>
                      
                  
              
                        </td>

    </tr>
)

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
  
                {/* <div className="mt-10">


                    <Table
                     limit='10'
                     headData={customerTableHead}
                     renderHead={(item, index) => renderHead(item, index)}
                     bodyData={customerList}
                     renderBody={(item, index) => renderBody(item, index)}


                    />
                </div> */}
                 <div className="mt-10"><Table2 title=""/></div>
            </div>
        </div>
    )
}

export default Users
