import {  Box, Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@mui/material";
import Header from "../../../components/DashboardAdmin/Header";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const style = { marginTop: "20px", marginBottom: "20px", display: 'block'};

export default function Addtasks({token}) {

  const headers = useMemo(() => {
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }, [token]);

  const navigate = useNavigate(); // let history = useHistory();  // for redirection ?

  const [nomTache, setNomTache] = useState("");
  const [descriptionTache, setDescriptionTache] = useState("");

  const [nomTacheError, setNomTacheError] = useState(false);
  const [descriptionTacheError, setDescriptionTacheError] = useState(false);

  const [typeTache, setTypeTache] = useState("Evenement");
  const etatDeLaTache = "non Affecté";

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (nomTache && descriptionTache) { 

      fetch(`http://localhost:8000/api/v1/tasks`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          ...headers 
        },
        body: JSON.stringify({ nomTache, descriptionTache, typeTache, etatDeLaTache })  
      }).then(() => navigate("/connexion/tasks")) // logical navigating to the tasks page
      .catch(err => {
        console.log(err);
        console.log(err.message);
      });
  } 
      // these just for affichage  
      setNomTacheError(false);
      setDescriptionTacheError(false);
      if (nomTache === "") {
        setNomTacheError(true);
        }
        if (descriptionTache === "") {
        setDescriptionTacheError(true);
      }}

 // pour revenir au mm theme cas aprés error
  const handleInputFocus = (inputName) => {
    if (inputName === "nomTache") {
      setNomTacheError(false);
    } else if (inputName === "descriptionTache") {
      setDescriptionTacheError(false);
    }
  };

  return (
    <Box m="20px">      
      <Header title="AJOUTER TACHE" subtitle="Ajouter Une nouvelle tache" />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
            onFocus={() => handleInputFocus("nomTache")}
            onChange={(e) => setNomTache(e.target.value)}
            sx={ style}
            variant="outlined" 
            label="Nom de la tache"
            color="secondary"
            fullWidth
            required
            error={nomTacheError}
          />
          <TextField 
            onFocus={() => handleInputFocus("descriptionTache")}
            onChange={(e) => setDescriptionTache(e.target.value)}
            sx={style}
            variant="outlined" 
            label="Description de la tache"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            required
            error={descriptionTacheError}
          />
          <FormControl component="fieldset" sx={style}>
            <FormLabel sx={{display : "block", marginBottom: "10px"}} color="secondary" component="legend">Type de la tache</FormLabel>
            <RadioGroup sx={{marginLeft: "2px"}} value={typeTache} onChange={(e) => setTypeTache(e.target.value)}>
                <FormControlLabel value="Evenement" control={<Radio color="secondary" />} label="Évènement" /> {/*Value: when the user checks a button ==> the value will be asociated with that checked button*/}
                <FormControlLabel value="Collecte" control={<Radio color="secondary" />} label="Collecte de Fonds" />
                <FormControlLabel value="Aide" control={<Radio color="secondary" />} label="Aide aux nécessiteux" />
                <FormControlLabel value="Sensibilisation" control={<Radio color="secondary" />} label="Sensibilisation du public" />
                <FormControlLabel value="Gestion" control={<Radio color="secondary" />} label="Gestion du Club" />
            </RadioGroup>
          </FormControl>
 
          <Button 
            type="submit" 
            color="secondary" 
            variant="contained"  
            endIcon={<KeyboardArrowRightIcon />} 
          >
              Envoyer
          </Button>
      </form>
    </Box>
  )
}