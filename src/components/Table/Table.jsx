import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";

import axios from "axios";

export default function BasicTable() {
  const [data, setData] = useState([]);

 // URL de l'API que vous souhaitez interroger
 const apiUrl = 'http://localhost:8080/assistant/all';

 // useEffect pour récupérer les données lors du montage du composant
 useEffect(() => {
   const fetchData = async () => {
     try {
       const response = await axios.get(apiUrl);
       // Définir les données dans l'état
       setData(response.data);
     } catch (error) {
       console.error('Erreur lors de la récupération des données :', error.message);
     }
   };

   // Appeler la fonction fetchData
   fetchData();
 }, []); 

 return (
   <div className="Table">
     <h3>Assistants</h3>
     <TableContainer sx={{ maxWidth: "85%" }}
       component={Paper}
       style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
     >
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
           <TableRow>
             <TableCell>id</TableCell>
             <TableCell align="left">email</TableCell>
             <TableCell align="left">first name</TableCell>
             <TableCell align="left">last name</TableCell>
             <TableCell align="left">research structure</TableCell>
             <TableCell align="left">status</TableCell>
             <TableCell align="left">university</TableCell>
           </TableRow>
         </TableHead>
         <TableBody style={{ color: "white" }}>
           {data.map((row) => (
             <TableRow
               key={row.id}
               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
             >
               <TableCell component="th" scope="row">
                 {row.id}
               </TableCell>
               <TableCell align="left">{row.email}</TableCell>
               <TableCell align="left">{row.firstname}</TableCell>
               <TableCell align="left">{row.lastname}</TableCell>
               <TableCell align="left">{row.researchStructure}</TableCell>
               <TableCell align="left">
                 <span className="status" style={makeStyle(row.status)}>
                   {row.status}
                 </span>
               </TableCell>
               <TableCell align="left">{row.university}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </TableContainer>
   </div>
 );
}

// Fonction makeStyle inchangée
const makeStyle = (status) => {
 if (status === 'Approved') {
   return {
     background: 'rgb(145 254 159 / 47%)',
     color: 'green',
   };
 } else if (status === 'Pending') {
   return {
     background: '#ffadad8f',
     color: 'red',
   };
 } else {
   return {
     background: '#59bfff',
     color: 'white',
   };
 }
};