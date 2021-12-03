import MaterialTable from "material-table"
import React from 'react';

const Table2 = props => {





    return (
        <div>
            <MaterialTable
            columns= {props.columns}
            data = {props.data}      
            title={props.title}   
            actions={props.actions}
            options={{
                actionsColumnIndex : -1,
                
                    headerStyle: {
                    //   backgroundColor: '#01579b',
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
