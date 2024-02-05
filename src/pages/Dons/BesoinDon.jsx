import { Formik } from "formik";
import * as yup from "yup";
import { Box, Grid,  Button, Typography, TextField} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderDon from "../../components/Dons/HeaderDon";
import styled from "styled-components";

const DonationPage = styled.div`
  min-height : 100vh;
  width : 90vw;
  margin : 0 auto;
  // background-image: url(});   
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding-top : 150px;
`;

export default function BesoinDon() { 


  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate(); 

  const handleFormSubmit = (values) => {

    setIsPending(true);

    fetch("http://localhost:8000/api/v1/helps", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(values)
    }).then(() => {
      console.log("Demande envoyée");
      setIsPending(false);
      navigate("/"); 
    })
    //catch(err => console.log(err)
  };

  return (
    <DonationPage>
    {/* <Container maxWidth="lg" sx={{marginTop:"50px"}}> */}
      <HeaderDon />
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

              <Grid item xs={12} sm={6} sx={{width : "100% !important", margin : "0 !important"}}>
                  <TextField
                  color="primary"  fullWidth  variant="outlined"
                  type="text" label="Prénom" name="firstName"
                  onBlur={handleBlur}  onChange={handleChange}
                  value={values.firstName} 
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
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
                    Ma Situation
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  color="primary"     fullWidth        variant="outlined"
                  type="text"     label="Vous avez besoin de quoi exactement  ?"   name="donNeeded"
                  onBlur={handleBlur}       onChange={handleChange}
                  value={values.donNeeded}
                  error={!!touched.donNeeded && !!errors.donNeeded}
                  helperText={touched.donNeeded && errors.donNeeded}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  color="primary"     fullWidth        variant="outlined" multiline rows={4}
                  type="text"     label="Expliquez votre Situation"   name="situation"
                  onBlur={handleBlur}       onChange={handleChange}
                  value={values.situation}
                  error={!!touched.situation && !!errors.situation}
                  helperText={touched.situation && errors.situation}
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
    </DonationPage>
  )
}


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("obligatoire"), 
  lastName: yup.string().required("obligatoire"),
  email: yup.string().matches(emailRegExp, "email non valide"),
  contact: yup.string().matches(phoneRegExp, "Numéro Téléphone non Valide").required("obligatoire"),
  address: yup.string().required("obligatoire"),
  donNeeded:yup.string().required("obligatoire"),
  situation:yup.string().required("obligatoire"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address: "",
  donNeeded: "",
  situation:"",
};