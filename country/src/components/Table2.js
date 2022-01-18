import "../pages/users/Users.css"

import MaterialTable from "material-table"
import React from 'react';

const Table2 = props => {





    return (
        <div className="tamañoTabla">
            <MaterialTable
            columns= {props.columns}
            data = {props.data}      
            title={props.title}   

            
            actions={props.actions}
            style={{ width: "100%", maxWith: "100%"}}
            
            // parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
            // parentChildData={(row, rows) =>
            //     rows.find(a => a.id === row.parentId)
            //   }
            options={{
                search: false,
                // tableLayout: "fixed",
                // rowStyle: {s
                //     overflowWrap: 'break-word'
                //   },
                maxBodyHeight: "150vh",
               
                // maxBodyWidth: "20vw",
                actionsColumnIndex : -1,
                // columnResizable: true,
                // filtering:true,
                    headerStyle: {
                    //   backgroundColor: '#01579b',

                    minWidth: 20,
        maxWidth: 20,
                      color: 'gray'}
                    
}}
            localization={{
                header:{
                    actions:"Acciones"
                }
            }}
            />
            
        </div>
    )
}

export default Table2
