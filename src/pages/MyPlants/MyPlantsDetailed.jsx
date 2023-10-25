import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchPlantActionTypes,
    selectPlantActionTypes,
} from '../../features'
import { useParams } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { LiaCutSolid } from 'react-icons/lia'
import axios from '../../lib/axios'
import { AiOutlineCamera } from 'react-icons/ai'
import { RiScales2Line } from 'react-icons/ri'
import { TfiPaintBucket } from 'react-icons/tfi'
import { GoCommentDiscussion } from 'react-icons/go'
import { GiBackwardTime } from 'react-icons/gi'
import { TbNotes } from 'react-icons/tb'
import { TbArrowsExchange,TbExchange } from 'react-icons/tb'
import { PiPottedPlantLight } from 'react-icons/pi'
import { FiEdit } from 'react-icons/fi'
import { BsPersonCircle } from "react-icons/bs";
import { getCurrentDayMonthYear } from '../../helpers/getCurrentDayMonthYear'
import { getElapsedDays } from '../../helpers/getElapsedDays'
import TimelineNotes from '../../components/timeline/TimelineNotes'
import TimelineImages from '../../components/timeline/TimelineImages'
import TimelineFeeding from '../../components/timeline/TimelineFeeding'
import Weeks from '../../components/weeks/Weeks'

import {
    ImgHolderTop,
    ImgHolderTopInfo,
    ImgHolderTopInfoInner,
    ImgHolderTopInfoInnerRight,
    ImgHolderTopInfoInnerLeft,
    TagHolder,
    DayHolderOutter,
    DayHolderOutterInner,
    DayHolder,
    Section,
    QuickActionHolder,
    QuickActionHolderInner,
    QuickAction,
    Root,
    Tag,
    ExposureItemHolder,
    ExposureItemHolderOutter,
    ExposureItemGroup,
    ExposureItem,
    EditPlant,
    EditPlantInner,
    UserHolder
} from './MyPlantsDetailed_styles'
import { BASE_URL_PROD } from '../../lib/Constants'
import { useSocket } from '../../context/SocketContext'
import { useSnackbar } from 'notistack';
import PopupModal from '../../components/popupModal/PopupModal'

function MyPlantsDetailed() {
    const [plant, setPlant] = useState()
    const [plantActions, setPlantActions] = useState([])
    const [plantEnvironment, setPlantEnvironment] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState([])
    const [modalType, setModalType] = useState('')
    const [currentStage, setCurrentStage] = useState()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeWeek, setActiveWeek] = useState(undefined)
    const [coverImage, setCoverImage] = useState('')
    const [fullDate, setFullDate] = useState(getCurrentDayMonthYear().fullDate)
    const params = useParams()
    const socket = useSocket()
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch()

    

    let plant_action_types = useSelector(selectPlantActionTypes)

    useEffect(() => {

        const intervalId = setInterval(() => {
            setFullDate(getCurrentDayMonthYear().fullDate)
        }, 30000); // Update every minute

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    useEffect(() => {
        if (socket) {
            socket.on(`action_taken${params.plant_id}`, (data) => {
                setPlantActions(data)
            });

            socket.on(`stage_changed${params.plant_id}`, (data) => {
                setCurrentStage(data)
            });
        }

    }, [socket])


    useEffect(() => {
        getPlantInfo(params.plant_id, params.environment_id)

    }, [])

    const getPlantInfo = async (plant_id, environment_id) => {
        try {
            let response = await axios.post(`${BASE_URL_PROD}/plants/${plant_id}`)

            if (response.status == 200) {
                await setCoverImage(response.data.cover_img)
                await setPlant(response.data)
      
                await getEnvironment(environment_id)
                await getStage(plant_id)
                await dispatch(fetchPlantActionTypes())
                await getActions(plant_id)
            }
            
        } catch (error) {
 
            enqueueSnackbar(`${error.response.status} ${error.response.data}`, { variant: 'error' })
        }

    }

    const getEnvironment = (environment_id) => {

        axios.post(`${BASE_URL_PROD}/plants/current_environment`, { environment_id: environment_id })
            .then((response) => {
                if (response.status == 200) {
                    setPlantEnvironment(response.data)
                }
            })
            .catch((err) => {
                enqueueSnackbar(`${err.response.status} ${err.response.data}`, { variant: 'error' })
            })

    }

    const getActions = (plant_id) => {
        axios.post(`${BASE_URL_PROD}/plants/actions`, { plant_id: plant_id })
            .then((response) => {
                if (response.status == 200) {
                    setPlantActions(response.data)
                }
            }).catch((err) => {
                enqueueSnackbar(`${err.response.status} Unable to fetch actions for this plant`, { variant: 'error' })
            })
    }

    const getStage = (plant_id) => {

        axios.post(`${BASE_URL_PROD}/plants/current_stage`, { plant_id: plant_id })
            .then((response) => {
                if (response.status == 200) {
                    setCurrentStage(response.data)
                }
            })
            .catch((err) => {
                enqueueSnackbar(`${err.response.status} Unable to fetch current stage for this plant`, { variant: 'error' })
            })

    }

    const openModal = (type, action) => {
        switch (type) {
            case "takeAction":
                setModalType("takeAction")
                setIsSubmitting(isSubmitting)
                setModalData(action)
                setModalOpen(!modalOpen)
                break;
            case "deleteNote":
                setModalType("deleteNote")
                setModalData(action)
                setModalOpen(!modalOpen)
                break;

        }
    }

    const handleActiveWeeks = (week) => {
        console.log(week)
        setActiveWeek(week)
    }

    const handleSetCoverImage = (image) => {

        axios.patch(`${BASE_URL_PROD}/plants/${params.plant_id}/cover_image`, { cover_img: image.full_img, cover_img_next_gen: image.full_img_next_gen, cover_thumbnail: image.thumbnail_img ,cover_thumbnail_next_gen: image.thumbnail_img_next_gen })
            .then((response) => {
                if (response.status == 200) {
                    setCoverImage(image.full_img)
                    enqueueSnackbar(`Cover updated`, { variant: 'success' })
                }
            })
            .catch((err) => {
                enqueueSnackbar(`${err.response.status} Cant update Cover`, { variant: 'error' })
            })

    }

    return (
        <Root
        initial={{ translateX: '-100%',opacity: 1 }}
        animate={{ translateX: '0%',opacity: 1 }}
        transition={{ duration: 0.4 }}
        exit={{ translateX: '-100%',opacity: 1 }}
        >
            <ImgHolderTop img={coverImage}>
                <EditPlant>
                    <EditPlantInner>
                        <FiEdit />
                    </EditPlantInner>
                </EditPlant>

                <ImgHolderTopInfo>
             
                
           
                    {modalOpen && <PopupModal openModal={openModal} plant={plant} data={modalData} modalType={modalType} isSubmitting={isSubmitting} setModalOpen={setModalOpen} setIsSubmitting={setIsSubmitting}/>}
                    
                 
                 
                    <ImgHolderTopInfoInner>

                        <ImgHolderTopInfoInnerLeft>
                            <h1>{plant?.plant_name}</h1>
                            <Tag bg={currentStage?.stage_color}>
                                {currentStage?.stage_name}

                            </Tag>
                            <UserHolder>
                                <BsPersonCircle />{plant?.user_name}
                            </UserHolder>


                            <Section>

                                <TagHolder>
                                    <div>
                                        {plantEnvironment?.environment_type_name}
                                    </div>
                                    <div>
                                        {plantEnvironment?.environment_name}
                                    </div>
                                </TagHolder>
                                <ExposureItemHolderOutter>
                                    <div>Light Exposure</div>
                                    <ExposureItemHolder>
                                        {plantEnvironment?.environment_light_exposure !== 0 &&
                                            <ExposureItemGroup width={(plantEnvironment?.environment_light_exposure / 24) * 100}>

                                                <ExposureItem radius="5px 0px 0px 5px" bg1="#ff9800" bg2="#ffeb3b" ></ExposureItem>
                                                <p>{plantEnvironment?.environment_light_exposure} hrs On</p>
                                            </ExposureItemGroup>
                                        }
                                        {24 - plantEnvironment?.environment_light_exposure !== 0 &&
                                            <ExposureItemGroup width={((24 - plantEnvironment?.environment_light_exposure) / 24) * 100}>

                                                <ExposureItem radius="0px 5px 5px 0px" bg1="#005bad" bg2="#006bcb"></ExposureItem>
                                                <p> {24 - plantEnvironment?.environment_light_exposure} hrs Off</p>
                                            </ExposureItemGroup>
                                        }
                                    </ExposureItemHolder>
                                </ExposureItemHolderOutter>

                            </Section>
                        </ImgHolderTopInfoInnerLeft>

                        <ImgHolderTopInfoInnerRight>
                            <div>
                                <p><AiOutlineEye /> {plant?.views}</p>
                            </div>
                            <div>
                                <p><BiLike /> {plant?.likes}</p>
                            </div>
                            <div>
                                <p><GoCommentDiscussion /> {plant?.likes}</p>
                            </div>
                        </ImgHolderTopInfoInnerRight>
                    </ImgHolderTopInfoInner>

                    <DayHolderOutter>
                        <DayHolderOutterInner>
                            {fullDate} <DayHolder><GiBackwardTime />{plant && `Day ${getElapsedDays(plant?.creation_date)}`} </DayHolder>
                        </DayHolderOutterInner>
                    </DayHolderOutter>
                </ImgHolderTopInfo>

            </ImgHolderTop>







            <QuickActionHolder>

                {/* <Heading>
                    Quick Actions
                </Heading> */}
                <QuickActionHolderInner>

                    {plant_action_types?.map((action, index) => {
                        return (
                            <QuickAction key={index} onClick={() => { openModal("takeAction", action) }}>
                                {action.plant_action_type_id == 1 && <MdOutlineWaterDrop />}
                                {action.plant_action_type_id == 3 && <LiaCutSolid />}
                                {action.plant_action_type_id == 4 && <AiOutlineCamera />}
                                {action.plant_action_type_id == 13 && <TbNotes />}
                                {action.plant_action_type_id == 16 && <PiPottedPlantLight />}
                                {action.plant_action_type_id == 6 && <TfiPaintBucket />}
                                {action.plant_action_type_id == 14 && <TbArrowsExchange />}
                                {action.plant_action_type_id == 5 && <RiScales2Line />}
                                {action.plant_action_type_id == 15 && <TbExchange />}
                                <p>{action.plant_action_type_name}</p>
                            </QuickAction>
                        )
                    })}
                </QuickActionHolderInner>
            </QuickActionHolder>

            <Weeks startDate={plant?.creation_date} actions={plantActions} handleActiveWeeks={handleActiveWeeks} activeWeek={activeWeek} />
            <TimelineNotes plant={plant} activeWeek={activeWeek} title="Notes" openModal={openModal}/>
            <TimelineFeeding plant={plant} activeWeek={activeWeek} title="Watering" />
            <TimelineImages plant={plant} activeWeek={activeWeek} title="Gallery" handleSetCoverImage={handleSetCoverImage} />


        </Root>

    )
}

export default MyPlantsDetailed