import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faAt, faLocationDot, faUser, faComment} from '@fortawesome/free-solid-svg-icons';
import SectionTitle from './SectionTitle';
import Image from '../../assets/images/CONTACTUS.png';
import styled from 'styled-components';
import { Formik } from "formik";
import * as yup from "yup";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';


const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("obligatoire"), 
  lastName: yup.string().required("obligatoire"),
  email: yup.string().matches(emailRegExp, "email non valide").required("obligatoire"),
  contact: yup.string().matches(phoneRegExp, "Numéro Téléphone non Valide").required("obligatoire"),
  subject: yup.string().required("obligatoire"),
  message: yup.string().required("obligatoire"),
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  subject: "",
  message: "",
};

export default function Contact() {

  const [isPending, setIsPending] = useState(false);

  const handleFormSubmit = (values) => {
      setIsPending(true);
      fetch("http://localhost:8000/api/v1/contactus", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      }).then(res => {
        if (res.ok) {
          return res.json(); // Return a promise that resolves with the parsed JSON data
        } else {
          throw new Error('Something went wrong');
        }
      }).then(data => {
        console.log(data.msg);
        setIsPending(false);
      }).catch(err => {
        console.log(err);
      });
    }

  return (
     <ContactSection id="contact">
         <Container>
           <SectionTitle mainheading='Contactez-nous' />
           <ContactContent>
              <Infos>
                  <p style={{color : "#CE5D4D"}}>Nous apprécions vos commentaires! Contactez-nous pour toute suggestion ou proposition pour nous aider à mieux vous servir.</p>
                  <Informations>
                          <div><a className='phoneAndemail' href="tel:+213 666067322"> <FontAwesomeIcon className='icon xs-icon-hidden' icon={faPhone} />  +213 666067322</a></div>
                          <div><a className='phoneAndemail' href="mailto:lc_chemini@esi.dz"> <FontAwesomeIcon className='icon xs-icon-hidden' icon={faAt} />  lc_chemini@esi.dz</a></div>
                          <Location>
                              <div><FontAwesomeIcon className='icon xs-icon-hidden' icon={faLocationDot} /></div>
                              <Addresse>
                                  <address> Ecole nationale Supérieure d'Informatique ESI,<br/> Oued Smar Alger, Algérie </address>
                              </Addresse>
                          </Location>
                      </Informations>
                      <Map>
                           <iframe 
                                  title="location de sourire" 
                                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3198.7317117835323!2d3.173896!3d36.7049844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e522f3f317461%3A0x215c157a5406653c!2sEcole%20Nationale%20Sup%C3%A9rieure%20d&#39;Informatique%20(Ex.%20INI)!5e0!3m2!1sfr!2sdz!4v1679094133180!5m2!1sfr!2sdz" 
                                  allowFullScreen={true} 
                                  loading="lazy" 
                                  referrerPolicy="no-referrer-when-downgrade">
                          </iframe>
                      </Map>
              </Infos>

              <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                  validationSchema={checkoutSchema}
              >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                <Formulaire onSubmit={handleSubmit}>
                        <p style={{color : "#CE5D4D"}}>24/7 Nous répondrons à vos questions et problèmes</p>
                        <NomPrenom>
                            <div>
                                  <Label htmlFor="lastName">Nom</Label>
                                  <InputD>
                                      <FontAwesomeIcon className='icon-form' icon={faUser} /> 
                                      <input 
                                        className='contact-us-input' style ={{marginBottom: 0}} 
                                        value={values.lastName} onChange={handleChange} 
                                        type="text" name="lastName" id="lastName" placeholder="Entrer votre nom" 
                                      />
                                  </InputD>    
                            </div>
                            <div>
                                  <Label htmlFor="firstName">Prénom</Label>
                                  <InputD>
                                      <FontAwesomeIcon className='icon-form' icon={faUser} /> 
                                      <input 
                                        className='contact-us-input' style ={{marginBottom: 0}} 
                                        value={values.firstName} onChange={handleChange}
                                        type="text" name="firstName" id="firstName" placeholder="Entrer votre prénom" 
                                      />
                                  </InputD> 
                            </div>
                        </NomPrenom>
                            <Label htmlFor="email">E-mail</Label>
                            <InputD>
                                <FontAwesomeIcon className='icon-form' icon={faUser} /> 
                                <input 
                                  className='contact-us-input' type="email" name="email" id="email" 
                                  value={values.email} onChange={handleChange}  placeholder="exemple1234@gmail.com"
                                />
                            </InputD>  
                            <Label htmlFor="contact">Téléphone</Label>
                            <InputD>
                                <FontAwesomeIcon className='icon-form' icon={faPhone} /> 
                                <input  
                                   className='contact-us-input' type="tel" name="contact" 
                                   id="contact" placeholder="+213 792 54 02 52"
                                   onChange={handleChange} value={values.contact}
                                />
                            </InputD>  
                            <Label htmlFor="subject">Sujet</Label>
                            <InputD>
                                <FontAwesomeIcon className='icon-form' icon={faComment} /> 
                                <input 
                                  className='contact-us-input' type="text" name="subject" 
                                  id="subject" placeholder="Entrer le sujet de votre message"
                                  onChange={handleChange} value={values.subject} 
                                />
                            </InputD>  
                          <Label  htmlFor="message">Message</Label> 
                          <TextArea
                             type="text" name="message" id="message" 
                             placeholder='Entrer votre message...'
                             onChange={handleChange} value={values.message}
                          />
                              <SubmitButton type="submit">
                                  {isPending ?(
                                  <span className='soumission'>
                                       Soumission en cours...
                                      <CircularProgress sx={{color : "white", marginLeft: "10px", display : "inline-block", width : "24px !important", height: "24px !important"}} />
                                  </span> )
                                    : "Soumettre"}
                              </SubmitButton> 
                  </Formulaire> )}
              </Formik>
           </ContactContent>
        </Container>
       </ContactSection>
   )
}

const ContactSection = styled.section`
   background-color: #000;
   background-image: url(${Image});   
   background-repeat: no-repeat;
   background-size: cover;
   background-position: bottom right;
  font-size: 17.5px;
  min-height: 100vh; 
  @media only screen and (max-width: 768px) {
    .xs-icon-hidden {
      display : none !important;
    }
  }
  a {
    color : #939599;
  }
`;

const Container = styled.div`
  padding-top: 70px;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
      width: 93%;
  }
`;
const ContactContent = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  .icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 15px;
    font-size: 1.5em;
    color: #CE5D4D;
  }
  p {
    max-width: 550px;
    line-height: 2;
    color: #363B58;
  }
  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p{
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      line-height: 2;
    }
  }
`;
const Infos = styled.div`
  flex-basis: 45%;
  position: relative;
  @media only screen and (min-width: 1201px) {
    height: 661px;
  }
  @media only screen and (max-width: 1200px) { 
    width: 100%;
  }
`;
const Informations = styled.div`
  margin-top: 44px;
  font-weight: 500;
  .phoneAndemail {
    display: flex;
    align-items: center;
  }
  @media only screen and (max-width: 1200px) {
    display: flex;
    justify-content: space-between;
    > div {
      flex-basis: 30%;
    }
    > div a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    > div {
      margin-bottom: 25px;
    }
    > div a {
      flex-direction: row;
    }
  }
  .icon {
    border: 1px solid rgba(206, 93, 77, 0.1);
    background: rgba(206, 93, 77, 0.1);
    border-radius: 100%;
    padding: 10px;
  }
  > div {
    margin-bottom: 30px;
  }
 `;
 const Location = styled.div`
 display: flex;
 @media only screen and (max-width: 1200px) {
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
 }
`;
const Addresse = styled.div`
  @media only screen and (max-width: 768px) {  
    text-align: center;
  }
  address {
    color: #939599; // to modify ???
  }
`;
const Map = styled.div`
  width: 100%;
  @media only screen and (min-width: 1201px) {
      position: absolute;
      bottom: 0;
  }
  @media only screen and (max-width: 1200px) {
    margin: 20px 0;
    iframe {
      max-width: 100% !important;
    }
  }
  iframe {
    width: 100%;
    max-width: 550px;
    height: 300px;
    border: 1px dashed rgb(194, 194, 194);
  }
`;
const Formulaire = styled.form`
  padding: 20px 40px;
  line-height: 2;
  flex-basis: 50%;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: rgba(200, 200, 200, 0.3);
  input {
    display: block;
    border: 0;
    outline: 0;
    padding: 10px 20px 10px 35px; 
    margin-bottom: 10px;
    width: 100%;
    border-radius: 20px;  
    font-size: 1em;
    border: 1px solid transparent;
  }
  input::placeholder {
    font-size: .9em;
  }
  input.contact-us-input{
    background-color: white;
  }
  input.contact-us-input:hover,  input.contact-us-input:focus {
    border: 1px solid green; 
  }
  @media only screen and (max-width: 1200px) {
    width: 100%;
    margin-bottom: 25px;
  } 
  .icon-form {
    position: absolute;
    top: 12px;
    left: 12px;
    color: #CE5D4D !important;
  }
  @media only screen and (max-width: 768px) {
    padding: 20px 10px;
  } 
`;
const NomPrenom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    > div {
      flex-basis: 47%;
      margin-bottom: 0;
    }
    @media only screen and (max-width: 768px) {
      flex-direction: column;
      > div{
          width: 100%;
      }
`;
// --------------- DivInput
const Label = styled.label`
  margin-left: 10px;
  display: block;
  color: #CE5D4D;
`;
const InputD = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;


// ----------------------------------
const TextArea = styled.textarea`
  display: block;
  border: 0;
  outline: 0;
  padding: 10px 20px 10px 35px;
  width: 100%;
  border-radius: 20px;
  background-color: white;
  font-size: 1em;
  border: 1px solid transparent;
  height: 130px;
  resize: none;
  margin-bottom: 20px;
  ::placeholder {
    font-size: .9em;
  }
  &:hover, &:focus {
   border: 1px solid green; 
  }
`;
const SubmitButton = styled.button`
  background-color: #CE5D4D;
  border-radius: 20px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  padding: 13px 0;
  margin-bottom: 10px;
  width: 100%;
  border-radius: 20px;  
  font-size: 1em;
  border: 0;
  .soumission {
    display : flex;
    justify-content: center;
    align-items: center;
  }
`;