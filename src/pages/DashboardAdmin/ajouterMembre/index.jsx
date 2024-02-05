import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/DashboardAdmin/Header";
import { useNavigate } from "react-router-dom";


const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const checkoutSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, "email non valide").required("obligatoire"),
  userName: yup.string().required("obligatoire"),
  password: yup.string().required("obligatoire"),
});
const initialValues = {
  email: "",
  userName: "",
  password: "",
  role : "moderateur"
};


const Form = ({token}) => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {

  fetch(`http://localhost:8000/api/v1/createModerator/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify(values)
  }).then(res => {
    if (res.ok) {
      return res.json(); 
    } else {
      throw new Error('Something went wrong');
    }
  }).then(data => {
    console.log(data.msg); 
    navigate("/connexion/team");
  }).catch(err => {
    console.log(err);
  });
};


  return (
    <Box m="20px">
      <Header title="Ajouter Modérateur" subtitle="Ajouter profil d'un nouveau modérateur" />
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
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                color="secondary"
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
                            <TextField
                color="secondary"
                fullWidth
                variant="filled"
                type="text"
                label="Nom d'utilisateur"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.userName}
                name="userName"
                error={!!touched.userName && !!errors.userName}
                helperText={touched.userName && errors.userName}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                color="secondary"
                fullWidth
                variant="filled"
                type="text"
                label="Mot de passe"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Ajouter Nouveau membre
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};


export default Form;