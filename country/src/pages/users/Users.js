import './Users.css'

import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import TitlePage from '../../components/pageComponents/TitlePage';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'Nombres', width: 170,  },
    { field: 'lastName', headerName: 'Apellidos', width: 170 },
    {
      field: 'dni',
      headerName: 'Dni',
      type: 'number',
      width: 130,
      renderCell: (params) => {
        return (
          <div className="dnitUser">
          
            {params.row.dni}
            {/* <h1>Hola</h1> */}
          </div>
        );
      },
    },    {
      field: 'tel',
      headerName: 'teléfono',
      type: 'number',
      width: 170,
    },
    { field: 'mza', headerName: 'Mz.', width: 100 },
    { field: 'lote', headerName: 'Lte.', width: 100 },
    { field: 'mail', headerName: 'Correo', width: 170 },
    { field: 'action', headerName: 'Acciones', width: 170 },
  
  ];
  
  const rows = [
      { id: 1, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
      { id: 2, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 3, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 4, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 5, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 6, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 7, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 8, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 9, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 10, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },
    { id: 11, lastName: 'Snow', firstName: 'Jon', dni: 35332025, tel: 46628484, mza: "M", lote: "2", mail: "marocs@gmail.com", Acciones: "n" },

  ];
  

function Users() {
    return (
        <div>
            <TitlePage titulo="Usuarios Propietarios" />
            <div className='Container'>
                <div className="btnContainer">
                    <button className="btn">
                        Agregar
                    </button>

                </div>
                <div style={{ height: 700, width: '100%', textAlign: "center" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        checkboxSelection
                        // justify="center"
                      
                       
                    />
                </div>
            </div>
        </div>
    )
}

export default Users
