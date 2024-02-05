import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/DashboardAdmin/Header";
import { useTheme } from "@mui/material";
import {useState, useEffect, useMemo} from "react";
// import DeleteIcon from '@mui/icons-material/Delete';
import LinearProgress from '@mui/material/LinearProgress';
// import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import useFetch from "../../../hooks/useFetch";
import UsersActions from "../../../components/DashboardAdmin/UsersActions";


const StockHandling = ({token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rowId, setRowId] = useState(null); // which row is selected
  const [updatedQuantite, setUpdatedQuantite] = useState(null);


  const columns = useMemo(
    () => [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
        field: "typeDonation",
        headerName: "Type",
        flex: 2,
        cellClassName: "name-column--cell",
    },
    {
      field: "quantite",
      headerName: "Quantité",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex : 1,
      editable: true,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      renderCell: (params) => (
         <UsersActions {...{ params, rowId, setRowId, updatedQuantite, setUpdatedQuantite }} /> // params : data of the row; rowId : which row is active now
      ),
      },
  ],
  [rowId, updatedQuantite] // if there's a change in the row we will render our buttons o therwise no (we memo the states)
);

  const [stocks, setStocks] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/stock", token);

  
  useEffect(() => {
    if (data)   setStocks(data);
  }, [data]);

  return (
        <Box m="20px" sx={{position : "relative"}}>
          <Header
            title="Stocks"
            subtitle="Gestion des stocks"
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
                checkboxSelection
                rows={stocks}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={row => row._id}
                // onRowClick={handleEvent}
                onCellEditStop={(params) => {
                  setRowId(params.row._id);
                  console.log(params); 
                  setUpdatedQuantite(params.value); 
                  console.log(updatedQuantite); 
                }}
              />
            }
          </Box>
        </Box>
  );
};
export default StockHandling;