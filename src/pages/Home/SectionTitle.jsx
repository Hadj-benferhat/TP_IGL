import styled from "styled-components";
const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 70px;
  h2 {
      color: #CE5D4D;
      font-weight: 600;
      font-size: 4em;
      display: inline-block;
      padding-left: 15px;
  }
  @media only screen and (max-width: 1200px) {
    h2{
        font-weight: 500;
        font-size: 3em;
        padding-left: 10px;
    }
}
@media only screen and (max-width: 891px) {
  h2{
      font-weight: 400;
      font-size: 2em;
  }
}
`;
export default function SectionTitle(props) {
  return (
    <Title>
        <h2> {props.mainheading} </h2>
    </Title>
  )
}
