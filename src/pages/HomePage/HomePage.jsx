import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import {
  Root,
  HeroBanner,
  HeroOverLay,
  HeroBannerTextHolder,
  HeroTextBig,
  HeroText,
  HeroTextExtra,
  Divider,
  HeroTextHolder,
  PricingItemHeading,
  PricingItemText,
  FeatureSection,
  PricingSectionHeadingW,
  SectionInner,
  FeatureItem,
  FeatureItemSvg,
  FeatureItemHeading,
  FeatureItemText,
  PricingSection,
  PricingSectionHeading,
  PricingItem,
  Ul,
  Li,
  IntroText,
  Accent,
  IntroTextHeading,
  Section,
  SectionInnerTop,
  DiaryHolder,
  Diary,
  DiaryImageHolder,
  DiaryTextHolder,
  DiaryTextHolderTop,
  DiaryText
} from './HomePage_styles'
import { Button, ButtonText } from '../../utils/global_styles';
import { useSelector } from 'react-redux';
import { selectPublicJournal } from '../../features'
import { useDispatch } from 'react-redux';
import { fetchPublicPlants } from '../../features/plants/publicPlantsThunk';
import WaveHeading from '../../components/Headings/WaveHeading';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const publicPlants = useSelector(selectPublicJournal)

  console.log("publicPlants", publicPlants.plants)
  useEffect(() => {
    dispatch(fetchPublicPlants())
  }, [])


  function cleanName(name) {
    return name.toLowerCase().replaceAll(" ","-").replaceAll("#","")
  }



  return (
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}

    >
      <HeroBanner >
        <HeroOverLay>
          <HeroBannerTextHolder>
            <HeroTextBig>Explore the Journey <br />of <WaveHeading heading="Growth" /></HeroTextBig>
            <HeroTextHolder>
              <Divider></Divider>
              <HeroText>
                <p>Explore the Journey of Growth through the art of cannabis cultivation. Immerse yourself in the experience of cultivating, nurturing, and witnessing the transformation of nature's gift. Our platform invites you to not only cultivate your plants but also your thoughts and reflections. <HeroTextExtra>Capture your unique insights, stories, and observations as you embark on this green journey. Join us to cultivate, write, and reflect – all in one space</HeroTextExtra></p>
                <Button><ButtonText>Sign Up Now</ButtonText></Button>

              </HeroText>


            </HeroTextHolder>

          </HeroBannerTextHolder>
        </HeroOverLay>
      </HeroBanner>

      <Section >
        <IntroTextHeading>From <WaveHeading heading="Seed" /> to <Accent>Cultivate</Accent><br /> Log and Illuminate</IntroTextHeading>
        <IntroText>
          Prepare to dive into a world that's all about growth – where you'll not only cultivate cannabis but also your own insights and revelations. With our unique logging platform, you'll be able to track the evolution of your plants while also documenting your personal journey. Watch as your efforts blossom into a tapestry of success, and let your logs become a testament to your dedication. Get ready to log, write, reflect, and celebrate the incredible path you're on. This is more than cultivation; it's a narrative of your own growth. The adventure awaits – are you ready to grow, write, and reflect like never before?
        </IntroText>
      </Section >

      <Section >

        <SectionInnerTop >


          {!publicPlants.loading &&
            <>
              <DiaryHolder>
                {publicPlants.plants?.map((d, index) => {
                  if (index < 6) {
                    return (
                      <Diary
                        to={`/public-plant/${cleanName(d.plant_name)}/${d.environment_id}/${d.plant_id}`} key={index}
                      >
                        <DiaryTextHolderTop>
                        <DiaryText>{d?.user_name}</DiaryText>
                        </DiaryTextHolderTop>
                        <DiaryImageHolder style={{ background: `url(${d?.cover_thumbnail == "" ? PlaceHolder : d?.cover_thumbnail})` }}>


                        </DiaryImageHolder>

                        <DiaryTextHolder>
                        
                   
                     
                        
                          <DiaryText> {d?.strain_name} </DiaryText>
                        </DiaryTextHolder>

                      </Diary>
                    );
                  }

                })}
              </DiaryHolder>
            </>}

{/* 
          <HeroText>With CannaLog, our users have a powerful tool that enables them to track their progress, analyze their results, and share their knowledge with the community.</HeroText>

          <HeroText>The platform is designed to be user-friendly, flexible, and customizable, allowing growers to tailor it to their unique needs.</HeroText>

          <HeroText>Our users have documented their grow journey in a variety of ways, from photos to detailed notes and tips.<br /> You'll find diaries covering a wide range of topics, including indoor and outdoor grows, hydroponics, soil, and more.</HeroText> */}
        </SectionInnerTop>

      </Section>

      <FeatureSection>
        <PricingSectionHeadingW>Features</PricingSectionHeadingW>
        <SectionInner >
          <FeatureItem
            initial={{ transform: "translateY(-120%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 1 }}
          >

            <FeatureItemSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path d="M26 13a4.005 4.005 0 0 0 4-4V6h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 19 4h-3v3a6.007 6.007 0 0 0 6 6h1v13H11v-5h1a4.005 4.005 0 0 0 4-4v-3h-3a3.979 3.979 0 0 0-2.747 1.106A6.004 6.004 0 0 0 5 12H2v3a6.007 6.007 0 0 0 6 6h1v5H2v2h28v-2h-5V13Zm-1-3a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-14 8a2.002 2.002 0 0 1 2-2h1v1a2.002 2.002 0 0 1-2 2h-1Zm-2 1H8a4.005 4.005 0 0 1-4-4v-1h1a4.005 4.005 0 0 1 4 4Zm14-8h-1a4.005 4.005 0 0 1-4-4V6h1a4.005 4.005 0 0 1 4 4Z" /></FeatureItemSvg>
            <FeatureItemHeading>Track your Grow</FeatureItemHeading>
            <FeatureItemText>Record and track every step of your grow, from germination to harvest, with our easy-to-use interface.</FeatureItemText>
          </FeatureItem>

          <FeatureItem
            initial={{ transform: "translateY(-120%)" }}
            animate={{ transform: "translateY(0%)" }}
            transition={{ duration: 1 }}
          >
            <FeatureItemSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M6 21q-.425 0-.713-.288T5 20v-1H3q-.825 0-1.413-.588T1 17V6q0-.825.588-1.413T3 4h18q.825 0 1.413.588T23 6v11q0 .825-.588 1.413T21 19h-2v1q0 .425-.288.713T18 21H6Zm-3-4h18V6H3v11Zm2-2h14l-4.5-6l-3.5 4.5l-2.5-3L5 15Zm-2 2V6v11Z" /></FeatureItemSvg>
            <FeatureItemHeading>Take Progress Photos</FeatureItemHeading>
            <FeatureItemText>Take and upload photos of your plants to see their progress over time and share with the CannaLog community.</FeatureItemText>
          </FeatureItem>

          <FeatureItem>
            <FeatureItemSvg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20 20"><path d="M8.75 3.75a2.75 2.75 0 1 0-5.5 0a2.75 2.75 0 0 0 5.5 0Zm-4.5 0a1.75 1.75 0 1 1 3.5 0a1.75 1.75 0 0 1-3.5 0ZM2.5 7.5h4.183c-.164.31-.286.646-.358 1H2.5A.5.5 0 0 0 2 9v.5c0 1.26 1.099 2.614 3.096 2.93c-.322.22-.59.513-.781.854C2.205 12.713 1 11.087 1 9.5V9a1.5 1.5 0 0 1 1.5-1.5Zm5.379 0c.504-.61 1.267-1 2.121-1a2.744 2.744 0 0 1 2.646 2a2.753 2.753 0 0 1-3.893 3.202A2.75 2.75 0 0 1 7.88 7.5Zm.54 1a1.75 1.75 0 1 0 3.164 1.5a1.75 1.75 0 0 0-3.165-1.5Zm7.266 4.784a2.513 2.513 0 0 0-.781-.853C16.9 12.114 18 10.759 18 9.5V9a.5.5 0 0 0-.5-.5h-3.825a3.726 3.726 0 0 0-.357-1H17.5A1.5 1.5 0 0 1 19 9v.5c0 1.587-1.206 3.212-3.315 3.784Zm-1.198.087A1.493 1.493 0 0 0 13.5 13h-7A1.496 1.496 0 0 0 5 14.5v.5c0 1.971 1.86 4 5 4c3.14 0 5-2.029 5-4v-.5c0-.45-.198-.854-.513-1.13ZM6 14.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v.5c0 1.438-1.432 3-4 3s-4-1.562-4-3v-.5ZM14 1a2.75 2.75 0 1 1 0 5.5A2.75 2.75 0 0 1 14 1Zm0 1a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 14 2Z" /></FeatureItemSvg>
            <FeatureItemHeading>Sharing with Community</FeatureItemHeading>
            <FeatureItemText>Share your grow diary with the CannaLog community to get feedback, advice, and support from fellow growers.</FeatureItemText>
          </FeatureItem>
        </SectionInner >
      </FeatureSection>

      <PricingSection >
        <PricingSectionHeading>Pricing</PricingSectionHeading>
        <SectionInner >
          <PricingItem >
            <PricingItemHeading>Free</PricingItemHeading>
            <PricingItemText>$0/month</PricingItemText>
            <Ul>
              <Li>3 Grow Journals</Li>
              {/* <li>Limited Support</li> */}
            </Ul>
            <Button>
              <Link to="/sign-up">
                Get Started
              </Link>
            </Button>
          </PricingItem>
          <PricingItem >
            <PricingItemHeading>Premium</PricingItemHeading>
            <PricingItemText>$9.99/month</PricingItemText>
            <Ul>
              <Li>Unlimited Grow Journals</Li>
              {/* <li>Premium Support</li> */}
            </Ul>
            <Button>
              <Link to="/">
                Coming Soon
              </Link>
            </Button>
          </PricingItem>
        </SectionInner>
      </PricingSection>


    </Root>
  )
}

export default HomePage