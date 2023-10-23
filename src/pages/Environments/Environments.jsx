import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  fetchEnvironments,
  selectMyPlants,
  selectEnvironments,
  selectEnvironmentsIsLoading,
  selectEnvironmentsHasMore,
  selectNextCursor,
  selectHasIntialData,
} from '../../features'
import EnviromentCard from '../../components/cards/EnviromentCard'
import PopupModal from '../../components/popupModal/PopupModal'
import { IoMdAdd } from "react-icons/io";
import { useSocket } from '../../context/SocketContext'
import { useSnackbar } from 'notistack';
import EnviromentCardSkelton from '../../components/cards/EnviromentCardSkelton'
import Blank from '../../components/skeleton/Blank'

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
  const [amount, setAmount] = useState(10)

  const dispatch = useDispatch()

  const environments = useSelector(selectEnvironments)
  const environmentsIsLoading = useSelector(selectEnvironmentsIsLoading)

  const myPlants = useSelector(selectMyPlants)
  const hasMore = useSelector(selectEnvironmentsHasMore)


  const next_cursor = useSelector(selectNextCursor)
  const hasIntialData = useSelector(selectHasIntialData)

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
      limit: 10,
      limit_mobile: 6,
      key: undefined,
      signal
    }
    if (!hasIntialData) {
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
    if (pageBottom && hasMore) {

      let obj = {
        limit: 10,
        limit_mobile: 6,
        key: next_cursor,
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

    <Root
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      exit={{ opacity: 0 }}

    >
      {modalOpen && <PopupModal openModal={openModal} data={modalData} modalType={modalType} />}
      <Holder>
        <FlexRowEnd>
          {hasIntialData ?  
          <Heading>
           My Environments
          </Heading>
          : 
          <Blank w="100px" h='30px' />
          }

          {hasIntialData ? 
          <Button onClick={() => { openModal("addEnvironment") }}><ButtonText><IoMdAdd />Environemt</ButtonText></Button>
          : 
          <Blank w="150px" h='40px' />
          }
        </FlexRowEnd>

        <EnviromentHolder>

          {hasIntialData && <>
            {environments?.map((e, index) => {
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

          {environmentsIsLoading &&

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

  )
}

export default Environments