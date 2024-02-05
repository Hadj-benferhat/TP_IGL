import styled from "styled-components";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SectionTitle from "./SectionTitle";
import ReplyIcon from '@mui/icons-material/Reply';
import useFetch from '../../hooks/useFetch';
import { useEffect, useState } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";

const NosActualitesSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  min-height: 100vh;
  ::-webkit-scrollbar {
    width: 10px ; /* adjust the width as needed */
  }
  ::-webkit-scrollbar-track {
    background-color: #D9D9D9 ; /* adjust the color as needed */
  }
  ::-webkit-scrollbar-thumb {
    background-color: #363B58 ; /* adjust the color as needed */
    border-radius: 5px ; /* adjust the radius as needed */
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #363B58 ; /* adjust the hover color as needed */
  }
  .swiper-show {
    display : none;
  }
  @media only screen and (max-width: 780px) {
    .content-show {
      display : none;
    }
    .swiper-show {
      display : block;
    }
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

const Content = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
  // height : calc(100vh - 200px);
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
    // justify ?
  }
`;

const Event = styled.article`
  // max-height : calc(100vh - 300px );
  p {
    color: #363B58;
    font-weight : 600;
  }
  display : none;
  @media only screen and (min-width: 1500px) {
    display : block;
    border-right : 2px solid  rgb(147, 149, 153);
    padding-right : 20px;
    flex-basis: 48%;
    height:100%;
    overflow-y : auto;
  }
`;

const Img = styled.div`
  background-image: url(${props => props.imgName}); 
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius : 20px;
  width: 100%;
  ${props => !props.small && `margin: ${props.margin};`}
  height: ${props => props.height};
  ${props => props.small && "flex-basis: 40%;"}
  ${props => props.small && "margin-left: 20px;"}
`;


const InfosSupp = styled.div`
  display : flex;
  justify-content : space-between;
  align-items : center;
  margin-bottom : ${props => props.mgbtm};
  .hours {
    color : #939599;
  }
`;

const ShareP = styled.p`
  display : flex;
  align-items : center;
  justify-content : space-between;
`;

const EventDescription = styled.div`
  h3 {
    color : #114AF6;
    margin-bottom : 20px;
    font-weight: 700;
    text-transform : uppercase;
  }
  p {
    color : #737477;
  }
  a {
    display : inline-block;
    margin-top : 20px;
    color : #114AF6;
    font-weight: 500;
    font-size: 20px;
    &:hover {
      color: rgb(54, 59, 88);
      font-weight: 700;
    }
  }
`;

const ButtonType = styled.div`  
  display : inline-block;
  padding : ${props => props.small ? "8px 13px" : "10px 15px"};
  font-weight: 600;
  font-size : ${props => props.small ? "16px" : "20px"};
  color: #363B58;
  border: 1px solid #363B58;
  border-radius: 23px;
`;

const Events = styled.div`
  @media only screen and (min-width: 1500px) {
    display : block;
    flex-basis: 48%;
    max-height : calc(100vh - 300px );
    overflow-y : auto;
    padding-right: 20px;
  }
`;

const OneEvent = styled.article`
  height : fit-content;
  display : flex;  
  align-items : center;
  justify-content : space-between;
  margin-top : 20px;
  padding-bottom : 20px;
  border-bottom : 1px #939599 solid;
  div.contenu {
    flex-basis : 60%;
  }
  .event-title-mobile {
    display : none;
  }
  @media only screen and (max-width: 1499px) {
    justify-content : center;
    flex-direction : column;
    .event-title-mobile {
      text-align : center;
      font-size: clamp(24px, 1.5rem, 32px);
      margin-bottom : 20px;
    }
  }
`;

const FlippedArrowIcon = styled(ReplyIcon)`
  transform: scaleX(-1);
`;

// swipper
const Wrapper = styled.article`
    // position : relative;
    width : 100%;
`;

const Image = styled.div` 
  box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
  border-radius : 0.25rem;
  height : 300px;
  width : 100%;
  z-index : -1;
  // overflow : hidden;
  background: url(${(props) => props.myImage}); 
  background-size: cover; 
  background-position: center;
  background-repeat: no-repeat;
`;

const SwipperContent = styled.article`
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  // top : 250px;
  // left : 0;
  z-index : 99;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction : column;
  align-items: flex-start;
  justify-content: space-between;
  row-gap : 20px;
  background-color : rgb(54, 59, 88);
  color : white;
  padding : 2rem 2.5rem;
  border-radius : 0.25rem;
  h1 {
      margin: 0;
      font-weight: 600;
      font-size: 2rem;
      line-height: 2;
  }
  h3 {
      font-weight: 600;
      font-size: 1.5rem;
      line-height: 1.5;
  }
  .date {
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
  }
  p {
      line-height: 1.5;
      font-weight: 300;
  }
  .besoinsListe {
    color : #0FBA0A !important;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
`;

export default function Actualites() {

  const initial = {
    nomEvent: "",
    typeEvent: "",
    descriptionEvent: "",
    image: "",
    dateEvent: "",
    id: ""
  }

  const [selectedEvent, setSelectedEvent] = useState(initial); // keeps track of the selected event

  const handleEventClick = (event) => {
    setSelectedEvent(event); // update the selected event "infos" when an event is clicked
  };

  const [eventsList, setEventsList] = useState([]);
  const {data , isPending, error} = useFetch("http://localhost:8000/api/v1/events");
  useEffect(() => {
    if(data) {
      setEventsList(data);
      setSelectedEvent(data[0]);
    }
  }, [data]);

    return (
      <NosActualitesSection id="actualites" >
        <Container>
          <SectionTitle mainheading="Nos Actualités" />
             {/* <Swiper 
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  position: "relative",
                  overflowX: "hidden",
                  overflowY : "visible",
                  padding: 0,
                  zIndex: 12345678976
                }}
                className="swiper-show mySwiper"
                speed={ window.innerWidth <= 1200 ? 50 : 500}   
                autoHeight={true} effect={"coverflow"} grabCursor={true} 
                centeredSlides={true} slidesPerView={"auto"} 
                coverflowEffect={{ rotate: 0, stretch: 0, depth: 300, modifier: 1, slideShadows: false}} 
                pagination={true} modules={[EffectCoverflow, Pagination]}
                > */}
              {/* {!error && eventsList && eventsList.map((event,index) => (
                <SwiperSlide key={index} >
                      <Wrapper>
                        <Image myImage={event.image} />
                        <SwipperContent>
                            <h1>{event.nomEvent}</h1> 
                            <h3> Type Event </h3>
                            <p className="date">{event.dateEvent}</p>
                            <p>{event.descriptionEvent}</p>
                            {event.listeDesBesoins && <a className="besoinsListe" rel="noreferrer"  target="_blank" href={event.listeDesBesoins}> Liste des besoins </a>}
                        </SwipperContent>
                     </Wrapper>
                </SwiperSlide>
                ))}
            </Swiper> */}

            <Content className="content-show">
             <Event>
                <p>Quoi de neuf aujourd'hui: </p>
                <Img margin="30px 0" height="300px" imgName={selectedEvent.image} />
                <InfosSupp mgbtm="40px"> 
                    <ButtonType>{ selectedEvent.typeEvent }</ButtonType>
                    <p className="hours">{selectedEvent.dateEvent}</p>
                    <ShareP> <FlippedArrowIcon flip="horizontal"/>  Partager </ShareP>
                </InfosSupp>
                <EventDescription>
                   <h3> {selectedEvent.nomEvent} </h3>
                   <p> {selectedEvent.descriptionEvent} </p>
                   {selectedEvent.listeDesBesoins && <a rel="noreferrer"  target="_blank" href={selectedEvent.listeDesBesoins}> Liste des besoins </a>}
                </EventDescription>
             </Event>
             <Events>
                {isPending && <div >  <LinearProgress/></div>}
                {error && <div>  {error} </div>} 
                {!error && eventsList && eventsList.map((event,index) => (
                    <OneEvent key={index}  onClick={() => {handleEventClick(event); console.log(event) }}> {/*event passed as param*/}
                      <h3 className="event-title-mobile"> {event.nomEvent} </h3>
                      <div className="contenu">
                        <InfosSupp small mgbtm="20px"> 
                            <ButtonType small> {event.typeEvent} </ButtonType>
                            <p className="hours">{event.dateEvent}</p>
                            <ShareP> <FlippedArrowIcon/>  Partager </ShareP>
                        </InfosSupp>
                        <p>{event.descriptionEvent}</p>
                      </div>
                      <Img small height="200px" width="150px" imgName={event.image} />
                    </OneEvent>
                ))}
             </Events>
          </Content>
        </Container>
      </NosActualitesSection>
    )
  }