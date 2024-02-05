import { Box, Badge, IconButton, Tooltip, useTheme, Popover,  TextField, InputAdornment, Button } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import LoadingButton from '@mui/lab/LoadingButton';
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SaveIcon from '@mui/icons-material/Save';
import { LogoutOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Topbar = ({handleLogout, token}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false); // <-- Add this

  const handleNotificationsClick = (event) => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFormSubmit = (values) => {
    setIsPending(true);
  
    fetch(`http://localhost:8000/api/v1/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(values)
  }).then(res => {
    if (res.ok) {
      return res.json(); // Return a promise that resolves with the parsed JSON data
    } else {
      throw new Error('Something went wrong');
    }
  }).then(data => {
    console.log(data.msg); // Log the message from the JSON data
    navigate("/connexion/team");
  }).catch(err => {
    console.log(err);
  });
  setIsPending(false);
};

  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{ '@media (max-width: 600px)': {flexDirection: 'column'}}}>
        {/* SEARCH BAR */}
        <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" sx={{ '@media (max-width: 600px)': {order : 2 }}}>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Rechercher" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
        </Box>

        {/* ICONS */}
        <Box display="flex" sx={{ '@media (max-width: 600px)': {order : 1 ,  alignSelf : "flex-end"}}}>
            <Tooltip title={theme.palette.mode === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            {/*  */}
            <Tooltip title="Notifications">
              <IconButton onClick={handleNotificationsClick}>
                <Badge badgeContent={4} color="error">
                  <NotificationsOutlinedIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          <Box>
            <Tooltip title="Paramètres">
              <IconButton aria-describedby={id} onClick={handleClick}>
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                  }}
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                  }}
            >
            <Box p={2} sx={{padding : "20px"}}>
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
                           Width : "100%"
                        }}
                      >
                        <TextField
                          color="secondary"
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Email((Nouveau))"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.email}
                          name="email"
                          error={!!touched.email && !!errors.email}
                          helperText={touched.email && errors.email}
                          sx={{ gridColumn: "span 4" }}
                          margin="dense"
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><SettingsOutlinedIcon /></InputAdornment>,
                          }}
                        />
                        <TextField
                          color="secondary"
                          fullWidth
                          variant="outlined"
                          type="text"
                          label="Téléphone((Nouveau))"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.contact}
                          name="contact"
                          error={!!touched.contact && !!errors.contact}
                          helperText={touched.contact && errors.contact}
                          sx={{ gridColumn: "span 4" }}
                          margin="dense"
                          InputProps={{
                              endAdornment: <InputAdornment position="end"><SettingsOutlinedIcon /></InputAdornment>,
                          }}
                        />

                          <TextField
                            color="secondary"
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Mot de passe(Ancien)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.oldPassword}
                            name="oldPassword"
                            error={!!touched.oldPassword && !!errors.oldPassword}
                            helperText={touched.oldPassword && errors.oldPassword}
                            sx={{ gridColumn: "span 4" }}
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SettingsOutlinedIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                            color="secondary"
                            fullWidth
                            variant="outlined"
                            type="text"
                            label="Mot de passe(Nouveau)"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.newPassword}
                            name="newPassword"
                            error={!!touched.newPassword && !!errors.newPassword}
                            helperText={touched.newPassword && errors.newPassword}
                            sx={{ gridColumn: "span 4" }}
                            margin="dense"
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SettingsOutlinedIcon /></InputAdornment>,
                            }}
                        />
                        <TextField
                          InputProps={{
                            endAdornment: <InputAdornment position="end"><SettingsOutlinedIcon /></InputAdornment>,
                          }}
                          color="secondary"
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          type="text"
                          label="Nom d'utilisateur (Nouveau)"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.userName}
                          name="userName"
                          error={!!touched.userName && !!errors.userName}
                          helperText={touched.userName && errors.userName}
                          sx={{ gridColumn: "span 4" }}
                        />
                      </Box>
                      <Box display="flex" justifyContent="end" mt="20px">
                      { isPending ? ( 
                            <LoadingButton
                            disabled
                            loading
                            loadingPosition="start"
                            startIcon={<SaveIcon />}
                            variant="outlined"
                          >
                            Soumission en cours...
                          </LoadingButton>) : (
                            <Button type="submit" color="secondary" variant="contained">
                                Confirmer les changements
                            </Button>
                       )}
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </Popover>
            </Box>
            {/*  */}
            {/* <Tooltip title="Paramètres">
              <IconButton>
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Se déconnecter">
              <IconButton onClick={
                () => {
                  handleLogout();
                  navigate("/connexion");
                }
              }
              >
                <LogoutOutlined />
              </IconButton>
            </Tooltip>
        </Box>
    </Box>
  );
};

export default Topbar;

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const checkoutSchema = yup.object().shape({
  email: yup.string().matches(emailRegExp, "email non valide").required("obligatoire"),
  contact: yup.string().matches(phoneRegExp, "Numéro Téléphone non Valide").required("obligatoire"),
  userName: yup.string().required("obligatoire"),
  oldPassword: yup.string().required("obligatoire"),
  newPassword: yup.string().required("obligatoire"),
});
const initialValues = {
  oldPassword: "",
  newPassword: "",
  email: "",
  contact: "",
  userName: "",
};