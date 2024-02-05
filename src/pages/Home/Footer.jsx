import logoblanc from  '../../assets/images/SourireFooter.png';
import JetBrains from  '../../assets/images/JetBrains.png';
import Yassir from  '../../assets/images/Yassir.png';
import Djezzy from  '../../assets/images/Djezzy.png';
import Condor from  '../../assets/images/Condor.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faAt, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';


/***********footer components***********/
const FooterComponent = styled.footer`
    width: 100%;
    background-color: #000;
    text-align: left;
    font-size: 17.5px;
    color: white;
    .icon {
        font-size: 1.5em;
        color: #CE5D4D;
    }
    ul {
        list-style-type: none;
    }
    a {
        color: white;
    }
    @media only screen and (max-width: 1200px) {
        font-size: 16px;
    }
    @media only screen and (max-width: 891px) {
        .icon {
            font-size: 1em;
        }
    }
`;
const Container = styled.div`
   display: grid;
   grid-template-columns: 2fr 1fr 1fr 1fr;
   padding: 60px 0;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
      width: 93%;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @media only screen and (max-width: 891px) {
        grid-template-columns: 1fr;
    }
`;
const H3 = styled.h3`
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    height: 75px;
    align-items: center;
    vertical-align: center;
    @media only screen and (max-width: 891px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        }
`;
const UlBoxe = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    font-weight: 350;
`; 
const Boxfooter1 = styled.div`
    div {
        margin: 35px 0;
    }
    .icon {
        display: inline-block;
        margin-right: 15px;
      }
    @media only screen and (max-width: 891px) { 
        a, div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }  
        .icon {
            margin: 0 0 10px 0;
        }
        div {
            margin-bottom: 30px;
            font-weight: 400;
            margin-top: 0;
        }  
        img {
            width: 130px;
        }
    }
    grid-row: 1/3;
    font-weight: 500;
    @media only screen and (max-width: 1200px) {
        grid-row: 1/2;
        grid-column: 1/3;
    }
    @media only screen and (max-width: 891px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        grid-row: 1/2;
        grid-column: 1/2;
    }
`;

const Logo = styled.div`
    @media only screen and (min-width: 892px) {
        margin: 0 !important;
    }
    height: 75px;
    align-items: center;
    vertical-align: center;
`;
const Boxfooter1Paragraph = styled.div`
    margin-bottom: 60px;
    font-family: 'Averia Sans Libre', cursive;
    font-size: 20px;

    @media only screen and (max-width: 891px) {
        font-size: 1.1em;
        text-align: center;
        font-weight: 300;
        margin-top: 25px;
        margin-bottom: 30px;
        font-weight: 400;
        margin-top: 0;
    }
`;
const PhoneNumber = styled.div`
    margin: 35px 0;
`; 
const Location = styled.div`
    display: flex;
    div {
        margin: 0;
    }
`;

const Boxfooter2 = styled.div`
    @media only screen and (max-width: 1200px) {
        grid-row: 1/2;
        grid-column: 2/3;
    }
    @media only screen and (max-width: 891px) {
        grid-column: 1/2;
        grid-row: 2/3;
    }
`;
const Boxfooter3 = styled.div`
    @media only screen and (max-width: 1200px) {
        grid-row: 2/3;
        grid-column: 1/2;
    }
    @media only screen and (max-width: 891px) {
        grid-column: 1/2;
        grid-row: 3/4;    
    }
`;
const Boxfooter4 = styled.div`
    @media only screen and (max-width: 1200px) {
        grid-row: 2/3;
        grid-column: 2/3;
    }
    @media only screen and (max-width: 891px) {
        grid-column: 1/2;
        grid-row: 4/5;    
    }
`;
const Boxfooter5 = styled.div`
    grid-column: 4/5;
    font-size: 20px;
    div {
        display : flex;
        flex-wrap: no-wrap;
    }
    @media only screen and (max-width: 1200px) {
        grid-row: 3/4;
        grid-column: 1/4;
    }
    @media only screen and (max-width: 891px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        grid-column: 1/2;
        grid-row: 5/6;
        margin-top: 20px;
    }
`;
const ParagraphBox5 = styled.div`
    margin-bottom: 20px;
    font-weight: 700;
`;
const ImgBox5 = styled.img`
    display: inline-block;
    margin: 0 10px;
`;
const UlReseaux = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    gap: 50px;
    list-style-type: none;
`;
const Copyright = styled.div`
    background-color: #000;
    text-align: center;
    padding: 10px 0;
    border-top: 1px solid #CE5D4D; 
    @media only screen and (max-width: 891px) {
        p {
            font-size: 0.8em;
            padding: 0 10px;
        }
        padding: auto 10px;
        .icon {
            font-size : 1.2em;
        }
    }
`;
const LiContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    a {
        transition: 0.3s;
    }
    &:hover a {
        padding-left:10px;
        font-weight: 500;
    }
    @media only screen and (max-width: 891px) {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
`;
const Adresse = styled.div`
    line-height: 1.5;
    @media only screen and (max-width: 891px) {
        text-align: center;
    }
`;




/*********** Footer ***************/
export default function Footer() {
  return (
    <FooterComponent>
        <Container>
            <Boxfooter1>
              <Logo>  <img src={logoblanc} alt="sourire logo footer" /> </Logo>
              <Boxfooter1Paragraph>Club à but non lucratif pour réaliser les projets </Boxfooter1Paragraph>
              <PhoneNumber><a href="tel:+213 666067322"> <FontAwesomeIcon className='icon' icon={faPhone} />  +213 666067322</a></PhoneNumber>
              <div><a href="mailto:lc_chemini@esi.dz"> <FontAwesomeIcon className='icon' icon={faAt} />  lc_chemini@esi.dz</a></div>
              <Location>
                <div><FontAwesomeIcon className='icon' icon={faLocationDot} /></div>
                <Adresse><address>Ecole nationale Supérieure d’Informatique ESI,<br/> Oued Smar Alger, Algérie</address></Adresse>
              </Location>
            </Boxfooter1>
            <Boxfooter2>
                <H3>Compagnie</H3>
                <UlBoxe>
                    <LiContainer><a active="true" href='#home' smooth="true" duration={550} > Acceuil</a></LiContainer>
                    <LiContainer><a active="true" href="#association" smooth="true" duration={600}>Qui sommes-nous ?</a></LiContainer>
                    <LiContainer><a  href='#nosMissions' smooth="true" duration={650}>Nos missions</a></LiContainer>
                    <LiContainer><a  href='#actualites'  smooth="true" duration={700}>Actualités</a></LiContainer>
                    <LiContainer><a   href='#rejoignezNous' smooth="true" duration={750}>Rejoignez-nous</a></LiContainer>
                </UlBoxe>
            </Boxfooter2>
            <Boxfooter3>
                <H3>Aide</H3>
                <UlBoxe>
                    <LiContainer> <a href='#faq'>FAQ</a> </LiContainer>
                    <LiContainer> <a href='#contact'>Contact</a> </LiContainer>
                </UlBoxe>
            </Boxfooter3>
            <Boxfooter4>
                <H3>Légal</H3>
                <UlBoxe>
                    <LiContainer> <a href='#fares'>Conditions générales</a> </LiContainer>
                    <LiContainer> <a href='#fares'>Politique et Confidentialités</a> </LiContainer>
                    <LiContainer> <a href='#fares'>Notification de droits d'auteur</a> </LiContainer>
                    <LiContainer> <a href='#fares'>Cookies settings</a> </LiContainer>
                </UlBoxe>
            </Boxfooter4>
            <Boxfooter5>
                    <ParagraphBox5>Ils nous ont fait confiance</ParagraphBox5>
                    <div>
                        <ImgBox5 src={JetBrains} alt="JetBrains" />
                        <ImgBox5 src={Yassir} alt="Yassir" />
                        <ImgBox5 src={Djezzy} alt="Djezzy" />
                        <ImgBox5 src={Condor} alt="Condor" />   
                    </div>
            </Boxfooter5>
        </Container>

        <Copyright>
            <p>Copyright &copy; 2008 - 2023 TP IGL. Tous droits réservés.</p>
            <UlReseaux> 
                <li> <a href='https://instagram.com/' target="_blank" rel="noopener noreferrer"> <FontAwesomeIcon className='icon' icon={faInstagram} /> </a> </li>
                <li> <a target="_blank" href='https://web.facebook.com/' rel="noopener noreferrer"> <FontAwesomeIcon className='icon' icon={faFacebook} /> </a> </li>
                <li> <a target="_blank" href='https://www.linkedin.com/' rel="noopener noreferrer"> <FontAwesomeIcon className='icon' icon={faLinkedin}  /> </a> </li>
            </UlReseaux>
        </Copyright>
    </FooterComponent>
  )
}