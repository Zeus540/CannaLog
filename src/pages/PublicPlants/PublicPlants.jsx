import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, } from '../../utils/global_styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPublicJournal,
  selectIsLoggedIn,
  fetchPublicPlants,
  fetchPublicPlantsSingedIn
} from '../../features'
import PlantCard from '../../components/cards/PlantCard'
import PlantCardSkelton from '../../components/cards/PlantCardSkelton'
import Blank from '../../components/skeleton/Blank'
import Banner from '../../components/banner/Banner'
import SearchImg from '../../assets/images/search.jpg'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;

`
const SRoot = styled(Root)`
padding-top:0px;
min-height:unset
`

const PublicPlants = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const publicPlants = useSelector(selectPublicJournal)
  const [pageBottom, setPageBottom] = useState(false)
  const [amount] = useState(14)
  const dispatch = useDispatch()

  const controller = new AbortController
  const signal = controller.signal

  useEffect(() => {


    let obj = {
      limit: 14,
      limit_mobile: 6,
      key: undefined,
      signal
    }

    if (isLoggedIn) {
      if (!publicPlants.hasIntialData) {

        dispatch(fetchPublicPlantsSingedIn(obj))
      }
    } else {
      if (!publicPlants.hasIntialData) {
        dispatch(fetchPublicPlants(obj))
      }
    }

    return (() => {
      controller.abort()
    })
  }, [isLoggedIn]);


  useEffect(() => {

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + windowHeight;
      const threshold = 350;
      const isNearEnd = scrollPosition + threshold >= documentHeight;
      // console.log("isNearEnd",isNearEnd)
      setPageBottom(isNearEnd);
    };

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])


  useEffect(() => {
    if (pageBottom && publicPlants.hasMore) {

        let obj = {
          limit: 14,
          limit_mobile: 6,
          key: publicPlants.next_cursor,
          signal
        }
        dispatch(fetchPublicPlants(obj))
    
    }

  }, [pageBottom])

  return (

<>
<Banner bg={SearchImg} heading="Public Grow Logs" txt1="Enhance Your Cannabis Garden! Find Proven Tips for Public Plants. " txt2="Optimize Your Cultivation Today!"/>

    <SRoot
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.10 }}
      exit={{ opacity: 0 }}
    >

      <Holder>

        <EnviromentHolder>
          {publicPlants.hasIntialData && <>
            {publicPlants.plants?.map((p, index) => {
              return (
                  <PlantCard
                    key={index}
                    data={p}/>
              )
            })}
          </>
          }
          {publicPlants.loading &&

            [...Array(amount).keys()]?.map((index) => {

              return (

                <PlantCardSkelton key={index} />
              )
            })

          }
        </EnviromentHolder>

      </Holder>
    </SRoot>
    </>
  )
}

export default PublicPlants