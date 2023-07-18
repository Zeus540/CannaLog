import React,{useState ,useEffect,useRef }from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Heading } from '../../utils/global_styles'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import moment from 'moment-timezone'
import { getLocalizedDate } from '../../helpers/getLocalizeDate'
import { ItemHodler} from '../forms/Form_styles'


export const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 0px 20px;

`
export const TimeLineHolder = styled(m.div)`
display: flex;
margin-top: 10px;
overflow: hidden;
user-select: none;
`


export const Item = styled(m.div)`
position: relative;
min-width: calc(100% / 5);
max-width: calc(100% / 5);
width: 100%;
margin: 0px 20px;
&:not(:first-child)::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 5px;
  transition: all 0.5s ease;
  background: ${props => props.border}!important;
  top: 50%;
  transform: translateY(-50%);
  z-index: unset;
  left: -100%;
}
&:first-child{
  margin-left: 0px;
  
}
&:last-child{
  margin-right: 0px;
}

@media (min-width: 0px) and (max-width: 425px)  {
  min-width: calc(100% / 1.5);
  max-width: calc(100% / 1.5);
}
@media (min-width: 426px) and (max-width: 768px) {
  padding: 40px;
}
`
export const ItemInner = styled.div`

cursor: pointer;
border-radius: 50px;
background: ${props => props.border};
padding: 5px 10px;
position: relative;
display: flex;
border:2px solid ${props => props.border};
transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
color: ${props => props.theme.textW}!important;
`


const Timeline = ({plant}) => {
  const [actionData, setActionData] = useState([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.pageX || e.touches[0].pageX);
    setScrollLeftStart(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    const dragDistance = x - dragStartX;
    containerRef.current.scrollLeft = scrollLeftStart - dragDistance;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {

  getPlantActionsByType(plant)
  }, [plant]);


  const getPlantActionsByType = (d) => {
    axios.post(`${BASE_URL_PROD}/plants/actions/14`, d)
    .then((response)=>{
      setActionData(response.data)
      console.log("response",response)
    }).catch((err)=>{
      console.log("err",err)
    })
  };

  return (
    <Root>
         <Heading>Stages</Heading>
        
         <TimeLineHolder

          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
         >
        {actionData.map((a)=>{
          return(
            <Item bg={a.stage_color} border={a.stage_color}>
              <ItemInner bg={a.stage_color} border={a.stage_color}>
               <h2>{a.stage_name}</h2>
                <h2>{getLocalizedDate(a.creation_date)}</h2>
             
              </ItemInner>
              </Item>
          
          )
        })


        }
             </TimeLineHolder>
          
            
    </Root>
  )
}

export default Timeline