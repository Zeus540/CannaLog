import  { useEffect, useState } from 'react'


import { Holder,  FlexRowEnd,  ButtonText,StyledButton } from '../../utils/global_styles'
import { useDispatch,useSelector } from 'react-redux'
import {
  selectMyPlants,
  fetchMyPlants
} from '../../features'
import { IoMdAdd } from "react-icons/io";
import PlantCardSkelton from '../../components/cards/PlantCardSkelton'
import PlantCard from '../../components/cards/PlantCard';
import Blank from '../../components/skeleton/Blank';
import PopupModal from '../../components/popupModal/PopupModal'
import Banner from '../../components/banner/Banner'
import SearchImg from '../../assets/images/search.jpg'
import Seo from '../../components/seo/Seo'
import {EnviromentHolder,SRoot} from './MyPlants_styles'

const MyPlants = () => {

  const [modalOpen, setModalOpen] = useState(false)
  const [modalData, setModalData] = useState([])
  const [modalType, setModalType] = useState('')
  const [pageBottom, setPageBottom] = useState(false)
  const [amount] = useState(14)
  const dispatch = useDispatch()

  const myPlants = useSelector(selectMyPlants)

  const controller = new AbortController
  const signal = controller.signal

//const PopupModal = lazy(()=> import('../../components/popupModal/PopupModal'))


  useEffect(() => {

    let obj = {
      limit: 14,
      limit_mobile: 6,
      key: undefined,
      signal
    }

    if (!myPlants.hasIntialData) {
      dispatch(fetchMyPlants(obj))
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
    if (pageBottom && myPlants.hasMore) {

      let obj = {
        limit: 14,
        limit_mobile: 6,
        key: myPlants.next_cursor,
        signal
      }
      dispatch(fetchMyPlants(obj))

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

    <>
    <Seo noFollow title="My Grow Logs" content="Refine Your Home Cannabis Garden! Personalized Guidance for Your Plants. Optimize Your Grow Today!"/>
     <Banner bg={SearchImg} heading="My Grow Logs" txt1="Refine Your Home Cannabis Garden! Personalized Guidance for Your Plants." txt2="Optimize Your Growth Today!"/>
   
     <SRoot
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0 }}
        >
   

      {modalOpen && <PopupModal openModal={openModal} data={modalData} modalType={modalType} />}
 

      <Holder>
        <FlexRowEnd
        >
          {/* {myPlants.hasIntialData ?
            <Heading>
              My Plants
            </Heading>
            :
            <Blank w="100px" h='30px'/>
          } */}
          {myPlants.hasIntialData ?
            <StyledButton onClick={() => { openModal("addPlant") }}><ButtonText><IoMdAdd />Plant</ButtonText></StyledButton>
            :
            <Blank w="150px" h='40px'  />
          }


        </FlexRowEnd>
        <EnviromentHolder
        >
          {myPlants.hasIntialData && <>
            {myPlants?.plants?.map((p, index) => {
              return (
                <PlantCard
                  key={index}
                  data={p}
                  openModal={openModal} />
              )
            })}
          </>
          }
          {myPlants.loading &&

            [...Array(amount).keys()]?.map((index) => {
              return (
                <PlantCardSkelton key={index} />
              )
            })

          }

        </EnviromentHolder>
      </Holder>
    </SRoot>
    </>
  )
}

export default MyPlants