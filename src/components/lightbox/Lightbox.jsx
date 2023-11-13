import { createPortal } from "react-dom"
import styled from "styled-components"
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Tag from "../tag/Tag";
import { getLocalizedDate, getWeekandDay } from '../../helpers/getLocalizeDate'

const Holder = styled.div`
background: #00000094;
position: fixed;
z-index: 100;
top: 0;
width: 100%;
bottom:0px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

`
export const Root = styled.div`
max-width: 1920px;

margin: 20px;
overflow: hidden;
`


export const Image = styled.img`


object-fit: contain;
aspect-ratio: 26/9;


`

export const ImageHolder = styled.div`


`
function Lightbox({data,index}) {

  
  return createPortal(
    <Holder>
     <Root>
      <Swiper
              pagination={{
                dynamicBullets: true,
              }}
              modules={[Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              initialSlide={index}
              updateOnWindowResize={true}
            >
      {data.map((img,index)=>{
        return(
          <SwiperSlide  key={index}>
           <ImageHolder>
          {console.log(img)}
           <Tag>{getWeekandDay(img.creation_date).day}</Tag>
            <Tag>{getLocalizedDate(img.creation_date)}</Tag>

            <Image src={img.full_img} width="100%" loading='lazy'/> 
            </ImageHolder>
          </SwiperSlide>
        )
      })}
      </Swiper>
  
      </Root>
      </Holder>
  ,overlay)
}

export default Lightbox