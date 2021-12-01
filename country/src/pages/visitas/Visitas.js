import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TitlePage from '../../components/pageComponents/TitlePage';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    // tableContainer: {
    //     // borderRadius: 15,  
    //     margin: '10px 10px',
    //      backgroundColor: "transparent",
    //      borderBottom: "none",

        
       
    // },
    tableHeaderCell: {
        // fontWeight: 'bold',
        fontSize: 20,
        color: "gray",
        borderBottom: "none",
        // backgroundColor: theme.palette.primary.dark,
       
    },
    tableName: {
        // fontWeight: 'bold',
        fontSize: 20,
        color: "gray",
        borderBottom: "none",
        // backgroundColor: theme.palette.primary.dark,
       
    },

  }));

function createData(name, calories, fat, carbs, protein, acciones) {
  return { name, calories, fat, carbs, protein, acciones };
}

const rows = [
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),
  createData('Personal', "Diurna",15, "06-18", "lun-dom", "eliminar"),

];

function Visitas() {

    const classes = useStyles();
    return (
      <div>

        <div className='Container bg-white'>
          <TitlePage titulo="Visitas" />
          <div className="btnContainer">
            <button className="btn">
              Agregar
            </button>

          </div>
          <TableContainer component={Paper} className="mt-10 border-0" >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
              <TableHead >
                <TableRow>
                  <TableCell className={classes.tableHeaderCell} >Tipo de Visitas</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">Descripción</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">Max. Personas</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">Rango Horario</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">Dias Disponibles</TableCell>
                  <TableCell className={classes.tableHeaderCell} align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" className={classes.tableHeaderCell} >
                      {row.name}
                    </TableCell>
                    <TableCell className={classes.tableName} align="right">{row.calories}</TableCell>
                    <TableCell className={classes.tableName} align="right">{row.fat}</TableCell>
                    <TableCell className={classes.tableName} align="right">{row.carbs}</TableCell>
                    <TableCell className={classes.tableName} align="right">{row.protein}</TableCell>
                    <TableCell className={classes.tableName} align="right">{row.acciones}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
                  )
}

export default Visitas
