import { Box, Typography, Button,  useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import { GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from '@mui/icons-material/Delete';
import {useState, useEffect} from "react";
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";

const Partenaires = ({token}) => {
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
      field: "quantite",
      headerName: "Type",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          {params.row.quantite}
        </Typography>
      ),
    },
    {
      field: "town",
      headerName: "Adresse",
      flex: 1,
    },
    {
      field: "sponsoringTime",
      headerName: "Durée de Sponsoring",
      flex: 1,
    },
    {
      field: "Supprimer",
      headerName: "Supprimer Membre",
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

  const [partenaires, setPartenaires] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/sponsor", token);
  
  useEffect(() => {
      if(data) 
        setPartenaires(data.map((membre, index) => ({ ...membre, id: index+1 })));
  }, [data]);




  const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:8000/api/v1/sponsor/${id}`, {
          method : 'DELETE'
      })
      } catch (err)
      {
          console.log(err);
      }
      const nouveauxPartenaires = partenaires.filter(tache => tache.id !== id);
      setPartenaires(nouveauxPartenaires);
  }

  return (
    <Box m="20px">
      <Header title="Partenaires" subtitle="Gestion des partenaires" />
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
          rows={partenaires} 
          columns={columns}  
          components={{Toolbar:GridToolbar}} 
          // getRowId={row => row._id}
          getRowId={row => row._id}
          />
      </Box>
    </Box>
  );
};

export default Partenaires;
