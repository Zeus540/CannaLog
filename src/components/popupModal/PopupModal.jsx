import React from 'react'
import { Root, Modal, ModalClose, ModalCloseHolder, ModalContent, Warn,ModalContentText} from './PopupModal_styles'
import { CgCloseR } from "react-icons/cg";
import {  ButtonModalOutlined } from '../../utils/global_styles';
import axios from '../../lib/axios';
import { BASE_URL_PROD } from '../../lib/Constants';
import { deleteEnvironment,deletePlant } from '../../features';
import { useDispatch } from 'react-redux';
import AddEvironment from '../forms/AddEvironment';
import AddPlant from '../forms/AddPlant';
import ChangeStage from '../forms/ChangeStage';
import AddNote from '../forms/AddNote';

const PopupModal = ({ openModal, data, modalType,plant }) => {
  
const dispatch = useDispatch()


  const handleSubmit = async(e)=>{
   

    await dispatch(deleteEnvironment(e.environment_id))
    
    openModal(modalType)
  }

  const handleSubmitDeletePlant = async(e)=>{
    console.log("e",e.plant_id)

    await dispatch(deletePlant(e.plant_id))
    
    openModal(modalType)
  }
  
  return (
    <Root >
      <Modal>
        <ModalClose ><CgCloseR onClick={() => openModal(modalType)} /></ModalClose>
        <ModalContent>
          {modalType == "deleteEnvironment" &&
            <>
              <ModalContentText>
                Are you sure you want to delete<br/>
                {data.name} ?
              </ModalContentText>
             
              <Warn>
                Warning this action will delete all information relating to {data?.name} this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={()=>{handleSubmit(data)}}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }
   {modalType == "deletePlant" &&
            <>
              <ModalContentText>
                Are you sure you want to delete<br/>
                {data?.plant_name} ?
              </ModalContentText>
             
              <Warn>
                Warning this action will delete all information relating to {data?.plant_name} this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={()=>{handleSubmitDeletePlant(data)}}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }

          {(modalType == "addEnvironment") &&
       <AddEvironment modalType={modalType} openModal={openModal} data={data}/>
          }
          {(modalType == "editEnvironment") &&
            <AddEvironment modalType={modalType} openModal={openModal} data={data}/>
          }

          {(modalType == "addPlant") &&
            <AddPlant modalType={modalType} openModal={openModal} data={data}/>
          }

          {(data?.plant_action_type_id == 14) &&
            <ChangeStage modalType={modalType} openModal={openModal} data={data} plant={plant}/>
          }
          {(data?.plant_action_type_id == 13) &&
            <AddNote modalType={modalType} openModal={openModal} data={data} plant={plant}/>
          }


        </ModalContent>


      </Modal>
    </Root>
  )
}

export default PopupModal