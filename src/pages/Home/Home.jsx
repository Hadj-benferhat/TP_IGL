import NavBar from './NavBar';
// import Hero from './Hero';
import Association from './Association';
import Contact from './Contact';
import Footer from './Footer';
import styled from 'styled-components';

export default function Home() {
  return (
    <main id="home">
      <NavBar />
      {/* <Hero /> */}
      <Flex>
        <Association />
        {/* <NosMissions  /> */}
        {/* <Actualites /> */}
        {/* <RejoignezNous />        */}
        {/* <FAQ /> */}
        <Contact />
        <Footer />
      </Flex>
    </main>
  )
}

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // row-gap : 5rem; 
`;