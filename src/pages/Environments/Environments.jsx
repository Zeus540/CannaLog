import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonOutlined, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  fetchEnvironments,
  fetchEnvironmentTypes,
  fetchMyPlants,
  selectMyPlants,
  selectEnvironments,
  selectEnvironmentsIsLoading,
  addEnvironmentLocally,
  editEnvironmentLocally,
  selectUser,
  deleteEnvironmentLocally
} from '../../features'
import EnviromentCard from '../../components/cards/EnviromentCard'
import PopupModal from '../../components/popupModal/PopupModal'
import Loader from '../../components/loader/Loader'
import { AnimatePresence } from 'framer-motion'
import { IoMdAdd } from "react-icons/io";
import { useSocket } from '../../context/SocketContext'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;
@media (max-width: 425px) {
  flex-direction: column;
}
`

const Environments = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')

  const dispatch = useDispatch()

  const environments = useSelector(selectEnvironments)
  const environmentsIsLoading = useSelector(selectEnvironmentsIsLoading)

  const myPlants = useSelector(selectMyPlants)

  let environmentsLength = environments.length

  const user = useSelector(selectUser)
  const socket = useSocket()
 
  useEffect(() => {
      
    console.log("socket",socket);

    if(socket.connected){

       socket.on(`environment_added${user.user_id}`, (data) => {
         dispatch(addEnvironmentLocally(data));
         console.log(data);
       });

      
        socket.on(`environment_edited${user.user_id}`, (data) => {
          dispatch(editEnvironmentLocally(data));
          console.log(data);
        });
     
        socket.on(`environment_deleted${user.user_id}`, (data) => {
         dispatch(deleteEnvironmentLocally(parseInt(data)));
         console.log("dispatch",data);
       });

      }

      //might add cleanup
      
  },[socket]);

 


  const openModal = (type, data) => {
    switch (type) {
      case "addEnvironment":
        setModalType("addEnvironment")
        setModalOpen(!modalOpen)
        break;
      case "editEnvironment":
        setModalType("editEnvironment")
        setModalData(data)
        setModalOpen(!modalOpen)
        break;
        case "deleteEnvironment":
          setModalType("deleteEnvironment")
          setModalData(data)
          setModalOpen(!modalOpen)
          break;
      case "addEnvironmentLog":
        setModalType("addEnvironmentLog")
        setModalData(data)
        setModalOpen(!modalOpen)
        break;
  
    }
  }

  return (

    <>
      {environmentsIsLoading ?
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

              <ButtonOutlined onClick={() => { openModal("addEnvironment") }}><ButtonText><IoMdAdd/>Environemt</ButtonText></ButtonOutlined>

            </FlexRowEnd>
            <Heading
            >
              My Environments
            </Heading>

            <EnviromentHolder
            >

              <AnimatePresence >
                {environments?.map((e, index) => {
                  return (
                    <EnviromentCard
                      key={index}
                      length={environmentsLength}
                      index={index}
                      data={e}
                      cover_img={e.environment_cover_img}
                      name={e.environment_name}
                      environment_type_name={e.environment_type_name}
                      light_exposure={e.environment_light_exposure}
                      creation_date={e.creation_date}
                      last_updated={e.last_updated}
                      myPlants={myPlants.filter((p) => p.environment_id == e.environment_id)}
                      openModal={openModal} />
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

export default Environments