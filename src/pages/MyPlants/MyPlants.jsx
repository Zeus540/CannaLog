import React, { useEffect, useState, Suspense } from 'react'
import { lazyWithPreload } from "react-lazy-with-preload";
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  selectMyPlants,
  fetchMyPlants
} from '../../features'

import PopupModal from '../../components/popupModal/PopupModal'
import Loader from '../../components/loader/Loader'
import { useSocket } from '../../context/SocketContext'
import PlantCardSkelton from '../../components/cards/PlantCardSkelton'
import PlantCard from '../../components/cards/PlantCard';

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;

`




const MyPlants = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const [pageBottom, setPageBottom] = useState(false)
  const [amount, setAmount] = useState(14)
  const dispatch = useDispatch()

  const myPlants = useSelector(selectMyPlants)

  
  useEffect(() => {

    const controller = new AbortController
    const signal = controller.signal

    if (!myPlants.hasIntialData) {
      dispatch(fetchMyPlants())
    }
    return (() => {
      controller.abort()
    })
  }, []);


  useEffect(() => {
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = scrollY + windowHeight;
      const threshold = 50;
      const isNearEnd = scrollPosition + threshold >= documentHeight;
      setPageBottom(isNearEnd);
    };

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])


  useEffect(() => {
    if (pageBottom) {

      if (myPlants.hasMore) {

        dispatch(fetchMyPlants(myPlants.next_cursor))
      }

    }
  }, [pageBottom])


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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}
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

          {myPlants?.plants?.map((p, index) => {
            return (

              <PlantCard
                key={index}
                data={p}
                openModal={openModal} />
            )
          })}

          {myPlants.loading &&

            [...Array(amount)]?.map((index) => {
              return (

                <PlantCardSkelton key={index}
                />
              )
            })

          }

        </EnviromentHolder>


      </Holder>
    </Root>

  )
}

export default MyPlants