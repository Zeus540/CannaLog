import { StyledButton } from "../../utils/global_styles"
import { Input } from "../forms/Form_styles"
import styled from "styled-components"
import { Heading } from "../../utils/global_styles"
const Holder = styled.div`
background-image:${(props)=>`url(${props.bg})`};
display: flex;
justify-content: center;
align-items: center;
background-size: cover;
padding: 200px 20px;
flex-direction: column;
padding-top: 260px;
background-color: #5f5f5f;
background-blend-mode: overlay;
form{
    display: flex;
    width: 100%;
    max-width: 500px;
    padding: 20px 0px;
}
p{
    color: white;
    text-align: center;
    width: 100%;
}
`

const SHeading = styled(Heading)`
text-transform: uppercase;
font-size: 25px;
color: white;
`
function Banner(props) {
    console.log(props.bg)
  return (
    <Holder bg={props.bg}>
        <SHeading>{props.heading}</SHeading>
        <form>
        <Input required type="text" placeholder="Search by Strain,Environment"/>
        <StyledButton>Search</StyledButton>
        </form>
        <p>{props.txt1}<br/> {props.txt2}</p>
    </Holder>
  )
}

export default Banner