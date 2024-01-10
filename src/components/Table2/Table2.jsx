import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./Table.css";

import axios from "axios";


function createData(name, trackingId, date, status) {
  return { name, trackingId, date, status };
}




const makeStyle=(status)=>{
  if(status === 'Approved')
  {
    return {
      background: 'rgb(145 254 159 / 47%)',
      color: 'green',
    }
  }
  else if(status === 'Pending')
  {
    return{
      background: '#ffadad8f',
      color: 'red',
    }
  }
  else{
    return{
      background: '#59bfff',
      color: 'white',
    }
  }
}

export default function BasicTable() {

  const [data, setData] = useState([]);

  // URL de l'API que vous souhaitez interroger
  const apiUrl = 'http://localhost:8080/api/demandes/all';
 
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

  const handleAccept = async (row) => {
    try {

      const response = await axios.post("http://localhost:8080/api/presentants/add", row);

      // Handle the response
      console.log("Response from the server:", response.data);
     
    } catch (error) {
      // Handle errors
      console.error("Error during POST request:", error.message);
    }
  };

  return (
      <div className="Table">
      <h3>Demandes de Participation</h3>
        <TableContainer
        sx={{ maxWidth: "85%" }}
          component={Paper}
          style={{ boxShadow: "0px 13px 20px 0px #80808029"  }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">Research Structure</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Thesis Year</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">University</TableCell>
                <TableCell align="left">PDF File</TableCell>
                <TableCell align="center">Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ color: "white" }}>
              {data.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{row.id}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="left">{row.firstName}</TableCell>
                  <TableCell align="left">{row.lastName}</TableCell>
                  
                  <TableCell align="left">{row.researchStructure}</TableCell>
                  <TableCell align="left">
                    <span className="status" style={makeStyle(row.status)}>{row.status}</span>
                  </TableCell>
                  <TableCell align="left">{row.thesisYear}</TableCell>
                  <TableCell align="left">{row.title}</TableCell>
                  <TableCell align="left">{row.university}</TableCell>
                  <TableCell align="left">
                  <Button variant="contained">Ouvrir</Button>
                  </TableCell>
                  
                  <TableCell align="left">
                  <Button variant="contained" color="success" onClick={() => handleAccept(row)}>Accepter</Button>
                  </TableCell>
                  <TableCell align="left">
                  <Button variant="contained" color="error"> Refuser </Button>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}
