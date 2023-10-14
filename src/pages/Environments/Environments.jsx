import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { motion as m } from 'framer-motion'
import { Holder, Root, Heading, FlexRowEnd, Button, ButtonText } from '../../utils/global_styles'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  fetchEnvironments,
  fetchMyPlants,
  selectMyPlants,
  selectEnvironments,
  selectEnvironmentsIsLoading,
  selectEnvironmentsHasMore,
  selectNextCursor,
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
import { useSnackbar } from 'notistack';
import { useInView } from "framer-motion"

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
color: ${(props)=>props.theme.accent};
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
  
  const dispatch = useDispatch()

  const environments = useSelector(selectEnvironments)
  const environmentsIsLoading = useSelector(selectEnvironmentsIsLoading)

  const myPlants = useSelector(selectMyPlants)
  const hasMore = useSelector(selectEnvironmentsHasMore)


const next_cursor = useSelector(selectNextCursor)
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
  
  useEffect(() => {
    if(environments?.length == 0){
      dispatch(fetchEnvironments(""))
    }
  }, [])

 useEffect(() => {

    const handleScroll = () => {
      const lastCardRect = lastCard?.current?.getBoundingClientRect();
      if(lastCard.current !== null){
 
  
      const isElementInViewport = (
        lastCardRect.top >= 0 &&
        lastCardRect.bottom <= window.innerHeight
      );

      setPageBottom(isElementInViewport)
    }
    };

  


  window.addEventListener('scroll',handleScroll)
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, [lastCard])

useEffect(() => {
  if(pageBottom){

    if(hasMore){
      dispatch(fetchEnvironments(next_cursor))
    }
    
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

              <Button onClick={() => { openModal("addEnvironment") }}><ButtonText><IoMdAdd/>Environemt</ButtonText></Button>

            </FlexRowEnd>
            <Heading
            >
              My Environments
            </Heading>

            <EnviromentHolder
            >

              
                {environments?.map((e, index) => {
                   return (
                    <EnviromentCard
                    refValue={lastCard}
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
            

            </EnviromentHolder>

      {hasMore ? 
      <LoadMoreHolder ref={lastCard} >
        <button onClick={()=>{setPageBottom(true)}}>Load More</button>
      </LoadMoreHolder> 
      : 
      null}
          </Holder>
        </Root>
      }
    </>
  )
}

export default Environments