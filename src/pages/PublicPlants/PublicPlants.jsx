import React, { useEffect, useState } from 'react'
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
import PlantCardPublic from '../../components/cards/PlantCardPublic'
import PlantCardSkelton from '../../components/cards/PlantCardSkelton'
import Blank from '../../components/skeleton/Blank'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;

`

const PublicPlants = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const publicPlants = useSelector(selectPublicJournal)
  const [pageBottom, setPageBottom] = useState(false)
  const [amount, setAmount] = useState(14)
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


    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
    >

      <Holder>
        <FlexRowEnd>
          {publicPlants.hasIntialData ?
            <Heading
            >
              Public Plants
            </Heading>
            :
            <Blank w="100px" h='30px' />
          }

        </FlexRowEnd>
        <EnviromentHolder>
          {publicPlants.hasIntialData && <>
            {publicPlants.plants?.map((p, index) => {
              return (
                <>
                  <PlantCardPublic
                    key={index}
                    length={publicPlants.plants.length}
                    index={index}
                    data={p}
                    cover_thumbnail={p?.cover_thumbnail}
                    name={p.name}
                    environment_type_name={p.environment_type_name}
                    light_exposure={p.light_exposure}
                    creation_date={p.creation_date}
                    last_updated={p.last_updated} />
                </>
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
    </Root>

  )
}

export default PublicPlants