import { Link } from 'react-router-dom';
import ErrorIllustration from '../../assets/images/404.svg';
import styled from 'styled-components';


const ImageWrapper = styled.div`
  width : clamp(500px, 90vw , 800px);
`;

const ErrorWrapper = {
  margin: "30px",
  height : "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const Oups = {
  fontSize: '3rem',
  fontWeight: 'bold',
  color: '#0077cc',
  textAlign: 'center',
  marginBottom: '2rem',
};

const paragraph = {
  fontSize: '1.5rem',
  color: '#333',
  textAlign: 'center',
  lineHeight: '2rem',
};
const returnHomeLink = {
  display: 'inline-block',
  padding: '10px',
  backgroundColor: '#0077cc',
  color: '#fff',
  textDecoration: 'none',
  borderRadius: '4px',
  marginTop: '20px',
};

export default function NotFound() {
  return (
      <main className='notfound' style={ErrorWrapper}>
          <p className='oupsText' style={Oups}>Oups...</p>
          <ImageWrapper >
              <img src={ErrorIllustration} alt='ErrorIllustration' />
          </ImageWrapper> 
          <p className='message' style={paragraph}>
             Il semblerait que la page que vous cherchez n’existe pas <br/>
          </p>
          <div className='Return'>
             <Link style={returnHomeLink} to="/">Retourner à la page d'accueil</Link>
          </div>  
      </main>
  )
}


