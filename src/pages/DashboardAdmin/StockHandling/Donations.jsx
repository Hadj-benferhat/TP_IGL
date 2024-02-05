import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import { useTheme } from "@mui/material";
import {useState, useEffect, useMemo} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";

const Donations = ({token}) => {

  const headers = useMemo(() => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "firstName",
        headerName: "Nom Donnateur",
        flex: 2,
        cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Prénom Donnateur",
      flex: 2,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Addresse",
      flex: 2,
    },
    {
      field: "typeDonation",
      headerName: "Type Donation",
      flex: 1,
    },
    {
      field: "quantite",
      headerName: "Quantité",
      flex: 1,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 2,
      type: 'actions',
      renderCell: ({ row }) => { // is it the id of the row _id??
        // console.log(row);
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


  const handleConfirmer = id => {
    fetch(`http://localhost:8000/api/v1/stock/${id}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          ...headers 
      },
      body: JSON.stringify({id})
    }).then(res => {
      if (res.ok) {
        return res.json(); // Return a promise that resolves with the parsed JSON data
      } else {
        throw new Error('Something went wrong');
      }
    }).then(data => {
      console.log(data.msg); // Log the message from the JSON data
    }).catch(err => {
      console.log(err);
    });
  };

  const handleDelete = async (id) => {
      try {
        await fetch(`http://localhost:8000/api/v1/donation/${id}`, {
          method : 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...headers 
          },
      })
      } catch (err)
      {
          console.log(err);
      }
      const nouveauxStocks = stocks.filter(stock => stock.id !== id);
      setStocks(nouveauxStocks);
  }

  const [stocks, setStocks] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/donation", token);
  // const {data , isPending, error} = useFetch(`${process.env.REACT_APP_URL}/DonsEnAttente`); 

  
  useEffect(() => {
    if(data) 
      setStocks(data.map((membre, index) => ({ ...membre, id: index+1 })));
  }, [data]);

  return (
        <Box m="20px" sx={{position : "relative"}}>
          <Header
            title="Dons"
            subtitle="Gestion de la liste des Dons"
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
            {stocks && 
              <DataGrid
                getRowId={row => row._id}
                checkboxSelection
                rows={stocks}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            }
          </Box>
        </Box>
  );
};
export default Donations;