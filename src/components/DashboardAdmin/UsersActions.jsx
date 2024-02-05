import { Box, CircularProgress, Fab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Check, Save } from '@mui/icons-material';
import { green } from '@mui/material/colors';

const UsersActions = ({ params, rowId, setRowId, updatedQuantite, setUpdatedQuantite }) => { // params : l'objet data dans la row ?? et autres params de la ligne
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8000/api/v1/stock/${rowId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            quantite: updatedQuantite,
          }),
        });
        setSuccess(true);
        setRowId(null);
        setUpdatedQuantite(null);
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    setLoading(false);
  };

  useEffect(() => {
    if (rowId === params.row.id && success) setSuccess(false); // _id ?
  }, [rowId, success, params.row.id]); // params._id

  return (
    <Box
      sx={{
        m: 1,
        position: 'relative',
      }}
    >
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: green[500],
            '&:hover': { bgcolor: green[700] },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading} // the icon will be disabled if its row is not active or if we are loading
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};
export default UsersActions;

// const handleDelete = async (_id) => { // props.dow._id  ?
    //     try {
    //       await fetch(`${process.env.REACT_APP_URL}/Stocks/${_id}`, {
    //           method : 'DELETE'
    //       });
    //       const nouveauxStocks = stocks.filter(st => st.id !== id);
    //     }catch (error) {
    //       console.log('Error deleting stock:', error); 
    //     }
    //     }