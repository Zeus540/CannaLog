import { useState } from "react"
import { StyledButton } from "../../utils/global_styles"
import { Input } from "../forms/Form_styles"
import styled from "styled-components"
import { Heading } from "../../utils/global_styles"
import axios from "../../lib/axios"
import { BASE_URL_PROD } from "../../lib/Constants"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../features"

const Holder = styled.div`
background-image:${(props)=>`url(${props.bg})`};
display: flex;
justify-content: center;
align-items: center;
background-size: cover;
padding: 120px 20px 100px;
flex-direction: column;

background-color: #5f5f5f;
background-blend-mode: overlay;
form{
  position: relative;
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
const Results = styled.div`
background: ${(props)=> props.theme.primary};
position: absolute;
z-index: 5;
width: 100%;

`
const ResultCard = styled.div`
display: flex;
padding:10px;
p{
  color: white;
  text-align: left;
}
img{
  aspect-ratio:16/16;
  margin-right: 15px;
}
`
function Banner(props) {
const [searchResultsFound, setSearchResultsFound] = useState(false)
const [searchResults, setSearchResults] = useState([])
const [controller, setController] = useState(new AbortController());
const isLoggedIn = useSelector(selectIsLoggedIn)

    const handleSearch = (e) =>{
    let url ;


    controller.abort(); // Cancel the previous request
    const newController = new AbortController();
    const signal = newController.signal;
    setController(newController);

    let limit = 10

    let sortBy = "DESC"
      if(props.public){
        if(isLoggedIn){
          url = `${BASE_URL_PROD}/plants/public_signed_in/search?limit=${limit}&sort=${sortBy}&search_qeury=${e.target.value}`
          }else{
          url = `${BASE_URL_PROD}/plants/public/search?limit=${limit}&sort=${sortBy}&search_qeury=${e.target.value}`
          }
    
        axios.get(url,{signal})
        .then((response)=>{
          console.log("response",response.data.data)
          if(response.data.data.length > 0 ){
            setSearchResultsFound(true)
            setSearchResults(response.data.data)
          }else{
            setSearchResultsFound(false)
            setSearchResults([])
          }
          
        })
        .catch((error)=>{
          setSearchResultsFound(false)
          setSearchResults([])
        })
      }
 
    }

  return (
    <Holder bg={props.bg}>
        <SHeading>{props.heading}</SHeading>
        <form>
        <Input required type="text" placeholder="Search by Strain,Environment" onChange={(e)=>handleSearch(e)}/>
    
        
        {searchResultsFound && 
        <Results>
          {searchResults?.map((a)=>{
            return(
              <ResultCard>
              <img src={a.cover_thumbnail} width="55px"/>
               <div>
               <p>{a.plant_name}</p>
                <p>{a.strain_name}</p>
                </div>
              </ResultCard>
            )
          })}
          </Results>}
          </form>
        <p>{props.txt1}<br/> {props.txt2}</p>
    </Holder>
  )
}

export default Banner