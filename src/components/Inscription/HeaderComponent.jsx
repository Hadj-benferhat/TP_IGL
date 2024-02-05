import {  Box, Typography} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";


const LogoLink = styled(Link)`
  display: block;
`;
const Header = styled.header`
  display : flex;
  justify-content : space-between;
  align-items : center;
  margin : 20px auto 30px ;
  width : 90vw;
  span {
    color : #363B58;
    font-weight : 700;
  }
`;
const Button = styled.div`
  @media only screen and (min-width: 350px) and (max-width: 891px) {
        margin-right: 10px;
    }
`;
const LinkConnexion = styled(Link)`
  display: inline-block;
  padding: 9px 10px ;
  background-color: #CE5D4D;
  font-weight: 700;
  color: white ;
  border-radius: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  font-size: 0.7rem;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  &:hover{
    background-color: #a44835;
    transition: .3s;
  }

  @media only screen and (max-width: 1020px) {
      padding: 9px 10px ;
  }
  @media only screen and (max-width: 891px) {
      padding: 6px 16px;
    }
`;

export default function HeaderComponent({ seConnecter, toggleSeConnecter }) {
  return (
    <Header> 
    <LogoLink to='/'>
              {/* <Logo src={logo} alt='logo-sourire'/> */}
              <LinkConnexion 
                to={"/"}
              >
                 Page d'acceuil
              </LinkConnexion>
    </LogoLink>
    <Box sx={{display : "flex", alignItems : "center"}}>
        <Typography  sx={{marginRight : "20px", fontSize: "20px", fontWeight : 400}}>
            <span style={{color : "#FFF"}}>   {seConnecter ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"} </span>
        </Typography>
        <Button>
            <LinkConnexion 
                to={seConnecter ? "/inscription" : "/connexion"} onClick={toggleSeConnecter}
            >
               {seConnecter ? "S'inscrire" : "Se connecter"} 
            </LinkConnexion>
        </Button>   
    </Box>
</Header>
  )
}
