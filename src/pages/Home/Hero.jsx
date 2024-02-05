import { Link } from 'react-router-dom';
import styled from 'styled-components';
// import HeroImg from '../../assets/images/hero.png';
import HeroImg from '../../assets/images/finalAccueil.svg';


const HeroSection = styled.section`
  width: 100%;
  min-height: calc(100vh - 4rem + 80px );
  height: auto;
  // margin-top:calc(4rem + 48px);
  margin-top:calc(4rem);
  background-image: url(${HeroImg});   
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  @media only screen and (max-width: 1020px) {
        height: calc(100vh - 4rem -40px);
        margin-top: calc(4rem + 40px);
    }
    @media only screen and (max-width: 891px) {
          padding-bottom: 20px;
          /* min-height: calc(100vh -2rem -1000px); */
          min-height: 100vh;
          height: auto;
          margin-top: 0;
    }
    &.onScrollHero {
      height: 100vh;
    }
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items : center;
  padding-top:200px;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
        width: 93%;
  } 
  @media only screen and (max-height: 800px) {
    padding-top:100px;
  }
`;
const TextHero = styled.div`
  display : flex;
  justify-content: center;
  flex-direction : column;
  align-items : flex-start;
  row-gap : 1rem;
  @media only screen and (max-width: 500px) {
    align-items : center;
    text-align : center;
  } 


  // margin-top: 50px;
  // @media only screen and (min-width: 501px) and (max-width: 891px) {
  //       margin-top: 140px;
  // }
  @media only screen and (max-width: 500px) {
        // margin-top: 100px;
        // line-height:1;
    }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom : 1rem;
  flex-wrap: wrap;  
  gap: 50px;
  @media only screen and (max-width: 1020px) {
    font-size: 16px;
    gap: 20px;
  } 
  @media only screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Button = styled(Link)`
    display: inline-block;
    width: 210px;
    text-align: center;
    padding: 20px 15px ;
    font-weight: 600;
    color: #0FBA0A;
    background-color: white;
    border-radius: 190px;
    &:hover{
      background-color: #e9f1e9;
      transition: .3s;
    }
    `;
const Intro1 = styled.p`
  // font-size: clamp(50px, 7vw, 90px);
  // font-size: clamp(4rem, 1rem + 10vw, 7rem);
  font-size: clamp(4rem, 1rem + 10vw, 5rem); // modify the inMIDDLE width
  text-shadow: 2px 2px 14px rgba(0, 0, 0, 0.3);
  color : rgba(255,255,255, 0.9);
  font-weight: 700;
  @media only screen and (max-width: 500px)and (max-height: 800px) {
    font-size: 3rem;
  }
`;
const Intro2 = styled.p`
  // color: #363B58;
  color : rgba(255,255,255, 0.9);
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: .5px;
  // margin: 20px 0 40px;
`;

export default function Hero() {
  return (
    <HeroSection >
      <Container>
         <TextHero>
            <Intro1>Un geste <br /> pour un <br /> sourire</Intro1>
            <Intro2>Ensemble, faisons la différence</Intro2>
            <Buttons>
              <Button to="/faireDon">Faire un don</Button>
              <Button className='besoin' to="/besoinDon">Besoin d'un don</Button>
            </Buttons>
          </TextHero>
      </Container>
    </HeroSection>
  )
}