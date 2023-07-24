import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonOutlined, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectMyPlants,
  isLoadingMyPlants,
  selectUser,
} from '../../features'
import PlantCard from '../../components/cards/PlantCard'
import PopupModal from '../../components/popupModal/PopupModal'
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

const MyPlants = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')

  const dispatch = useDispatch()

  
  const isLoadingPlants = useSelector(isLoadingMyPlants)
  const myPlants = useSelector(selectMyPlants)

  {console.log("myPlants",myPlants)}
  

  const user = useSelector(selectUser)

  useEffect(() => {
    
    if (socket) {


    }

  }, [socket]);



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

    <>
      {isLoadingPlants ?
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
          {modalOpen && <PopupModal openModal={openModal} data={modalData} modalType={modalType} />}
          <Holder>
            <FlexRowEnd
            >

              <ButtonOutlined onClick={() => { openModal("addPlant") }}><ButtonText>+ Plant</ButtonText></ButtonOutlined>

            </FlexRowEnd>
            <Heading
            >
              My Plants
            </Heading>

            <EnviromentHolder
            >

              <AnimatePresence >
                {myPlants?.map((p, index) => {
                  return (
                    <>
                    {console.log('pppp',p)}
                    
                    <PlantCard 
                      key={index}
                      length={myPlants.length}
                      index={index}
                      data={p}
                      cover_thumbnail={p.cover_thumbnail}
                      name={p.name}
                      environment_type_name={p.environment_type_name}
                      light_exposure={p.light_exposure}
                      creation_date={p.creation_date}
                      last_updated={p.last_updated}
                  
                      openModal={openModal} />
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

export default MyPlants