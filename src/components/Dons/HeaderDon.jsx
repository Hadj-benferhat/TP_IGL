import styled from "styled-components";
import Sourire from '../../assets/images/logo_194x144.png';
import { Link } from "react-router-dom";

export default function HeaderDon() {
  return (
    <Header>
        <Container>
            <LogoLink to='/'>
                    <Logo src={Sourire} alt='logo-sourire'/>
            </LogoLink>
            <Appel>Un geste pour un sourire</Appel>
        </Container>
    </Header>
  )
}


const Header = styled.header`
    height : 100px;
    width : 100%;
    background : white;
    position : absolute;
    top : 0;
    left : 0;
    box-shadow: 0 5px 5px 0 rgba(6, 6, 6, 0.18);
`;
const Container = styled.div`
    width : 70vw;
    display : flex;
    justify-content: space-between;
    align-items : center;
    margin : 0 auto;
    height : 100px
`;

const Logo = styled.img`
  width: 160px;
  height : 60px;
  @media only screen and (max-width: 700px) {
    width: 110px;
    height : 40px;
  };
`;
const LogoLink = styled(Link)`
  display: block;
`;
const Appel = styled.p`
    font-size: 2em;
    text-shadow: 2px 2px 5px rgba(15, 186, 10, 0.5);
    font-weight: 600;
    color : rgb(15, 186, 10);
    text-align : center;
    @media only screen and (max-width: 900px) {
      font-size: 1.5em;
    };
    @media only screen and (max-width: 700px) {
      font-size: 1em;
    };
`;
