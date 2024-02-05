import Header from "../../components/DashboardAdmin/Header";
import {Box, Grid} from "@mui/material";
import { useEffect, useState} from "react";
import TacheCardMember from "../../components/DashboardMember/TacheCardMember";
import useFetch from "../../hooks/useFetch";

export default function DashboardTasksAll({userName, token}){  

     const [taches, setTaches] = useState([]);
     const {data, isPending, error} = useFetch('http://localhost:8000/api/v1/tasks', token);

     useEffect(() => {
       if(data) 
       setTaches(data);
     }, [data]);


  //   // sends delete request + deleting it from local state (won't be shown)
  // const handleClicks = async (id) => {
  //     await fetch("http://localhost:8000/taches" + id, {
  //         method : 'Post' ?
  //     });
  //     const nouvellesTaches = taches.filter(tache => tache.id != id); 
  // changing the new data
  //     setTaches(nouvellesTaches);
  // }

  return (
      <Box m="20px" width="100%"> 
          <Header title="Taches" subtitle="La liste des taches" />
          <Box m="20px" width="100%">
                <h1>Bonjour {userName}</h1>
          </Box>
          <Box>
          <Grid container spacing={3}>
              {taches.map(tache => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={tache.id}>
                      <TacheCardMember TacheInfos={tache}  />  {/* handleDelete={handleDelete} */}
                  </Grid>
                  ))}
          </Grid> 
          </Box>
      </Box>
    )};