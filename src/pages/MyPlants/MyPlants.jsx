import React, { useEffect, useState, Suspense } from 'react'
import { lazyWithPreload } from "react-lazy-with-preload";
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectMyPlants,
  isLoadingMyPlants,
  fetchMyPlants
} from '../../features'

import PopupModal from '../../components/popupModal/PopupModal'
import Loader from '../../components/loader/Loader'
import { useSocket } from '../../context/SocketContext'
import PlantCardSkelton from '../../components/cards/PlantCardSkelton'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;

`

const LazyPlantCard = lazyWithPreload(() => import('../../components/cards/PlantCard'));


const MyPlants = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')


  
  const dispatch = useDispatch()

  const isLoadingPlants = useSelector(isLoadingMyPlants)
  const myPlants = useSelector(selectMyPlants)


  useEffect(() => {
  
    const controller = new AbortController
    const signal = controller.signal
    dispatch(fetchMyPlants(signal))
 
    return(()=>{
      controller.abort()
    })
  }, []);



  const openModal = (type, data) => {
    switch (type) {
      case "addPlant":
        setModalType("addPlant")
        setModalOpen(!modalOpen)
        break;
      case "editPlant":
        setModalType("editPlant")
        setModalData(data)
        setModalOpen(!modalOpen)
        break;
      case "deletePlant":
        setModalType("deletePlant")
        setModalData(data)
        setModalOpen(!modalOpen)
        break;
    }
  }

  return (

        <Root
          // initial={{ opacity: 0 }}
          // animate={{ opacity: 1 }}
          // transition={{ duration: 0.25 }}
          // exit={{ opacity: 0 }}
        >
          {modalOpen && <PopupModal openModal={openModal} data={modalData} modalType={modalType} />}
          <Holder>
            <FlexRowEnd
            >
   <Heading
            >
              My Plants
            </Heading>
              <Button onClick={() => { openModal("addPlant") }}><ButtonText>+ Plant</ButtonText></Button>

            </FlexRowEnd>
         

            <EnviromentHolder
            >

          
                {myPlants?.map((p, index) => {
                  return (
                    <Suspense fallback={<PlantCardSkelton />} 
                      key={index}>
                      <LazyPlantCard
                        key={index}
                        data={p}
                        openModal={openModal} />
                    </Suspense>
                    
                  )
                })}
          

            </EnviromentHolder>


          </Holder>
        </Root>

  )
}

export default MyPlants