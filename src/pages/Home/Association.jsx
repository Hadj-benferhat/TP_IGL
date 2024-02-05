import QuiSommesNous from '../../assets/images/QuiSommesnous.png';
import styled from 'styled-components';

export default function Association() {
  return (
    <AssociationSection id='association'>
        <Container>
            <Image>
                <img src={QuiSommesNous} alt='QuiSommesNous-icon' />
            </Image>
            <DefinitionAssociation>
               <AssociationHeading>Qui sommes-nous</AssociationHeading>
                <p>Sourire à l'innocence est un club associatif créé par les étudiants de l'ESI et qui vise à rendre le sourire aux enfants, malades, pauvres, orphelins...</p>
                <p>Nous sommes une association humanitaire  à but caritatif, statuée à l'école nationale supérieure d'Informatique d'Alger (ex INI) en tant que club estudiantin qui y est proprement rattaché.</p>
                <p>Notre but principal est de prôner les valeurs humanitaires et humanistes, en organisant des événements de charité ou des collectes, là où les dons et les recettes sont récoltés  pour assouvir les besoins des plus nécessiteux.</p>
            </DefinitionAssociation>
        </Container>
    </AssociationSection>
  )
}






const AssociationSection = styled.section`
  min-height: 100vh;
  // height:auto;
  background-color: #eee;
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  // padding-top: 0;
  padding: 70px 20px 10px 20px;
  div{
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: 1200px) {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        DefinitionAssociation {
          width: 100%;
        }
  }
`;

const DefinitionAssociation = styled.div`
    width: 50%;
    h2 {
      @media only screen and (max-width: 500px) {
        font-size: 1.5rem;
      } 
    }
    p {
      width: 100%;
      color: #363B58;
      line-height: 1.75;
      font-size: 1.2rem;
      margin-left: 30px;
      margin-bottom: 20px;
      @media only screen and (max-width: 891px) {
        width: 100%;
        text-align: left;
        padding: 0 20px;
      }
      @media only screen and (max-width: 768px) {
        font-size: 20px;
      }
      @media only screen and (max-width: 500px) {
        font-size: 15px;
      }
    }
    @media only screen and (max-width: 1200px) {
        width:90%;
        margin: 0 auto;
        height: min-content;
    }
`;
const AssociationHeading = styled.h2`
  width: 100%;
  font-size: 60px;  
  color: #363B58;
  font-weight: 600;
  border-left: 6px solid #0FBA0A;
  display: inline-block;
  padding-left: 15px;
  margin-bottom: 20px;
  @media only screen and (max-width: 891px) {
        text-align: left;
        padding: 0 20px;
        font-weight: 400;
        font-size: 2em;
        height: max-content;
        margin-top: 30px;
    }
`;
const Image = styled.div`
  width: 45%;
  img {
    width: 600px;  
    height: 500px;
  }
  @media only screen and (max-width: 1300px) {
    img {
      width: 542px;  
      height: 467px;
    }
  }
  @media only screen and (max-width: 1200px) {
    display: none !important;
  }
  `;
// const AssociationSection = styled.div`

// `;






