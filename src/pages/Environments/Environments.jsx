import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, StyledButton, ButtonText } from '../../utils/global_styles'
import { useDispatch,useSelector } from 'react-redux'
import {
  fetchEnvironments,
  selectMyPlants,
  selectEnvironments,
} from '../../features'
import EnviromentCard from '../../components/cards/EnviromentCard'

import { IoMdAdd } from "react-icons/io";
import EnviromentCardSkelton from '../../components/cards/EnviromentCardSkelton'
import Blank from '../../components/skeleton/Blank'
import PopupModal from '../../components/popupModal/PopupModal'
import Seo from '../../components/seo/Seo'

const EnviromentHolder = styled(m.div)`
margin-top:20px;
display:flex;
margin: 0px -10px;
flex-wrap: wrap;
@media (max-width: 425px) {
  flex-direction: column;
}
`

const LoadMoreHolder = styled(m.div)`
margin: 20px;
color: ${(props) => props.theme.accent};
display: flex;
justify-content: center;
flex-wrap: wrap;
font-size: 18px;
button{
  cursor: pointer;
}
`

const Environments = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const [pageBottom, setPageBottom] = useState(false)
  const [amount, setAmount] = useState(12)

  const dispatch = useDispatch()

  const environments = useSelector(selectEnvironments)


  let environmentsLength = environments.length



  // useEffect(() => {

  //   if(socket.connected){

  //      socket.on(`environment_added${user.user_id}`, (data) => {
  //        dispatch(addEnvironmentLocally(data));
  //        enqueueSnackbar(`${data.environment_name} Added`, { variant: 'success' })
  //      });


  //       socket.on(`environment_edited${user.user_id}`, (data) => {
  //         dispatch(editEnvironmentLocally(data));
  //         enqueueSnackbar(`${data.environment_name} Edited`, { variant: 'success' })
  //       });

  //       socket.on(`environment_deleted${user.user_id}`, (data) => {
  //        dispatch(deleteEnvironmentLocally(parseInt(data)));
  //        enqueueSnackbar(`${data.environment_name} Deleted`, { variant: 'success' })
  //      });

  //     }

  //     return () =>{
  //       if(socket.connected){
  //       socket.off(`environment_added${user.user_id}`)
  //       socket.off(`environment_edited${user.user_id}`)
  //       socket.off(`environment_deleted${user.user_id}`)
  //       }
  //     }

  // },[socket]);

  const lastCard = useRef(null);

  const controller = new AbortController
  const signal = controller.signal

  useEffect(() => {

    let obj = {
      limit: 12,
      limit_mobile: 6,
      key: undefined,
      signal
    }
    if (!environments.hasIntialData) {
      dispatch(fetchEnvironments(obj))
    }

    return (() => {
      controller.abort()
    })
  }, [])

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
    if (pageBottom && environments.hasMore) {

      let obj = {
        limit: 12,
        limit_mobile: 6,
        key: environments.next_cursor,
        signal
      }

      dispatch(fetchEnvironments(obj))

    }
  }, [pageBottom])

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
<Seo title="My Environments" noFollow content="Gain insights into your cannabis cultivation environments with our dedicated grow space page. Explore detailed information about your grow setups, monitor conditions, and optimize your cultivation process. Stay in control and maximize your yields by accessing comprehensive data on your cannabis grow environments. Join now for a personalized and informed cultivation experience."/>
    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.10 }}
      exit={{ opacity: 0 }}

    >
      {modalOpen && <PopupModal openModal={openModal} data={modalData} modalType={modalType} />}
      <Holder>
        <FlexRowEnd>
          {environments.hasIntialData ?  
          <Heading>
           My Environments
          </Heading>
          : 
          <Blank w="100px" h='30px' />
          }

          {environments.hasIntialData ? 
          <StyledButton onClick={() => { openModal("addEnvironment") }}><ButtonText><IoMdAdd />Environemt</ButtonText></StyledButton>
          : 
          <Blank w="150px" h='40px' />
          }
        </FlexRowEnd>

        <EnviromentHolder>

          {environments.hasIntialData && <>
            {environments.environments?.map((e, index) => {
              return (
                <EnviromentCard
                  refValue={lastCard}
                  key={index}
                  length={environmentsLength}
                  index={index}
                  data={e}
                  openModal={openModal} />
              )
            })}
          </>
          }

          {environments.loading &&

            [...Array(amount).keys()]?.map((index) => {
              return (

                <EnviromentCardSkelton key={index}
                />
              )
            })

          }


        </EnviromentHolder>

      </Holder>
    </Root>

</>
  )
}

export default Environments