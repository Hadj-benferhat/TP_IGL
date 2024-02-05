import { Formik } from "formik";
import * as yup from "yup";
import { Box, Grid,  Button, Typography, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img from '../../assets/images/backgroundDonation.jpg';
import styled from "styled-components";
import HeaderDon from "../../components/Dons/HeaderDon";

const DonationPage = styled.div`
  min-height : 100vh;
  width : 100vw;
  background-image: url(${Img});   
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-top : 150px;
`;


export default function FaireDon() {

  const [typeDonation, setTypeDonation] = useState([]);

  useEffect (()=> {
    fetch("http://localhost:8000/api/v1/data/donType")
    .then(res => res.json())
    .then(data =>  
      setTypeDonation(data)
    )
  }, [])

  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate(); 

  const handleFormSubmit = (values) => {

    setIsPending(true);
  
    fetch("http://localhost:8000/api/v1/donation", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(values)
  }).then(res => {
    if (res.ok) {
      return res.json(); // Return a promise that resolves with the parsed JSON data
    } else {
      throw new Error('Something went wrong');
    }
    // navigate("/"); 
  }).then(data => {
    console.log(data.msg); // Log the message from the JSON data
    setIsPending(false);
    navigate("/");
  }).catch(err => {
    console.log(err);
  });
};



  return (
    <DonationPage>
      <HeaderDon />
      <Box sx={{width : "70vw", margin: "0 auto"}}>
        <Box 
          sx={{width : "500px !important", borderRadius :"10px", background :"white", padding: "30px 20px",
          boxShadow : "6px 6px 8px rgba(0, 0, 0, 0.2)"}}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography>
                      Mes Coordonnées
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                      <TextField
                      color="primary"  fullWidth  variant="outlined"
                      type="text" label="Prénom" name="firstName"
                      onBlur={handleBlur}  onChange={handleChange}
                      value={values.firstName} 
                      error={!!touched.firstName && !!errors.firstName}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="primary"  fullWidth  variant="outlined"
                      type="text"      label="Nom"   name="lastName"
                      onBlur={handleBlur}   onChange={handleChange}
                      value={values.lastName}
                      error={!!touched.lastName && !!errors.lastName}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      color="primary"   fullWidth  variant="outlined"                 
                      type="text"    label="Email"  name="email"
                      onBlur={handleBlur}   onChange={handleChange}
                      value={values.email}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      color="primary"   fullWidth   variant="outlined"
                      type="text"   label="Téléphone" name="contact"
                      onBlur={handleBlur}   onChange={handleChange}
                      value={values.contact}
                      error={!!touched.contact && !!errors.contact}
                      helperText={touched.contact && errors.contact}   
                    />
                  </Grid>
                  <Grid item xs={12}>
                      <TextField
                        color="primary"  fullWidth    variant="outlined"
                        type="text"   label="Addresse"   name="address"
                        onBlur={handleBlur}     onChange={handleChange}
                        value={values.address}                    
                        error={!!touched.address && !!errors.address}
                        helperText={touched.address && errors.address}
                      />
                  </Grid>

                  <Grid item xs={12} sx={{marginTop : "30px"}}>
                    <Typography>
                        Mon Don
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel >Type de don</InputLabel>
                        <Select
                          fullWidth     variant='outlined'  
                          value={values.typeDonation} 
                          name="typeDonation"
                          label="Type de don"
                          onChange={
                            (event) => { 
                              setFieldValue("typeDonation", event.target.value);
                            }
                          }
                          error={!!touched.typeDonation && !!errors.typeDonation}
                        >
                          {typeDonation.map((typedon, index) => (
                                  <MenuItem key={index} value={typedon}>
                                    {typedon}
                                  </MenuItem>
                                ))
                          }
                        </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      color="primary"     fullWidth        variant="outlined"
                      type="text"     label="Quantité"   name="quantite"
                      onBlur={handleBlur}       onChange={handleChange}
                      value={values.quantite}
                      error={!!touched.quantite && !!errors.quantite}
                      helperText={touched.quantite && errors.quantite}
                    />
                  </Grid>
                </Grid>
                <Box display="flex" justifyContent="end" mt="20px">
                  {isPending ? ( 
                            <LoadingButton
                            disabled
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                          >
                            Soumission en cours...
                          </LoadingButton>) : (
                        <Button type="submit" color="primary" variant="contained">
                              Soumettre
                        </Button>
                )}
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </DonationPage>
  )
}

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const quantiteRegExp = /^[0-9]+$/; 

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("obligatoire"), 
  lastName: yup.string().required("obligatoire"),
  email: yup.string().matches(emailRegExp, "email non valide").required("obligatoire"),
  contact: yup.string().matches(phoneRegExp, "Numéro Téléphone non Valide").required("obligatoire"),
  address: yup.string().required("obligatoire"),
  quantite: yup.string().matches(quantiteRegExp, "Veuillez le nombre d'unités").required("obligatoire"),
  typeDonation: yup.string().required("obligatoire"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  quantite: "",
  typeDonation:"",
};