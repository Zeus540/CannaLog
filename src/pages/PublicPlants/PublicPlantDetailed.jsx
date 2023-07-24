import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    selectPublicJournal,
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
import Timeline from '../../components/timeline/Timeline'
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
} from './PublicPlantDetailed_styles'
import { BASE_URL_PROD } from '../../lib/Constants'
import { getLocalizeTime } from '../../helpers/getLocalizeTime'
import { getWeeksElapsed } from '../../helpers/getWeeksElapsed'
import { socket } from '../../lib/socket'

function PublicPlantDetailed() {
    const [plant, setPlant] = useState()
    const [plantActions, setPlantActions] = useState([])
    const [plantEnvironment, setPlantEnvironment] = useState()
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState([])
    const [modalType, setModalType] = useState('')
    const [currentStage, setCurrentStage] = useState()
    const [activeWeek, setActiveWeek] = useState('') 
    const [coverImage, setCoverImage] = useState('') 

    let plants = useSelector(selectPublicJournal)
    let environments = useSelector(selectEnvironments)
    let plant_action_types = useSelector(selectPlantActionTypes)

    const params = useParams()

    useEffect(() => {
        getActions()
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on(`action_taken${params.plant_id}`, (data) => {
                setPlantActions(data)
            });

            socket.on(`stage_changed${params.plant_id}`, (data) => {
                setCurrentStage(data)
              });
        }

     
    })

    
    useEffect(() => {
        setPlant(plants.plants?.filter((p) => p.plant_id == parseInt(params.plant_id))[0])
        setCoverImage(plants.plants?.filter((p) => p.plant_id == parseInt(params.plant_id))[0]?.cover_img)
      
        axios.post(`${BASE_URL_PROD}/plants/current_stage`,{plant_id : params.plant_id})
        .then((response)=>{
            setCurrentStage(response.data)
        console.log("current_stage",response.data)
        })
        .catch((err)=>{
            console.log("err",err)
        })

        axios.post(`${BASE_URL_PROD}/plants/current_environment`,{environment_id : params.environment_id})
        .then((response)=>{
            setPlantEnvironment(response.data)
        })
        .catch((err)=>{
            console.log("err",err)
        })
        
    }, [plants])

 

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
    const handleSetCoverImage = (image)=>{
        console.log("handleSetCoverImage",image)
        axios.patch(`${BASE_URL_PROD}/plants/${params.plant_id}/cover_image`,{cover_img:image})
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
                    {getCurrentDayMonthYear().fullDate} <DayHolder><GiBackwardTime />{plant && `Day ${getElapsedDays(plant?.creation_date)}`} </DayHolder>
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
           
       

            <Weeks startDate={plant?.creation_date} actions={plantActions} handleActiveWeeks={handleActiveWeeks} activeWeek={activeWeek}/>
            <Timeline plant={plant} activeWeek={activeWeek} title="Notes"  actionTypeData={13} handleSetCoverImage={handleSetCoverImage} publicPage={true}/>

            <Timeline plant={plant} activeWeek={activeWeek} title="Gallery" actionTypeData={4} handleSetCoverImage={handleSetCoverImage} publicPage={true}/>

        </Root>

    )
}

export default PublicPlantDetailed