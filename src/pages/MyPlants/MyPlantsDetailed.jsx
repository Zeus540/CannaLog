import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    selectMyPlants,
    selectEnvironments,
    selectPlantActionTypes
} from '../../features'
import { useParams } from 'react-router-dom'

import { AiOutlineEye } from 'react-icons/ai'
import { BiLike } from 'react-icons/bi'
import { Heading, Button } from '../../utils/global_styles'
import { MdOutlineWaterDrop } from 'react-icons/md'
import { LiaCutSolid } from 'react-icons/lia'
import axios from '../../lib/axios'
import { GiChemicalDrop } from 'react-icons/gi'
import { AiOutlineCamera } from 'react-icons/ai'
import { RiScales2Line } from 'react-icons/ri'
import { TfiPaintBucket } from 'react-icons/tfi'
import { GoCommentDiscussion } from 'react-icons/go'
import { GiBackwardTime } from 'react-icons/gi'
import { TbNotes } from 'react-icons/tb'
import { TbArrowsExchange } from 'react-icons/tb'
import { TbExchange } from 'react-icons/tb'
import { PiPottedPlantLight } from 'react-icons/pi'
import { FiEdit } from 'react-icons/fi'

import { getCurrentDayMonthYear } from '../../helpers/getCurrentDayMonthYear'
import { getElapsedDays } from '../../helpers/getElapsedDays'
import TimelineNotes from '../../components/timeline/TimelineNotes'
import TimelineImages from '../../components/timeline/TimelineImages'
import TimelineFeeding from '../../components/timeline/TimelineFeeding'

import Weeks from '../../components/weeks/Weeks'
import PopupModal from '../../components/popupModal/PopupModal'

import {
    ImgHolderTop,
    ImgHolderTopInfo,
    ImgHolderTopInfoInner,
    ImgHolderTopInfoInnerRight,
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
    EditPlantInner
} from './MyPlantsDetailed_styles'
import { BASE_URL_PROD } from '../../lib/Constants'
import { getLocalizeTime } from '../../helpers/getLocalizeTime'
import { getWeeksElapsed } from '../../helpers/getWeeksElapsed'
import { useSocket } from '../../context/SocketContext'

function MyPlantsDetailed() {
    const [plant, setPlant] = useState()
    const [plantActions, setPlantActions] = useState([])
    const [plantEnvironment, setPlantEnvironment] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState([])
    const [modalType, setModalType] = useState('')
    const [currentStage, setCurrentStage] = useState()
    const [activeWeek, setActiveWeek] = useState('') 
    const [coverImage, setCoverImage] = useState('') 
    const [fullDate, setFullDate] = useState(getCurrentDayMonthYear().fullDate) 
    let plants = useSelector(selectMyPlants)
    let environments = useSelector(selectEnvironments)
    let plant_action_types = useSelector(selectPlantActionTypes)

    const params = useParams()
    const socket = useSocket()

    useEffect(() => {

        const intervalId = setInterval(() => {
            setFullDate(getCurrentDayMonthYear().fullDate) 
        }, 30000); // Update every minute
    
        return () => {
          clearInterval(intervalId);
        };
      }, []);


    useEffect(() => {
        getActions()
    }, [plants])

    useEffect(() => {
        if (socket) {
            socket.on(`action_taken${params.plant_id}`, (data) => {
                setPlantActions(data)
            });

            socket.on(`stage_changed${params.plant_id}`, (data) => {
                setCurrentStage(data)
              });
        }

    },[socket])

    
    useEffect(() => {
        setPlant(plants?.filter((p) => p.plant_id == parseInt(params.plant_id))[0])
        setCoverImage(plants?.filter((p) => p.plant_id == parseInt(params.plant_id))[0]?.cover_img)
      
        axios.post(`${BASE_URL_PROD}/plants/current_stage`,{plant_id : params.plant_id})
        .then((response)=>{
            setCurrentStage(response.data)
     
        })
        .catch((err)=>{
            console.log("err",err)
        })

    }, [plants])

    useEffect(() => {
        setPlantEnvironment(environments?.filter((e) => e.environment_id == parseInt(params?.environment_id))[0])
    }, [environments])

    const getActions = async () => {
        axios.post(`${BASE_URL_PROD}/plants/actions`, { plant_id: parseInt(await params.plant_id) })
            .then((response) => {

                setPlantActions(response.data)
            }).catch((err) => {
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


    const handleActiveWeeks = (week)=>{
        setActiveWeek(week)
    }
    const handleSetCoverImage = (image,thumbnail)=>{
        console.log("handleSetCoverImage",image)
        axios.patch(`${BASE_URL_PROD}/plants/${params.plant_id}/cover_image`,{cover_img:image,cover_thumbnail:thumbnail})
        .then((response)=>{
            if(response.status == 200){
                setCoverImage(image)
            }
           
        })
        .catch((err)=>{
            console.log(err)
        })
      
    }
    
    return (
        <Root
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            exit={{ opacity: 0 }}
        >
            <ImgHolderTop img={coverImage}>
                <EditPlant>
                    <EditPlantInner>
                        <FiEdit />
                    </EditPlantInner>
                </EditPlant>

                <ImgHolderTopInfo>

                    {modalOpen && <PopupModal openModal={openModal} plant={plant} data={modalData} modalType={modalType} />}

                    <ImgHolderTopInfoInner>

                        <div>
                            <h1>{plant?.plant_name}</h1>
                            <Tag bg={currentStage?.stage_color}>
                            {currentStage?.stage_name}
                         
                            </Tag>
                            {plant?.user_name}
                         
                    

                        </div>
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

         

            <Section>

                <Heading>
                    Environment
                </Heading>

                <div>
                    {plantEnvironment?.environment_name}   {plantEnvironment?.environment_type_name}
                </div>

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
           
         
            
            <QuickActionHolder>

                <Heading>
                    Quick Actions
                </Heading>
                <QuickActionHolderInner>

                    {plant_action_types?.map((action, index) => {
                        return (
                            <QuickAction onClick={() => { openModal("takeAction", action) }}>
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

            <Weeks startDate={plant?.creation_date} actions={plantActions} handleActiveWeeks={handleActiveWeeks} activeWeek={activeWeek}/>
            <TimelineNotes plant={plant} activeWeek={activeWeek} title="Notes"  actionTypeData={13} handleSetCoverImage={handleSetCoverImage} />
            <TimelineFeeding plant={plant} activeWeek={activeWeek} title="Watering" actionTypeData={1} handleSetCoverImage={handleSetCoverImage}/>
            <TimelineImages plant={plant} activeWeek={activeWeek} title="Gallery" actionTypeData={4} handleSetCoverImage={handleSetCoverImage}/>

        
        </Root>

    )
}

export default MyPlantsDetailed