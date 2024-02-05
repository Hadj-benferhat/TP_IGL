import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect, useMemo} from "react";
import { GridToolbar } from "@mui/x-data-grid";
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";


const MembresWaitingListe = ({token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [ //columns props of dataGrid
    { field: "id", headerName: "ID" },
    {
      field: "lastName",  // name in data base
      headerName: "Nom", // name will be shwon in the table
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstName", 
      headerName: "Prénom",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "codePostal", 
      headerName: "Nom d'utilisateur",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Numéro Téléphone",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "ville",
      headerName: "Adresse",
      flex: 2,
    },  
    {
      field: "actions",
      headerName: "Accepter",
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

  const headers = useMemo(() => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);

  const [membres, setMembres] = useState([]);

  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/membersWaitList", token);
  useEffect(() => {
      if(data) {
        setMembres(data.map((membre, index) => ({ ...membre, id: index+1 })));
      }   
  }, [data]);

  // sends delete request + deleting it from local state (won't be shown)
  const handleDelete = async (_id) => {
    // await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${id}`, {
      await fetch(`http://localhost:8000/api/v1/users/${_id}`, {
          method : 'DELETE',
          headers: {
         'Content-Type': 'application/json',
         ...headers 
       },
          
      });
      const nouveauxMembres = membres.filter(tache => tache._id !== _id);
      setMembres(nouveauxMembres);
  }
  

  return (
    <Box m="20px">
      <Header title="Membres" subtitle="Gestion de la liste d'attente des des Adhérents" />
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
              <DataGrid checkboxSelection 
                rows={membres} // data from database
                columns={columns} 
                components={{Toolbar:GridToolbar}}  // filtre, ...
                // getRowId={row => row._id}
                getRowId={row => row.id}
              />
      </Box>
    </Box>
  );
};

export default MembresWaitingListe;
