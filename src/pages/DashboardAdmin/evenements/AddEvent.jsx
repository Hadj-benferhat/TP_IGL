import {  Box, Button, TextField, Typography} from "@mui/material";
import Header from "../../../components/DashboardAdmin/Header";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




const style = { marginTop: "20px", marginBottom: "20px", display: 'block'};

export default function AddEvent({token}) {

  const [nomEvent, setNomEvent] = useState("");
  const [typeEvent, setTypeEvent] = useState("");
  const [descriptionEvent, setDescriptionEvent] = useState("");
  const [dateEvent, setDateEvent] = useState(dayjs('2022-04-07'));
  const [imageSelected, setImageSelected] = useState(null);
  const [listeDesBesoins, setListeDesBesoins] = useState("");

  const [nomEventError, setNomEventError] = useState(false);
  const [typeEventError, setTypeEventError] = useState(false);
  const [descriptionEventError, setDescriptionEvntError] = useState(false);
  const [dateError, setDateError] = useState(false);
  


  const uploadImage = async (fileImage) => {
    const formData = new FormData();
  
    try {
      formData.append('file', fileImage);
      formData.append('upload_preset', 'ycfzdnk5');
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsgvkd0f1/image/upload",
        { method: 'POST', body: formData }
      );
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if (nomEvent && descriptionEvent && typeEvent && dateEvent && imageSelected ) { 
      try {
        const res = await uploadImage(imageSelected); // get response from uploadImage function
        const image = res.secure_url; // extract the URL from the response object
        const event = { nomEvent, typeEvent, descriptionEvent, dateEvent, image, listeDesBesoins }; // include the URL in the event object
        const response = await fetch("http://localhost:8000/api/v1/events", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(event)
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    } 

        // these just for affichage  
        setNomEventError(false);
        setDateError(false);
        setDescriptionEvntError(false);
        setTypeEventError(false);

        if (nomEvent === "")         setNomEventError(true);
        if (dateEvent === "")        setDateError(true);
        if (descriptionEvent === "") setDescriptionEvntError(true);
        if (typeEvent=== "")         setTypeEventError(true);

      }

 // pour revenir au mm theme cas aprés error
  const handleInputFocus = (inputName) => {
    switch (inputName) {
      case "nomEvent":
        setNomEventError(false);
      break;
      case "descriptionEvent":
        setDescriptionEvntError(false);
      break;
      case "typeEvent":
        setTypeEventError(false);
      break;
      case "dateEvent":
        setDateError(false);
      break;
      default:
          // default  
      break;
    }
  };


  return (
    <Box m="20px">      
      <Header title="PUBLIER ACTUALITÉ" subtitle="Ajouter Une nouvelle actualité" />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>  {/* the submit event in that form is on the button */}           
           <TextField 
            onFocus={() => handleInputFocus("nomEvent")}
            onChange={(e) => setNomEvent(e.target.value)}
            sx={style}
            variant="outlined" 
            label="Nom de la l'actualité"
            color="secondary"
            fullWidth
            required
            error={nomEventError}
          />
            <TextField 
            onFocus={() => handleInputFocus("typeEvent")}
            onChange={(e) => setTypeEvent(e.target.value)}
            sx={ style}
            variant="outlined" 
            label="Type de la L'actualité"
            color="secondary"
            fullWidth
            required
            error={typeEventError}
          /> 
          <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                defaultValue={dayjs('2022-03-07')}
                label="Choisissez une date pour L'actualité"
                value={dateEvent}
                onChange={(newValue) => setDateEvent(dayjs(newValue).format('YYYY-MM-DD'))}
                error={dateError}
              />
          </LocalizationProvider>

           <TextField 
            onFocus={() => handleInputFocus("descriptionEvent")}
            onChange={(e) => setDescriptionEvent(e.target.value)}
            sx={style}
            variant="outlined" 
            label="Description de l'actualité"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            required
            error={descriptionEventError}
          />  
           <TextField 
            onFocus={() => handleInputFocus("listeDesBesoins")}
            onChange={(e) => setListeDesBesoins(e.target.value)}
            sx={ style}
            variant="outlined" 
            label="Liste des besoins (Lien vers spreadsheet)"
            color="secondary"
            fullWidth
          /> 
          <Typography>Ajouter une image</Typography>
          <TextField 
            type="file"
            // onFocus={() => handleInputFocus("descriptionEvent")}
            onChange={e => setImageSelected(e.target.files[0])}
            sx={style}
            variant="outlined" 
            color="secondary"
            required
            error={descriptionEventError}
          />  
          {imageSelected && <img style={{display : "block"}}  src={URL.createObjectURL(imageSelected)} alt="preview" width="200" />}  
        {/* test image taille ??§§§ */}
          <Button 
            sx={{ marginTop: "20px"}}
            type="submit" 
            color="secondary" 
            variant="contained"  
            endIcon={<KeyboardArrowRightIcon />} 
          >
              Publier
          </Button>
      </form>
    </Box>
  )
}