import logo144 from '../../assets/images/logo_194x144.png'
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

/***********header components***********/
const Header = styled.header`
  max-width : 100vw;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  height: calc(4rem + 48px);
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  z-index: 99999;
  a {
    color: black;
  }
  @media only screen and (max-width: 1020px) {
      height: calc(4rem + 40px);
    };
  @media only screen and (max-width: 891px) {
        position: fixed;
        height: calc(2rem + 40px);
    };
`;
const Container = styled.div` 
  font-size: 0.875em;
  padding: 2rem 0;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
      width: 93%;
      font-size: 0.8em;
    }
  @media only screen and (max-width: 1020px) {
    font-size: 0.8em;
    };
  @media only screen and (max-width: 891px) {
    padding: 1rem 0;
    gap: 0;
    };
`;
const Logo = styled.img`
  width: 134px;
  height: 48px;
  @media only screen and (max-width: 1200px) {
    width: 120px;
    height: 48px;
  };
  @media only screen and (max-width: 1020px) {
    width: 110px;
    height: 40px;
  };
  @media only screen and (max-width: 891px) {
    width: 100px;
    height: 38px;
  };
`;
const LogoLink = styled(Link)`
  display: block;
`;
const BurgerList = styled.div`
@media only screen and (max-width: 891px) {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 26px;
      width: 50px;
      height: 43px;
      order: 3;
  }
  @media only screen and (min-width: 892px) {
      display: none;
  }
`;
const Nav = styled.nav``;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
  &:hover {
    transition: 2s;
  }
  @media only screen and (max-width: 1200px) {
        gap: 25px;
  }
  @media only screen and (max-width: 1020px) {
        font-size: 14px;
        gap: 19px;
    }
  @media only screen and (max-width: 891px) {
        display: none; //  a enlever ??
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        right: -200%;
        top: 100%; 
        width: 0;
        overflow: hidden;
        padding: 20px 0;
        background-color: white;
        transition: all .7s ;
        border-top: 2px solid #EEE;
        font-size: 18px;
        gap: 0;
        border-bottom: 2px solid #0FBA0A;
        &.mobile {
          right: 0;
          width: 100%;
        }
    }
  }
`;
const Li = styled.li`
@media only screen and (max-width: 891px) {
      padding: 15px 0;
      /* border-top: 1px solid black; */
      /* border-bottom: 1px solid black; */
      width: 100%;
      text-align: center;
  }
`;
const A = styled.a`
  &:hover, &:active {
    border-bottom: 3px solid #0FBA0A;
    padding-bottom: 6px;
    color: #0FBA0A;
  }
  @media only screen and (max-width: 891px){
      color: #0FBA0A;
      &:hover {
        border: 0;
      }
`;
const ButtonConnexion = styled.div`
  @media only screen and (min-width: 350px) and (max-width: 891px) {
        margin-right: 10px;
    }
`;
const LinkConnexion = styled(Link)`
  display: block;
  padding: 13px 19px ;
  background-color: #0FBA0A;
  font-weight: 600;
  color: white !important;
  border-radius: 23px;
  &:hover{
    background-color: #13a20e;
    color: #E6E6E6;
    transition: .3s;
  }
  @media only screen and (max-width: 1020px) {
      padding: 9px 10px ;
  }
  @media only screen and (max-width: 891px) {
        padding: 6px 6px ;
    }
`;


export default function NavBar() {
  const [screen, setScreen] = useState(window.innerWidth);
  const [isOpen, setIsOpen]= useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.pageYOffset;
      if (currentScroll === 0) {
        setScrollDirection(null);
        document.body.classList.remove('scrolling-up');
      } else if ((currentScroll > lastScroll) && (currentScroll > 100)) {
        setScrollDirection('scrolling-down');
        document.body.classList.remove('scrolling-up');
      } else {
        setScrollDirection('scrolling-up');
        document.body.classList.add('scrolling-up');
      }
      setLastScroll(currentScroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll, screen]);

  useEffect(() => {
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    
  return (
      <Header  className={`header ${scrollDirection}`}>
          <Container>
              <div>
                  <LogoLink to='/'>
                      <Logo src={logo144} alt='logo-sourire'/>
                  </LogoLink>
             </div>
             <BurgerList className={isOpen && 'clicked'} onClick={() => setIsOpen(!isOpen)} >
                {isOpen ? ( <FontAwesomeIcon className="fontawesome" icon={faTimes} /> ) : (
                    <FontAwesomeIcon className="fontawesome" icon={faBarsStaggered} />  )}
            </BurgerList>
            <Nav >
              <Ul className={isOpen ? "mobile" : ""} onBlur={()=> setIsOpen(false)}>
                  {useLocation().pathname === "/" ? <Li><A  href='#home' smooth={true} duration={750} >Acceuil</A></Li>  :  <Li><NavLink to='/'>Acceuil</NavLink></Li>}
                  <Li><A active="true"  href="#association" smooth={true} duration={700}>Association</A></Li>
                  <Li><A  href='#nosMissions' smooth={true} duration={650}>Nos missions</A></Li>
                  <Li><A  href='#actualites'  smooth={true} duration={600}>Actualités</A></Li>
                  <Li><A   href='#rejoignezNous' smooth={true} duration={550}>Rejoignez-nous</A></Li>
                  <Li><A  href='#contact' smooth={true} duration={500}>Contact</A></Li>
              </Ul> 
            </Nav> 
            <ButtonConnexion>
                <LinkConnexion to='/connexion'>Connexion</LinkConnexion>
             </ButtonConnexion>              
          </Container>
      </Header>
  )
}
