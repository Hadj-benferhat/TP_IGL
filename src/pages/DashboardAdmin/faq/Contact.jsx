import { Box, useTheme } from "@mui/material";
import Header from "../../../components/DashboardAdmin/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../../theme";
import useFetch from "../../../hooks/useFetch";
import { useState ,useEffect } from "react";

const Contact = ({token}) => { // comments

  const [comments, setComments] = useState([]);

  const {data , isPending, error} = useFetch(`http://localhost:8000/api/v1/comment`, token);
  useEffect(() => {
    if(data) {
      console.log("the data is this: ")
      console.log(data)
      setComments(data.map((membre, index) => ({ ...membre, id: index+1 })));
    }   
}, [data]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Commentaires" subtitle="Les commentaires laissés par les utilisateurs" />
              {!error && comments && comments.map((commentaire,index) => (
                  <Accordion key={index} sx={{marginBottom : "20px"}}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                          {`Message ${index+1}`}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {commentaire.message}
                        </Typography>
                      </AccordionDetails>
                  </Accordion>
                ))}
    </Box>
  );
};

export default Contact;
