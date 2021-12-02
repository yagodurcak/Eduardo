import MaterialTable from "material-table"
import React from 'react';

const columns = [
    {
        title:"Artista",
        field: "artista",

       
    },
    {
        title:"Artista1",
        field: "artista1"
    },
    {
        title:"Artista2",
        field: "artista2"
    },
    {
        title:"Artista3",
        field: "artista3"
    }
]

const rows = [
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  },
    {artista: "thebeatles", artista1: "thebeatles",artista2: "thebeatles",artista3: "thebeatles"  }
]

const Table2 = props => {
    return (
        <div>
            <MaterialTable
            columns= {columns}
            data = {rows}      
            title={props.title}   
            actions={[
                {
                    icon:"edit",
                    tooltip:"Editar",
                    onClick: (event, rowdata) => alert("¿Quiere editar al usuario?")   
                },
                {
                    icon:"delete",
                    tooltip:"Eliminar",
                    onClick: (event, rowdata) => alert("¿Quiere eliminar al usuario:  " + rowdata.artista + "?")   
                }
            ] }
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
