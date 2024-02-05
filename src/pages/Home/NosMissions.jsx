import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import SectionTitle from "./SectionTitle";
import Adawati from "../../assets/images/NosMissions/Adawati.png";
import Every_little_bite_help from "../../assets/images/NosMissions/Every_little_bite_help.png";
import Kaswat_chitaa from "../../assets/images/NosMissions/Kaswat_chitaa.png";
import Octobre_rose from "../../assets/images/NosMissions/Octobre_rose.png";
import Qofat_ramadan from "../../assets/images/NosMissions/Qofat_ramadan.png";


const NosMissionsSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  min-height: 100vh;
  .swiper-pagination {
    margin-top: 50px;
  }
`;
const Container = styled.div`
  padding-top: 70px;
  padding-bottom: 10px;
  width: 87%;
  margin: 0 auto;
  @media only screen and (max-width: 1200px) {
      width: 93%;
  }
  @media only screen and (max-width: 891px) {
    padding-top: 10px;
  }
`;
const Img = styled.div`
  min-height: 600px;
  width: 379px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background: url(${(props) => props.myImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media only screen and (max-width: 1200px) {
    display: none;
    width : 0;
  }
`
;
const Content = styled.div`
  flex-basis: 50%;
  background-color: #363B58;
  color : white;
  padding : 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  h3 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    text-align : center;
    text-transform: uppercase;
  }
  p {
      text-align : left;
      line-height: 1.5;
  } 
  @media only screen and (max-width: 1200px) {
    flex-basis: 100%;
  }
  @media only screen and (max-width: 891px) {
    h3 {
      font-size: 1.5rem;
    }
    @media only screen and (max-width: 1200px) {
      border-radius: 10px;
    }
  }`
;
const Card = styled.article`
  height : 100%; // added ?
  display: flex;
  align-items: stretch;
  justify-content: center;
  `;

function CardMission (props) {
  return (
    <Card>
      <Img myImage={props.myImage}> </Img>
      <Content>
        <h3> {props.TitleEvent} </h3>
        <p> {props.DescriptionEvent} </p>
      </Content>
    </Card>
  );
}
export default function NosMissions() {
  const desriptionAdawati = "Quand on dit rentrée, on dit aussi un moment assez délicat pour les familles nécessiteuses et les enfants orphelins,notamment côté affaires scolaires ! C’est pour cela que notre club » Sourire à l’innocence » répond chaque année, présent en organisant une collecte de fournitures scolaires( ou même de dons pour en acheter par la suite) pour venir en aide à ces enfants, afin de pouvoir, avec notre petit geste, contribuer à donner du bonheur, du confort ou même un sourire aux enfants nécessiteux ou orphelins. Cet événement existait auparavant sous le nom de “back to school”. Au total, 114 enfants dans la nécessité ont été pris en charge cette année , nous avions à peine pu réaliser que nous en avons aidé autant, et ce n’est que grâce à vos très généreux dons !";
  const desriptionEvery = " Vous vous demandez d’où viennent les revenus financiers de notre club? C’est en organisant des événements de collecte de dons comme “Le cooking day” sous le titre “Every little bite helps”. Après sa première édition qui était en 2009 chaque année Sourire à l’innocence organise cet événement qui consiste à vendre des salées, des sucrés et des boissons avec des prix symboliques qui par la suite seront utilisés au profit des enfants malades, orphelins ou nécessiteux. Cette année, il a été combiné avec un stand devant l’auditorium pour présenter le club et ses différentes activités. Les revenus de cet événement ont été utilisés pour acheter des vêtements d’hiver pour KASWAT CHITAA.C’est l’un des événements les plus appréciés de la communauté de l’ESI car il réunit à la fois étudiants, enseignants et employés."
  const desriptionKaswat = "Sourire à l’innocence organise chaque année une collecte de vêtements et accessoires d’hiver (gants, bonnets, couvertures,.. etc.) ou tout ce qui peut aider à réchauffer. Avec ces simples dons, nous essayons de subvenir aux besoins des petits anges et de leurs parents, d’alléger leurs souffrances et de remplir de bonheur leurs âmes innocentes. La réussite de l’événement « Keswat Chitaà » a rapporté une grande satisfaction, 36 enfants de différentes wilayas ont bénéficié de nouveaux vêtements. Nous avons également reçu des vêtements pour adultes que l’on a transmis à d’autres associations tel que la caravane Assirem qui les a livrés au sud du pays et l’association Kafil El Yatim de Rouiba ";
  const desriptionOctobre = "Durant le mois d’octobre nous faisons des campagnes de sensibilisation quant au cancer du sein ainsi que des collectes de fonds à travers des ventes telles que la vente de bavette dernièrement durant la pandémie, des stylos et des stickers. Cette année, les revenus de notre stand ont été reversés au centre beau fraisier.";
  const desriptionQofat = " Ramadan, ce mois sacré qui nous rappelle à quel point nous sommes tous égaux, un mois durant lequel le riche ressent ce que ressent le pauvre, mais le pauvre n’a pas tout le temps l’occasion de ressentir ce que ressent le riche…En effet, beaucoup n’ont pas grand chose sur la table à l’heure du manger, certains n’ont qu’un petit morceau de pain pour calmer leurs faims et se préparer pour celle du lendemain.Mais Ramadan, c’est aussi un mois de partage, un mois où on se sert les coudes, un mois où on se rappelle la fraternité qui nous lie. C’est pour cela que Sourire à l’innocence organise l’événement Qofat Ramadan qui consiste à aider les familles les plus nécessiteuses durant ce mois avec des aides alimentaires, qui leur permettront d’alléger la charge financière qui est sur leurs épaules, et ainsi pouvoir profiter de ce mois béni et de sa spiritualité de la meilleure manière. Et grâce à la générosité de la communauté, « Sourire à l’innocence » a pu distribuer plus de 100 couffins du ramadan 2022.";
    return (
      <NosMissionsSection id="nosMissions" >
        <Container>
          <SectionTitle mainheading="Nos Missions" />
          <Swiper speed={ window.innerWidth <= 1200 ? 50 : 500}   autoHeight={true} effect={"coverflow"} grabCursor={true} centeredSlides={true} slidesPerView={"auto"} coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false}} pagination={true} modules={[EffectCoverflow, Pagination]} className="mySwiper">
            <SwiperSlide >
              <CardMission  myImage={Every_little_bite_help} textAlt="Every little bit help" TitleEvent="Every little bit help" DescriptionEvent={desriptionEvery}/> 
            </SwiperSlide>
            <SwiperSlide >
               <CardMission  myImage={Kaswat_chitaa} textAlt="Kaswat chitaa" TitleEvent="Kaswat chitaa" DescriptionEvent={desriptionKaswat} /> 
            </SwiperSlide>
            <SwiperSlide >
                <CardMission myImage={Octobre_rose} textAlt="Octobre rose" TitleEvent="Octobre rose" DescriptionEvent={desriptionOctobre} />
            </SwiperSlide>
            <SwiperSlide >
               <CardMission myImage={Qofat_ramadan} textAlt="Qofat ramadan" TitleEvent="Qofat ramadan" DescriptionEvent={desriptionQofat} />
            </SwiperSlide>
            <SwiperSlide>
                <CardMission myImage={Adawati} textAlt="Adawati" TitleEvent="Adawati" DescriptionEvent={desriptionAdawati} />
            </SwiperSlide>
          </Swiper>
        </Container>
      </NosMissionsSection>
    )
  }