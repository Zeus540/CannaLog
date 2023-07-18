import styled from "styled-components";
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom';
import Back from '../../assets/images/1686229213603.jpg'

export const Root = styled(m.div)`
padding-top: 0px;
background: ${props => props.theme.secondary};

`;

export const HeroBanner = styled.div`
min-height:calc(60vh - 57px);
background-image:url(${Back});
flex-direction: column;
background-color: #0000008a;
background-blend-mode: overlay;
background-position: center;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
padding: 80px 20px;
@media (max-width: 425px) {
    margin: 0px 0px;
    padding: 40px 20px;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px 0px;
    padding: 40px 40px;
  }
`;
export const HeroText = styled.p`
padding:10px;
color: ${props => props.theme.text};
`;
export const HeroTextBig = styled.p`
color:white;
line-height: 50px;

text-align: center;
    font-size: 50px;
    font-family: baloonB!important;
`;

export const HeroTextBigSpan = styled.span`


color:#8bab50;
text-align: center;
    font-size: 50px;
    font-family: baloonB!important;
`;

export const HeroTextBigSup = styled.sup`


color:#8bab50;
text-align: center;
    font-size: 40px;
    font-family: baloonB!important;
`;

export const Section = styled.div`
text-align: center;

  position: relative;
  @media (max-width: 425px) {
    padding:0px;
    padding-bottom:40px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:0px;
    padding-bottom:40px;
  }
`;
export const FeatureSection = styled.div`
text-align: center;
  padding:40px 0px;
  position: relative;

  background: ${props => props.theme.primary};
  @media (max-width: 425px) {
    padding:20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:20px;
  }
`;

export const WaveImg = styled.img`
position: absolute;
bottom: 0px;
    left: 0;
    right: 0;
    @media (max-width: 425px) {
        bottom: 0px;
      }
      @media (min-width: 426px) and (max-width: 768px) {
      margin: 0px auto;
      }
`;

export const SectionInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  justify-content: center;
`;
export const SectionInnerTop = styled.div`
position: relative;
z-index: 1;

border-radius: 10px;
max-width: 1920px;
margin: 40px auto;
color:white;
padding-bottom: 40px;

padding: 10px;
    @media (max-width: 425px) {
        margin: 0px 20px;
        
      }
      @media (min-width: 426px) and (max-width: 768px) {
        margin: 0px  40px;
      }
`;

export const FeatureItem = styled(m.div)`
padding: 40px 40px;
display: flex;
flex-direction: column;

align-items: center;
text-align: center;
width: calc(100% / 3 - 160px);
margin: 40px;

background: ${props => props.theme.secondary};
border-radius: 5px;
  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );
    margin: 20px;
  }
`;

export const FeatureItemSvg = styled.svg`
fill: ${props => props.theme.accent};
width: 80px;
padding-bottom: 20px;
`;
export const FeatureItemHeading = styled.h3`
color: ${props => props.theme.text};
`;
export const FeatureItemText = styled.p`
color: ${props => props.theme.text};

`;

export const PricingItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: calc(100% / 3 );
margin:10px;
background: ${props => props.theme.primary};
color: ${props => props.theme.text};
border-radius: 5px;
padding: 40px 20px;
  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );

  }
`;

export const MenuLink = styled(Link)`
text-decoration: unset;
padding: 8px 25px;
width: fit-content;
border: none;
background: #fff0;
color: #8bab50 ;
border-radius: 5px;
cursor: pointer;
border: 1px #8bab50 solid;

`;

export const MenuLinkHolder = styled.div`

display: flex;
justify-content: center;

    padding-top: 20px;
position: relative;
z-index: 1;
`;

export const HeroBannerTextHolder = styled.div`


`;

export const Diary = styled(Link)`
cursor: pointer;
width: calc(100% / 6 - 20px);
min-width: calc(100% / 6 - 20px);
margin: 10px;
border-radius: 5px;

text-decoration: none;

@media (max-width: 425px) {
  min-width: calc(100% / 1 - 20px);
  width: 100%;
  margin: 10px 10px;
  border-radius: 0px;
}
@media (min-width: 426px) and (max-width: 699px) {
  min-width: calc(100% / 2 - 20px);
  margin: 10px;
}
  @media (min-width: 700px) and (max-width: 940px) {
    min-width: calc(100% / 2 - 20px);
  }
  @media (min-width: 941px) and (max-width: 1330px) {
    min-width: calc(100% / 4 - 20px);
  }
`;


export const DiaryHolder = styled.div`
  display: flex;
  overflow: auto;
  padding:0px ;
  margin: 40px 0px;
margin-bottom:0px;
  @media (max-width: 425px) {
    padding:0px ;
    overflow: auto;
    flex-direction: row;
    flex-wrap: unset;
  }
  @media (min-width: 426px) and (max-width: 699px) {
    padding:0px ;
    overflow: auto;
    flex-direction: row;
    flex-wrap: unset;
  }
`;

export const DiaryImageHolder = styled.div`
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  line-height: 0px;
  border-radius: 5px;
  min-height: 190px;
  background-position: center!important;
  background-size: cover!important;
  @media (max-width: 425px) {

    border-radius: 5px;
  }
`;
export const DiaryTextHolder = styled.div`
padding: 5px 0px;
overflow: auto;
`;

export const Tag = styled.sup`

text-align: left;

  padding: 0px 0px;
  font-size: 11px;
  display: block;
  color: ${props => props.theme.text};

`;

export const DiaryText = styled.p`
font-size: 14px;
padding-bottom: 5px;
white-space: nowrap;
font-weight: bold;
margin: 0px;
color: ${props => props.theme.text};
text-align: left;

`;

export const PricingSection = styled.div`
background: ${props => props.theme.secondary};
padding: 40px 0px;
`;

export const PricingSectionHeading = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;
color: ${props => props.theme.text};
`;
export const PricingSectionHeadingW = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;
color: ${props => props.theme.text};
`;

export const Ul = styled.ul`
list-style: none;
padding: 0px;
margin-bottom: 20px;
`;

export const Li = styled.li`
list-style: none;
padding-bottom: 5px;
`;
export const PricingItemHeading = styled.h3`
padding-bottom: 5px;
font-size: 25px;
`;

export const PricingItemText = styled.p`
padding-bottom: 5px;
`;
