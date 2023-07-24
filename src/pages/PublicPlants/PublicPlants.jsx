import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonOutlined, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectPublicJournal,
  isLoadingMyPlants,
} from '../../features'
import PlantCardPublic from '../../components/cards/PlantCardPublic'
import Loader from '../../components/loader/Loader'
import { AnimatePresence } from 'framer-motion'
import { socket } from '../../lib/socket'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;
@media (max-width: 425px) {
  flex-direction: column;
}
`

const PublicPlants = () => {


  const isLoadingPlants = useSelector(selectPublicJournal)
  const publicPlants = useSelector(selectPublicJournal)

console.log("publicPlants",publicPlants.plants)
  useEffect(() => {
    
    if (socket) {

    //   socket.on(`environment_added${user.user_id}`, (data) => {
    //     dispatch(addEnvironmentLocally(data));
    //     console.log(data);
    //   });

    //    socket.on(`environment_edited${user.user_id}`, (data) => {
    //      dispatch(editEnvironmentLocally(data));
    //      console.log(data);
    //    });

    //    socket.on(`environment_deleted${user.user_id}`, (data) => {
    //     dispatch(deleteEnvironmentLocally(parseInt(data)));
    //     console.log("dispatch",data);
    //   });

    }

  }, [socket]);


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
          
            <Heading
            >
              Public Plants
            </Heading>

            <EnviromentHolder
            >

              <AnimatePresence >
                {publicPlants.plants?.map((p, index) => {
                  return (
                    <>
                    {console.log(p)}
                    
                    <PlantCardPublic 
                      key={index}
                      length={publicPlants.plants.length}
                      index={index}
                      data={p}
                      cover_thumbnail={p.cover_thumbnail}
                      name={p.name}
                      environment_type_name={p.environment_type_name}
                      light_exposure={p.light_exposure}
                      creation_date={p.creation_date}
                      last_updated={p.last_updated}
                 />
                    </>
                  )
                })}
              </AnimatePresence>

            </EnviromentHolder>


          </Holder>
        </Root>
      }
    </>
  )
}

export default PublicPlants