import { Link } from 'react-router-dom';
import SectionTitle from './SectionTitle';
import benevole from '../../assets/images/benevole.svg';
import  adherent from '../../assets/images/adherent.svg';
import partenaire from '../../assets/images/partenaire.svg';
import styled from 'styled-components';

const Card = styled.div`
  text-align: center;
  background-color: #eee;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0 0 0 #000;
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 0 10px #000;
  }
  @media only screen and (min-width: 982px) {
    flex-basis: 32%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
  h3 {
    font-size: 1.5em;
  }
  p{
    text-align: justify;
    margin-bottom: 30px;
  }
  div {
    margin-bottom: 20px;
  }
  div, img {
    width: 100px;
    height: 100px;
  }
`; 

const Button = styled(Link)`
  display: block;
  background-color: #363B58;
  padding: 15px 12px;
  border-radius: 25px;
  width: 170px;
  color: white;
  font-size: 18px;
  margin-top: auto;
  box-shadow: 0 0 10px rgba(54, 59, 88, 0.5); 
  transition: all 0.1s ease;
  &:hover {
    background-color: #0FBA0A;
    box-shadow: 0 0 20px rgba(15, 186, 10, 0.5);
  }
`; 

function BoxRejoignezNous(props) {
  return (
    <Card>
      <div className='devenir-img'>
        <img src={props.icon} alt='benevole-icon' />
      </div>
      <h3> Devenir { ' ' + props.type}</h3>
      <p style={{marginTop: "20px"}}> {props.description} </p>
      <Button to="/Inscription">S'inscrire</Button>
    </Card>
  )
}


const RejoignezNousSection = styled.section`
  min-height: 100vh;
  background-color: #fffffbd5;
`; 
const Container = styled.div`
  padding-top: 70px;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
    width: 93%;
    }
`; 
const Row = styled.div`
@media only screen and (min-width: 982px) {
      display: flex;
      justify-content: space-between;
      align-items: stretch;
      gap: 4%;
      margin-top: 70px;
  }
`; 


export default function RejoignezNous() {
    const textBenevole = "Votre temps et vos compétences peuvent faire la différence dans la vie des personnes dans le besoin. Devenez bénévole pour aider à apporter un changement positif dans notre communauté.";
    const textPartenaire = "Nous avons besoin de partenaires dévoués pour aider à soutenir notre mission et à apporter une aide concrète aux personnes dans le besoin. Devenez notre partenaire pour travailler ensemble à la réalisation de changements positifs";
    const textAdherant = "Joignez-vous à nous pour apporter une aide concrète aux personnes qui ont besoin de notre soutien. Votre adhésion peut faire toute la différence.";

  return (
    <RejoignezNousSection id='rejoignezNous'>
        <Container>
            <SectionTitle mainheading="Rejoignez-nous" />
            <Row>
                <BoxRejoignezNous type="bénévole" description={textBenevole} icon={benevole} />
                <BoxRejoignezNous type="partenaire" description={textPartenaire} icon={partenaire} />
                <BoxRejoignezNous type="adhérent" description={textAdherant} icon={adherent} />
            </Row>
        </Container>
    </RejoignezNousSection>
  )
}