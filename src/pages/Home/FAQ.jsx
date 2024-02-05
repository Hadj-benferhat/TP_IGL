import {useState, useEffect} from "react";
import styled from "styled-components";
import Grid from '@mui/material/Grid';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LinearProgress from '@mui/material/LinearProgress';
import FaqQuestion from '../../assets/images/FaqQuestion.png';
import FaqAnswer from '../../assets/images/FaqAnswer.png';
import SectionTitle from './SectionTitle';
import useFetch from '../../hooks/useFetch';

const FAQSection = styled.section`
  min-height: 100vh;
  background-color: #eee;
`;

const Container = styled.div`
    padding-top: 70px;
    padding-bottom: 70px;
    width: 87%;
    margin: 0 auto;
    background: url(${(props) => props.myImage1}), url(${(props) => props.myImage2});
    background-position: top right, bottom left;
    background-repeat: no-repeat;
    @media only screen and (max-width: 1200px) {
        width: 93%;
    }
`;

const Element = styled(Accordion)`
    border-radius: 18px !important;
    box-shadow: 2px 7px 24px -11px rgba(0,0,0,0.75) !important;
    cursor: pointer;
   .MuiButtonBase-root {
        background: ${props => props.$isExpanded ? "#363B58" : "white"}; 
        color: ${props => props.$isExpanded ? "#fff" : "black"};
        border-radius: ${props => props.$isExpanded ? "18px 18px 0 0" : "18px"};
        box-shadow: ${props => props.$isExpanded ? "0px 2px 10px 0px rgba(0,0,0,0.8)" : "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"};
        transition: all 0s ease-in-out;
        padding: 5px 30px;
   }
`;

const FAQ = () => {

   const handleClick = (index) => {
    const newExpanded = [...isExpanded];
    newExpanded[index] = !newExpanded[index];
    setIsExpanded(newExpanded);
  };
  
  const [quesAns, setQuesAns] = useState([]);  
  
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/FAQ");
//     const {data , isPending, error} = useFetch(`${process.env.REACT_APP_URL}/FrequentlyAskedQuesions`);
  
  useEffect(() => {
      if(data)    setQuesAns(data);
  }, [data]);

  const [isExpanded, setIsExpanded] = useState(Array(quesAns.length).fill(false));
  
  return (
    <FAQSection>
        <Container myImage1={FaqQuestion} myImage2={FaqAnswer}>
            <SectionTitle mainheading='FAQs' />
            <Grid container spacing={5}>
                {isPending && <Grid  item xs={12}  sx={{width:"100%"}}>  <LinearProgress color="secondary" /></Grid>}
                {error && 
                    <Grid  item xs={12} sm={6} >
                        <Typography>
                            {error} 
                        </Typography>
                    </Grid>
                }
                {!error && quesAns && quesAns.map((qesAn,index) => (
                <Grid  item xs={12} sm={6} key={index}>   
                    <article> 
                        <Element  onClick={ () => handleClick(index)}
                                $isExpanded={isExpanded[index]}
                        >
                            <AccordionSummary sx={{padding : "0 30px", overflowX : "auto"}} expandIcon={<ExpandMoreIcon  sx={{color: isExpanded[index] ? 'white' : '#0FB0A0'}}/>}>
                                <Typography sx={{fontWeight : "500",userSelect:"none !important", fontFamily: "'Inter', sans-serif !important"}}>
                                    {qesAn.question} 
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{padding : "20px 30px", overflowX : "auto"}}>
                                <Typography sx={{ fontFamily: "'Inter', sans-serif !important"}}>
                                    {qesAn.answer}
                                </Typography>
                            </AccordionDetails>
                        </Element>
                    </article>
                </Grid>
                ))}
            </Grid> 
        </Container>
    </FAQSection>
  );
};
export default FAQ;