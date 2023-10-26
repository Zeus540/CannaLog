import styled from "styled-components";
import { motion as m } from 'framer-motion'
import { Link } from 'react-router-dom';

export const Root = styled(m.div)`
padding-top: 0px;
background: ${props => props.theme.secondary};

`;

export const HeroBanner = styled.div`

background-image:${(props)=>`url(${props.theme.banner.image})`};
background-size: cover;
background-position: 70% 60%;
`;
export const HeroOverLay = styled.div`
min-height:calc(100vh);
background: linear-gradient(360deg, ${props => props.theme.secondary}, transparent);
width:100%;
padding: 80px 60px;
display: flex;
justify-content: end;

flex-direction: column;
@media (max-width: 425px) {
    margin: 0px 0px;
    padding: 60px 20px;

  }
  @media (min-width: 426px) and (max-width: 768px) {
    margin: 0px 0px;
    padding: 40px 40px;
  }
`;

export const HeroTextBig = styled.h1`
color: ${props => props.theme.text};
line-height: 55px;
font-family: Archivo!important;

    font-size: 50px;
  
`;

export const HeroText = styled.p`
color: ${props => props.theme.text};
padding: 0px 20px;
button{
  margin-top: 25px;
  border-radius: unset;
  padding: 10px 20px;
}
`;

export const HeroTextExtra = styled.span`
display:block;
@media (max-width: 425px) {
 display:none

}
`;

export const HeroTextHolder = styled.div`
display: flex;
padding: 20px 0px;
width: 50%;
@media (max-width: 425px) {
  width: unset;

}
@media (min-width: 426px) and (max-width: 1024px) {
  width: unset;
}
@media (min-width: 1025px) and (max-width: 1440px) {
  width: 60%;
}
`;

export const Divider = styled.div`
background: ${props => props.theme.accent};
width: 500px;
height: 2px;
margin: 20px 0px;

`;


export const HeroTextBigSpan = styled.span`


color:${props => props.theme.accent};
text-align: center;
    font-size: 20px;
    font-family: baloonB!important;
`;

export const HeroTextBigSup = styled.sup`


color:${props => props.theme.accent};
text-align: center;
    font-size: 40px;
    font-family: baloonB!important;
`;

export const Section = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: end;
background: ${props => props.theme.secondary};
  position: relative;
  padding:20px 20px;
  @media (max-width: 425px) {
    padding:20px 20px;
  }
  @media (min-width: 426px) and (max-width: 768px) {
    padding:20px 20px;
  }
`;
export const FeatureSection = styled.div`
text-align: center;
  padding:40px 0px;
  position: relative;

  background: ${props => props.theme.secondary};
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
background: ${props => props.theme.secondary};
width: 100%;
max-width: 1920px;
margin: 0px auto;
color:white;



`;

export const FeatureItem = styled(m.div)`
padding: 40px 40px;
display: flex;
flex-direction: column;

align-items: center;
text-align: center;
width: calc(100% / 3 - 160px);
margin: 40px;

border-radius: 5px;
  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );
    margin: 20px 0px;
  }
`;

export const FeatureItemSvg = styled.svg`
fill: ${props => props.theme.accent};
width: 80px;
padding-bottom: 20px;
`;
export const FeatureItemHeading = styled.h3`
color: ${props => props.theme.text};
font-size: 20px;

`;
export const FeatureItemText = styled.p`
color: ${props => props.theme.text};
padding-top: 15px;
`;

export const PricingItem = styled.div`
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
width: calc(100% / 3 );
margin:20px;

color: ${props => props.theme.text};
border-radius: 5px;
padding: 40px 15px;
  @media (min-width: 0px) and (max-width: 768px) {
    width: calc(100% / 1 );
    margin:20px 0px;
  }
`;

export const MenuLink = styled(Link)`
text-decoration: unset;
padding: 8px 25px;
width: fit-content;
border: none;
background: #fff0;
color: ${props => props.theme.accent} ;
border-radius: 5px;
cursor: pointer;
border: 1px ${props => props.theme.accent} solid;

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




export const DiaryHolder = styled.div`
  display: flex;
  overflow: auto;
  padding:0px ;
  margin: 40px 0px;
  margin-top: 0px;
  margin: 0px -10px;
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




export const Tag = styled.sup`

text-align: left;

  padding: 0px 0px;
  font-size: 11px;
  display: block;
  color: ${props => props.theme.text};

`;


export const PricingSection = styled.div`

padding: 40px 15px;
`;

export const IntroTextHeading = styled.h1`
color: ${props => props.theme.text};
padding: 40px 0px 0px;
font-size: 45px;
line-height: 55px;
text-align: right;
font-family: Archivo!important;

`;
export const IntroText = styled.p`
color: ${props => props.theme.text};
padding: 40px 0px;
line-height: 25px;

    text-align: end;
    width: 50%;
    @media (max-width: 425px) {
      width: 90%;
    }
    @media (min-width: 426px) and (max-width: 768px) {
      width: 50%;
    }
`;

export const Accent = styled.span`
color: ${props => props.theme.accent};
`;

export const PricingSectionHeading = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;
color: ${props => props.theme.text};
font-family: Archivo!important;
`;
export const PricingSectionHeadingW = styled.h2`
text-align: center;
margin: 0;
margin-bottom: 20px;
font-size: 40px;
font-family: Archivo!important;
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
