import React, { useEffect } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd,} from '../../utils/global_styles'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectPublicJournal,
  selectIsLoggedIn,
  fetchPublicPlants,
  fetchPublicPlantsSingedIn
} from '../../features'
import PlantCardPublic from '../../components/cards/PlantCardPublic'
import Loader from '../../components/loader/Loader'


const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;

`

const PublicPlants = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isLoadingPlants = useSelector(selectPublicJournal)
  const publicPlants = useSelector(selectPublicJournal)



  useEffect(() => {

    const controller = new AbortController
    const signal = controller.signal
  
    if(isLoggedIn){
      dispatch(fetchPublicPlantsSingedIn(signal))
    }else{
    
      dispatch(fetchPublicPlants(signal))
    }
 
    return(()=>{
      controller.abort()
    })

  }, [isLoggedIn]);

  return (

    <>
      {isLoadingPlants.loading ?
        <>
          <Loader />
        </>

        :
        <Root
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          exit={{ opacity: 0 }}
        >
         
          <Holder>
          <FlexRowEnd
            >
            <Heading
            >
              Public Plants
            </Heading>
            </FlexRowEnd>
            <EnviromentHolder
            >

            
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
                      last_updated={p.last_updated}
                 />
                    </>
                  )
                })}
              

            </EnviromentHolder>


          </Holder>
        </Root>
      }
    </>
  )
}

export default PublicPlants