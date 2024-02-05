import {  Box, Button, TextField} from "@mui/material";
import Header from "../../../components/DashboardAdmin/Header";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useState } from "react";

const style = { marginTop: "20px", marginBottom: "20px", display: 'block'};

export default function AddFaq({token}) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (question && answer) { 
       console.log(question, answer);
       fetch("http://localhost:8000/api/v1/FAQ", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ question, answer}) 
      }).then(() =>     console.log("new faq added")) 
      .catch((err) => console.log(err));
    }

      // these just for affichage  
      setQuestionError(false);
      setAnswerError(false);
      if (question === "") {
        setQuestionError(true);
        }
      if (answer === "") {
            setAnswerError(true);
      }}

 // pour revenir au mm theme cas aprés error
  const handleInputFocus = (inputName) => {
    if (inputName === "question") {
      setQuestionError(false);
    } else if (inputName === "answer") {
      setAnswerError(false);
    }
  };

  return (
    <Box m="20px">      
      <Header title="AJOUTER QUSETION ET RÉPONSE" subtitle="Ajouter Une question frequement posée" />
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>  {/* the submit event in that form is on the button */}
          <TextField 
            onFocus={() => handleInputFocus("question")}
            onChange={(e) => setQuestion(e.target.value)}
            sx={ style}
            variant="outlined" 
            label="Question"
            color="secondary"
            fullWidth
            required
            error={questionError}
          />
          <TextField 
            onFocus={() => handleInputFocus("answer")}
            onChange={(e) => setAnswer(e.target.value)}
            sx={style}
            variant="outlined" 
            label="Réponse de la question"
            color="secondary"
            fullWidth
            multiline
            rows={4}
            required
            error={answerError}
          />
          
          <Button 
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