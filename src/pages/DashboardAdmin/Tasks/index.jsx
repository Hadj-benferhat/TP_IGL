import Header from "../../../components/DashboardAdmin/Header";
import {Box, Grid} from "@mui/material";
import { useEffect, useState, useMemo} from "react";
import TacheCard from "../../../components/DashboardAdmin/TacheCard";
import LinearProgress from '@mui/material/LinearProgress';
import useFetch from "../../../hooks/useFetch";

 
export default function Tasks({token}){ 

    const headers = useMemo(() => {
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    }, [token]);
    const [taches, setTaches] = useState([]);
    const {data , isPending, error} = useFetch(`http://localhost:8000/api/v1/tasks`, token);
    
    useEffect(() => {
        if(data)    setTaches(data);
    }, [data]);

    const handleDelete = async (_id) => {
        try {
          await fetch(`http://localhost:8000/api/v1/tasks/${_id}`, {
            method: 'DELETE',
            headers: {
           'Content-Type': 'application/json',
           ...headers 
         },
          });
          setTaches((prevState) => prevState.filter((tache) => tache._id !== _id));
        } catch (error) {
          console.log('Error deleting tache:', error);
        }
      };
    
    return (
        <Box m="20px" > 
            <Header title="Taches" subtitle="La liste des taches" />
            <Box>
            <Grid container spacing={3}>
                    {isPending && <Grid item xs={12} sx={{width:"100%"}}>  <LinearProgress color="secondary" /></Grid>}
                    {error && <Grid item xs={12}> {error} </Grid>}
                    {!error && taches &&  taches.map(tache => (
                    <Grid   item xs={12} sm={6} md={4} lg={3} key={tache._id}>
                        <TacheCard TacheInfos={tache} handleDelete={handleDelete} /> 
                    </Grid>
                    ))}
            </Grid> 
            </Box>
        </Box>
    )};