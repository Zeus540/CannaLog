import React from 'react'
import { Root, Modal, ModalClose, ModalCloseHolder, ModalContent, Warn, ModalContentText } from './PopupModal_styles'
import { CgCloseR } from "react-icons/cg";
import { ButtonModalOutlined } from '../../utils/global_styles';
import axios from '../../lib/axios';
import { BASE_URL_PROD } from '../../lib/Constants';
import { deleteEnvironment, deletePlant,deleteAction } from '../../features';
import { useDispatch } from 'react-redux';
import AddEvironment from '../forms/AddEvironment';
import AddPlant from '../forms/AddPlant';
import ChangeStage from '../forms/ChangeStage';
import AddNote from '../forms/AddNote';
import UploadImage from '../forms/UploadImage';
import AddWatering from '../forms/AddWatering';


const PopupModal = ({ openModal, data, modalType, plant }) => {

  const dispatch = useDispatch()
  
  

  const handleSubmit = async (e) => {
    await dispatch(deleteEnvironment(e.environment_id))
      openModal(modalType)
  }

  const handleSubmitDeletePlant = async (e) => {
    await dispatch(deletePlant(e.plant_id))
    openModal(modalType)
  }


  const handleActionDelete = async (e) => {
    await dispatch(deleteAction(e))
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
                You are about to delete this environment<br />
                {data.environment_name} ?
             
              </ModalContentText>

              <Warn>
              This action will delete all information relating to this environment {data?.naenvironment_nameme} <br /> this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={() => { handleSubmit(data) }}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }
          {modalType == "deletePlant" &&
            <>
              <ModalContentText>
                Are you sure you want to delete<br />
                {data?.plant_name} ?
              </ModalContentText>

              <Warn>
                Warning this action will delete all information relating to {data?.plant_name} this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={() => { handleSubmitDeletePlant(data) }}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }

          {modalType == "deleteNote" &&
            <>
              <ModalContentText>
                Are you sure you want to delete this note ?
              </ModalContentText>

              <Warn>
                Warning this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={() => { handleActionDelete(data) }}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }
 {modalType == "deleteImage" &&
            <>
              <ModalContentText>
                Are you sure you want to delete this image ?
              </ModalContentText>

              <Warn>
                Warning this action is irreversible !
              </Warn>

              <ModalCloseHolder>
                <ButtonModalOutlined onClick={() => { handleActionDelete(data) }}>Yes</ButtonModalOutlined>
                <ButtonModalOutlined onClick={() => openModal(modalType)}>Cancel</ButtonModalOutlined>
              </ModalCloseHolder>
            </>
          }

          {(modalType == "addEnvironment") &&
            <AddEvironment modalType={modalType} openModal={openModal} data={data} />
          }
          {(modalType == "editEnvironment") &&
            <AddEvironment modalType={modalType} openModal={openModal} data={data} />
          }

          {(modalType == "addPlant") &&
            <AddPlant modalType={modalType} openModal={openModal} data={data} />
          }


          {/* Actions by id */}
          {(data?.plant_action_type_id == 14) &&
            <ChangeStage modalType={modalType} openModal={openModal} data={data} plant={plant} />
          }

          {(data?.plant_action_type_id == 13) &&
            <AddNote modalType={modalType} openModal={openModal} data={data} plant={plant} />
          }

          {(data?.plant_action_type_id == 4) &&
            <UploadImage modalType={modalType} openModal={openModal} data={data} plant={plant} />
          }

          {(data?.plant_action_type_id == 1) &&
            <AddWatering modalType={modalType} openModal={openModal} data={data} plant={plant} />
          }

        </ModalContent>


      </Modal>
    </Root>
  )
}

export default PopupModal