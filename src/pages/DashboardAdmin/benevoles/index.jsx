import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import { useTheme } from "@mui/material";
import {useState, useEffect} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";

const Benevoles = ({token}) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Nom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "familyName",
      headerName: "Prénom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phoneNumber",
      headerName: "Numéro Téléphone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "town",
      headerName: "Adresse",
      flex: 1,
    },
    {
      field: "Supprimer",
      headerName: "Supprimer Bénévole",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Button
            variant="outlined"
            startIcon={<DeleteIcon/>}
            color="error"
            sx={{borderRadius : "4px"}}
            onClick={() => handleDelete(row._id)}
          >
              Supprimer
          </Button>
        );
      },
    },
  ];


  const [benevoles, setBenevoles] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/volunteers", token);
  
  useEffect(() => {
      if(data)    setBenevoles(data);
  }, [data]);

  const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:8000/api/v1/volunteers/${id}`, {
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
  

  return (
    <Box m="20px">
      <Header
        title="Bénévoles"
        subtitle="Gestion des Bénévoles"
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
            getRowId={row => row._id}
          />
        
      </Box>
    </Box>
  );
};

export default Benevoles;