import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    selectIsLoggedIn
} from '../../features'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns';
import axios from '../../lib/axios'
import { AiOutlineEye } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { GoCommentDiscussion } from 'react-icons/go'
import { GiBackwardTime } from 'react-icons/gi'
import { BsPersonCircle } from "react-icons/bs";
import { getCurrentDayMonthYear } from '../../helpers/getCurrentDayMonthYear'
import { getElapsedDays } from '../../helpers/getElapsedDays'
import Weeks from '../../components/weeks/Weeks'
import TimelineNotes from '../../components/timeline/TimelineNotes'
import TimelineImages from '../../components/timeline/TimelineImages'
import TimelineFeeding from '../../components/timeline/TimelineFeeding'
import { useSnackbar } from 'notistack';
import {
    ImgHolderTop,
    ImgHolderTopInfo,
    ImgHolderTopInfoInner,
    ImgHolderTopInfoInnerRight,
    ImgHolderTopInfoInnerLeft,
    DayHolderOutter,
    DayHolderOutterInner,
    DayHolder,
    Section,
    Root,
    Tag,
    ExposureItemHolder,
    ExposureItemHolderOutter,
    ExposureItemGroup,
    ExposureItem,
    UserHolder,
    TagHolder
} from './PublicPlantDetailed_styles'
import { BASE_URL_PROD } from '../../lib/Constants'
import { useSocket } from '../../context/SocketContext'

function PublicPlantDetailed() {
    const [plant, setPlant] = useState()
    const [plantActions, setPlantActions] = useState([])
    const [plantEnvironment, setPlantEnvironment] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState([])
    const [modalType, setModalType] = useState('')
    const [currentStage, setCurrentStage] = useState()
    const [activeWeek, setActiveWeek] = useState(undefined)
    const [coverImage, setCoverImage] = useState('')

    const { enqueueSnackbar } = useSnackbar()

    let LoggedIn = useSelector(selectIsLoggedIn)

    const params = useParams()
    const socket = useSocket()

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
            let response = await axios.post(`${BASE_URL_PROD}/plants/public/${plant_id}`)
            if (response.status == 200) {
                await setPlant(response.data)
                await setCoverImage(response.data.cover_img)
                await getEnvironment(environment_id)
                await getActions(plant_id)
                await getStage(plant_id)
                if (LoggedIn) {
                    updateView(response.data.user_id, response.data.plant_id)
                }
            }
        } catch (error) {
            enqueueSnackbar(`${error.response.status} ${error.response.data}`, { variant: 'error' })
        }

    }

    const getEnvironment = (environment_id) => {

        axios.post(`${BASE_URL_PROD}/plants/current_environment/public`, { environment_id: environment_id })
            .then((response) => {
                if (response.status == 200) {
                    setPlantEnvironment(response.data)
                }
            })
            .catch((err) => {
                enqueueSnackbar(`${err.response.status} ${err.response.data}`, { variant: 'error' })
            })

    }

    const getStage = (plant_id) => {

        axios.post(`${BASE_URL_PROD}/plants/current_stage/public`, { plant_id: plant_id })
            .then((response) => {
                if (response.status == 200) {
                    setCurrentStage(response.data)
                }
            })
            .catch((err) => {
                enqueueSnackbar(`${err.response.status} Unable to fetch current stage for this plant`, { variant: 'error' })
            })

    }

    const getActions = (plant_id) => {
        axios.post(`${BASE_URL_PROD}/plants/actions/public`, { plant_id: plant_id })
            .then((response) => {
                if (response.status == 200) {
                    setPlantActions(response.data)
                }
            }).catch((err) => {
                enqueueSnackbar(`${err.response.status} Unable to fetch actions for this plant`, { variant: 'error' })
            })
    }

    const updateView = (user_id, plant_id) => {

        const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        let data = {
            creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
            timezone: userTimezone,
            plant_user_id: user_id
        }

        axios.post(`${BASE_URL_PROD}/plants/viewed/${plant_id}`, data)
            .then((response) => {
                console.log(response)
            })

            .catch((err) => {
                console.log(err)
            })

    }

    const openModal = (type, action) => {
        switch (type) {
            case "takeAction":
                setModalType("takeAction")
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
        setActiveWeek(week)
    }

    const handleSetCoverImage = (image) => {
        console.log("handleSetCoverImage", image)
        axios.patch(`${BASE_URL_PROD}/plants/${params.plant_id}/cover_image`, { cover_img: image })
            .then((response) => {
                if (response.status == 200) {
                    setCoverImage(image)
                }

            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <Root
        initial={{ translateX: '-100%',opacity: 0 }}
        animate={{ translateX: '0%',opacity: 1 }}
        transition={{ duration: 0.5 }}
        exit={{ translateX: '-100%',opacity: 0 }}
        >
            <ImgHolderTop img={coverImage}>

                <ImgHolderTopInfo>


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
                                <p><GoCommentDiscussion /> 0</p>
                            </div>
                        </ImgHolderTopInfoInnerRight>
                    </ImgHolderTopInfoInner>
                    <DayHolderOutter>
                        <DayHolderOutterInner>
                            {getCurrentDayMonthYear().fullDate} <DayHolder><GiBackwardTime />{plant && `Day ${getElapsedDays(plant?.creation_date)}`} </DayHolder>
                        </DayHolderOutterInner>
                    </DayHolderOutter>
                </ImgHolderTopInfo>

            </ImgHolderTop>

            <Weeks startDate={plant?.creation_date} actions={plantActions} handleActiveWeeks={handleActiveWeeks} activeWeek={activeWeek} />
            <TimelineNotes plant={plant} activeWeek={activeWeek} title="Notes" publicPage={true} />
            <TimelineFeeding plant={plant} activeWeek={activeWeek} title="Watering" publicPage={true} />
            <TimelineImages plant={plant} activeWeek={activeWeek} title="Gallery" handleSetCoverImage={handleSetCoverImage} publicPage={true} />
        </Root>

    )
}

export default PublicPlantDetailed