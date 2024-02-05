import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import { useTheme } from "@mui/material";
import {useState, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";

const BenevolesWaitingListe = ({token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Numéro Téléphone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Adresse",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      type: 'actions',
     renderCell: ({ row }) => { // is it the id of the row _id??
      return (
        <Box sx= {{display : "flex", justifyContent : "space-between", alignItems :"center", gap : "5px"}}>
          <Button
            variant="outlined"
            sx={{borderRadius : "4px", color : colors.greenAccent[400]}}
            onClick={() => handleConfirmer(row._id)} // _id ???
          >
              Confirmer
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{borderRadius : "4px"}}
            onClick={() => handleDelete(row._id)}
          >
              <DeleteIcon/>
          </Button>
        </Box>
      );
    },
    },
  ];


  const [benevoles, setBenevoles] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/volunteersWaitList", token);
  useEffect(() => {
    if(data) 
      setBenevoles(data.map((membre, index) => ({ ...membre, id: index+1 })));
}, [data]);

  const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:8000/api/v1/volunteersWaitList/${id}`, {
            method : 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
            },
        });
        const nouveauxBenevoles = benevoles.filter(tache => tache.id !== id);
        setBenevoles(nouveauxBenevoles);
      }catch (error) {
        console.log('Error deleting member:', error); 
      }
  }

  const handleConfirmer = id => {
    fetch(`http://localhost:8000/api/v1/volunteers/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({id})
    }).then(res => {
      if (res.ok) {
        return res.json(); // Return a promise that resolves with the parsed JSON data
      } else {
        throw new Error('Something went wrong');
      }
    }).then(data => {
      console.log(data); // Log the message from the JSON data
    }).catch(err => {
      console.log(err);
    });
  };
  

  return (
    <Box m="20px">
      <Header
        title="Bénévoles"
        subtitle="Gestion de la liste d'attente des Bénévoles"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {isPending && <Box sx={{width:"100%"}}>  <LinearProgress color="secondary" /></Box>}
        {error && <Box item="true" xs={12}> {error} </Box>}
        
          <DataGrid
            checkboxSelection
            rows={benevoles}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            // getRowId={row => row._id}
            getRowId={row => row._id}
          />
        
      </Box>
    </Box>
  );
};

export default BenevolesWaitingListe;
