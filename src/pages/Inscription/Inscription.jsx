import { Box,Button, TextField,  Typography } from "@mui/material";
import { Formik } from "formik";
import styled from "styled-components";
import * as yup from "yup";
import { useState } from "react";
import HeaderComponent from "../../components/Inscription/HeaderComponent";
import HeroImg from '../../assets/images/login-page.jpg';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const loginSchema = yup.object().shape({
  email: yup.string().required("obligatoire").matches(/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/, "email invalide"),
  userName: yup.string().required("obligatoire"),
  password: yup.string().required("obligatoire"),
});

const initialValuesLogin = {
  email: "",
  userName: "",
  password: "",
};



const Inscription = ( { handleLogin } ) => {
  const navigate = useNavigate();
  const [seConnecter, setSeConnecter] = useState(false);
  const toggleSeConnecter = () => {
    setSeConnecter(!seConnecter);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const { token } = await response.json();
      handleLogin(token);
      const decodedToken = jwt_decode(token);
      console.log("token", decodedToken);
    } catch (error) {
      console.log("error", error.message);
    }
  };


  return (
    <InscriptionPage>
          <HeaderComponent seConnecter={seConnecter} toggleSeConnecter={toggleSeConnecter} />
          <Box>
            <BoxForm>
                  <Box width="100%" marginBottom="20px" textAlign ="center">
                    <Typography fontWeight="bold" fontSize="32px" sx={{color : "rgb(255, 255, 255)"}}>
                      S'inscrire
                    </Typography>
                  </Box>
                  <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValuesLogin}
                    validationSchema={loginSchema}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleBlur,
                      handleChange,
                      handleSubmit,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <Box width="100%" sx={{position : "relative"}}>
                            <Field
                                  label="E-mail"
                                  type="email"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.email}
                                  name="email"
                                  error={Boolean(touched.email) && Boolean(errors.email)}
                                  helperText={(touched.email && errors.email)}
                                  sx={{ width : "100%", marginBottom : "20px" }}
                              />
                              <Field
                                    InputProps={{
                                      inputProps: {
                                        autoComplete: 'email'
                                      }
                                    }}
                                  label="Nom d'utilisateur"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.userName}
                                  name="userName"
                                  error={Boolean(touched.userName) && Boolean(errors.userName)}
                                  helperText={touched.userName && errors.userName}
                                  sx={{ width : "100%", marginBottom : "20px" }}
                              />
                              <Field
                                  autoComplete="current-password"
                                  label="Mot de passe"
                                  type="password"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  value={values.password}
                                  name="password"
                                  error={Boolean(touched.password) && Boolean(errors.password)}
                                  helperText={(touched.password && errors.password)}
                                  sx={{ width : "100%", marginBottom : "20px" }}
                              />
                        </Box>

                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                              m: "30px 0",
                              p: "14px 0",
                              backgroundColor: "#CE5D4D",
                              color: "white",
                              "&:hover": { backgroundColor : "#a44835" },
                            }}
                        >
                           S'inscrire
                        </Button>
                      </form>
                    )}
                  </Formik> 
                  <Typography
                            onClick= {() => navigate("../connexion") }
                            sx={{
                              color: "#FFF",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                        >
                              Vous avez déjà un compte ? <span style={{color : "#CE5D4D"}}> Se connecter </span>
                    </Typography>          
          </BoxForm>
        </Box>
  </InscriptionPage>
  );
};

export default Inscription;

const InscriptionPage = styled(Box)`
  width : 100vw;
  display : flex;
  justify-content : flex-start;
  align-items : center;
  flex-direction : column;
  min-height : 100vh;
  > div {
    flex-grow : 1;
    display : flex;
    justify-content : center;
    align-items : center;
  }
  background-color: #000;
  background-image: url(${HeroImg});   
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom right;
`;

const BoxForm = styled(Box)`
  width : 90vw;
  padding : 50px 30px 30px 30px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(200, 200, 200, 0.3);
  backdrop-filter: blur(8px);
  margin-bottom :50px;
  min-height = 70vh;
  text-align =center;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  z-index: 1;
  border-radius: 20px; 
  @media only screen and (min-width: 700px) {
    width : 50vw;
  };   
  @media only screen and (min-width: 1200px) {
    width : 40vw;
  };
  @media only screen and (min-width: 1500px) {
    width : 35vw;
  };
  @media only screen and (max-width: 900px) {
    padding : 30px 10px 10px;
  };
  `

const Field =  styled(TextField)`
  && .MuiInputLabel-root {
    color: #CE5D4D;
    font-weight: 600;
  }
  && {
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #CE5D4D;
      }
    }
  }
`;