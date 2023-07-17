import React,{useState ,useEffect,useRef }from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Heading } from '../../utils/global_styles'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import { getLocalizedDate,getWeekandDay } from '../../helpers/getLocalizeDate'
import { format, startOfWeek, addWeeks, differenceInWeeks } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { FiEdit } from "react-icons/fi";
 import { RiDeleteBin5Line } from 'react-icons/ri';
import { ItemHodler} from '../forms/Form_styles'


export const Root = styled(m.div)`
max-width: 1920px;
margin: 0px auto;
padding: 0px 20px;
margin-bottom: 20px;
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
  min-width: calc(100% / 1);
  max-width: calc(100% / 1);
}
@media (min-width: 426px) and (max-width: 768px) {
  padding: 40px;
}
`
export const ItemInner = styled.div`
color: ${props => props.theme.text}!important;
cursor: pointer;
border-radius: 5px;
background: ${props => props.theme.primary}!important;
padding: 15px;
position: relative;


transition: all 0.5s ease;
z-index: 2;
justify-content: space-between;
`
export const Tag = styled(m.div)`
background: #8bab50;
padding: 0px 15px;
width: fit-content;
border-radius: 50px;
`

export const ItemInnerUpper = styled(m.div)`
display: flex;
justify-content: space-between;
`
export const ItemInnerContent = styled(m.div)`
padding: 10px;
background: white;
color:black;
margin: 15px 0px;
border-radius: 5px;
`
export const ItemInnerActionHolder = styled(m.div)`
display: flex;
justify-content: end;
`

export const TextButtonSvg = styled(m.div)`
svg{
    color:  ${props => props.theme.accent};
    font-size: 20px;
    margin-right: 10px;
    path{
      stroke:  ${props => props.theme.accent};
    }
  }
`
export const TextButtonSvgDelete = styled(m.div)`
color:  ${props => props.theme.warn};;
font-size: 20px;

font-weight: bold;
cursor:pointer;
display: flex;

svg{
  path{
    stroke:  ${props => props.theme.warn};
  }
}
`
const TimelineNotes = ({plant,activeWeek}) => {
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
    axios.post(`${BASE_URL_PROD}/plants/actions/13`, d)
    .then((response)=>{

          // Assuming you have the necessary data and variables
            const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
            const startDateIn = new Date(getLocalizedDate(plant.creation_date))
            

            // Localize each date in the object and calculate the week number
            const localizedData = response.data.map((item) => {
                const localizedDate = utcToZonedTime(item.creation_date, userTimeZone);
                const startDateLocalized = startOfWeek(startDateIn, { weekStartsOn: 1 }); // Adjust week start day if needed
                const week = differenceInWeeks(localizedDate, startDateLocalized) + 1;
                return { ...item, creation_date: localizedDate, week };
            });



      setActionData(localizedData)
      console.log("localizedData",localizedData)
    }).catch((err)=>{
      console.log("err",err)
    })
  };

  console.log("activeWeek",activeWeek)
  
  return (
    <Root>
         <Heading>Notes</Heading>
        
         <TimeLineHolder

          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
         >
        {actionData?.filter((a) => a.week == activeWeek )?.map((a)=>{
          return(
            <Item >
              <ItemInner >
              
                <ItemInnerUpper>
                <Tag>{getWeekandDay(a.creation_date).day}</Tag>
                <h2>{getLocalizedDate(a.creation_date)}</h2>
               
                
                </ItemInnerUpper>

                <ItemInnerContent>
                <h2>{a.plant_note}</h2>
                </ItemInnerContent>

                <ItemInnerActionHolder>

                <TextButtonSvg onClick={()=> openModal('editNote',a)}><FiEdit/></TextButtonSvg>
                <TextButtonSvgDelete onClick={()=> openModal('deleteNote',a)}><RiDeleteBin5Line/></TextButtonSvgDelete>
                </ItemInnerActionHolder>
                
              </ItemInner>
              </Item>
          
          )
        })


        }
             </TimeLineHolder>
          
            
    </Root>
  )
}

export default TimelineNotes