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

const FAQ = ({token}) => { 
  const [faqs, setFaqs] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/FAQ", token);
  useEffect(() => {
    if(data) {
      setFaqs(data);
    }   
}, [data]);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQs" subtitle="Les Questions fréquemment posées par les utilisateurs" />
              {!error && faqs && faqs.map((questionAnswer,index) => (
                  <Accordion key={index} sx={{marginBottom : "20px"}}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography color={colors.greenAccent[500]} variant="h5">
                          {questionAnswer.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {questionAnswer.answer}
                        </Typography>
                      </AccordionDetails>
                  </Accordion>
                ))}
    </Box>
  );
};

export default FAQ;
