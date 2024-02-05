import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import Header from "../../../components/DashboardAdmin/Header";
import StatBox from "../../../components/DashboardAdmin/StatBox";
import { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const Dashboard = ({token, numAdherents, numBenevoles, numPartenaires}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [besoins, setBesoinsDons] = useState([]);
  const {data , isPending, error} = useFetch(`http://localhost:8000/api/v1/helps`, token);
  useEffect(() => {
    if(data) {
      setBesoinsDons(data.map((membre, index) => ({ ...membre, id: index+1 })));
    }   
}, [data]);


  const setConfirmer = id => {
    fetch(`${process.env.REACT_APP_URL}/DonsEnAttente/${id}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({}) 
    })
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box
        sx = {{
          display: "flex",
          flexDirection: {
            sm: "row",
            xs: "column", 
          },
          justifyContent:"space-between", 
          alignItems:"stretch",
          marginBottom: {
            xs: "20px", 
          }
        }}
        >
        <Header title="DASHBOARD" subtitle="Bienvenue dans Votre dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: {
                xs: "4px 5px",
                sm: "10px 20px",
              },
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Télécharger Rapports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6",  md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <StatBox
            title="1,236"
            subtitle="Emails Reçus"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6",  md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numAdherents}
            subtitle="Nouveaux Adhérents"
            progress="0.50"
            increase="+21%"
            icon={
              <PeopleOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6",  md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numBenevoles}
            subtitle="Nouveaux Bénévoles"
            progress="0.30"
            increase="+5%"
            icon={
              <ContactsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={{ xs: "span 12", sm: "span 6",  md: "span 3"}}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={numPartenaires}
            subtitle="Nouveaux Partenaires"
            progress="0.80"
            increase="+50%"
            icon={
              <ReceiptOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>       
        {/* ROW 3 */}
        <Box
          sx={{marginTop: "30px"}}
          gridColumn={{ xs: "span 12"}}
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {/* <Accordion >
            <AccordionSummary >
              <Typography color={colors.greenAccent[500]} variant="h5">
                An Important 
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Add from filtre and  here map wiith keyyy
              </Typography>
            </AccordionDetails>
          </Accordion> */}
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
              <Typography color={colors.grey[100]} variant="h3" fontWeight="700">
                Besoins des Dons
              </Typography>
            </Box>
            {/* Datas */}
            {besoins.map((besoin, i) => (
            <Box
              key={`${besoin._id}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {besoin.id}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {besoin.firstName + besoin.lastName}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{besoin.address}</Box>
              <Box color={colors.grey[100]}>{besoin.email}</Box>
              <Box color={colors.grey[100]}>{besoin.contact}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                Situation
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;

// donNeeded;
// situation;
// traite;