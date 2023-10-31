import {useEffect,lazy,Suspense} from 'react'
import { Root, Modal, ModalClose, ModalCloseHolder, ModalContent, Warn, ModalContentText } from './PopupModal_styles'
import { VscChromeClose } from "react-icons/vsc";
import { StyledButton } from '../../utils/global_styles';
import { deleteEnvironment, deletePlant,deleteAction } from '../../features';
import { useDispatch } from 'react-redux';
import FormLoader from '../loader/FormLoader';
import Loader from '../loader/Loader';
import { AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

const PopupModal = ({ openModal, data, modalType, plant,setModalOpen,setIsSubmitting,isSubmitting }) => {


const AddEvironment = lazy(()=> import('../forms/AddEvironment'));
const AddPlant = lazy(()=> import('../forms/AddPlant'));
const ChangeStage = lazy(()=> import('../forms/ChangeStage'));
const AddNote = lazy(()=> import('../forms/AddNote'));
const UploadImage = lazy(()=> import('../forms/UploadImage'));
const AddWatering = lazy(()=> import('../forms/AddWatering'));
const AddFeeding = lazy(()=> import('../forms/AddFeeding'));

useEffect(() => {
  document.body.style.overflow = 'hidden';
 
   return () => {
    document.body.style.overflow = 'unset';
   }
 }, [])
 
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
  

 
  return createPortal(

    <Root
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.10 }}
    exit={{ opacity: 0 }}
    key="popupholder"
    >
<AnimatePresence mode='wait'>
      {!isSubmitting ? 
   <Suspense fallback={<FormLoader/>}>
      <Modal
      initial={{ scale:0.4,opacity: 0 }}
      animate={{ scale:1,opacity: 1 }}
      transition={{ duration: 0.10 }}
      exit={{ scale:0.4 }}
      key="popup"
      >
   

       <ModalContent
       exit={{ opacity: 0 }} transition={{ duration: 0.0 }}   key="ModalContent">
         <ModalClose ><VscChromeClose onClick={() => openModal(modalType)} /></ModalClose>
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
               <StyledButton onClick={() => { handleSubmit(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
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
               <StyledButton onClick={() => { handleSubmitDeletePlant(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
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
               <StyledButton onClick={() => { handleActionDelete(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
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
               <StyledButton onClick={() => { handleActionDelete(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
             </ModalCloseHolder>
           </>
         }

{modalType == "deleteWatering" &&
           <>
             <ModalContentText>
               Are you sure you want to delete this Watering ?
             </ModalContentText>

             <Warn>
               Warning this action is irreversible !
             </Warn>

             <ModalCloseHolder>
               <StyledButton onClick={() => { handleActionDelete(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
             </ModalCloseHolder>
           </>
         }

     {modalType == "deleteFeeding" &&
           <>
             <ModalContentText>
               Are you sure you want to delete this Feeding ?
             </ModalContentText>

             <Warn>
               Warning this action is irreversible !
             </Warn>

             <ModalCloseHolder>
               <StyledButton onClick={() => { handleActionDelete(data) }}>Yes</StyledButton>
               <StyledButton onClick={() => openModal(modalType)}>Cancel</StyledButton>
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

         {(data?.plant_action_type_id == 13 || modalType == "editNote") &&
          
           <AddNote modalType={modalType} openModal={openModal} data={data} plant={plant} setModalOpen={setModalOpen} setIsSubmitting={setIsSubmitting} />
  
         }

         {(data?.plant_action_type_id == 4) &&
           <UploadImage modalType={modalType} openModal={openModal} data={data} plant={plant} setModalOpen={setModalOpen} setIsSubmitting={setIsSubmitting}/>
         }

         {(data?.plant_action_type_id == 1 || modalType == "editWatering") &&
           <AddWatering modalType={modalType} openModal={openModal} data={data} plant={plant} setModalOpen={setModalOpen} setIsSubmitting={setIsSubmitting}/>
         }

          {(data?.plant_action_type_id == 2 || modalType == "editFeeding") &&
           <AddFeeding modalType={modalType} openModal={openModal} data={data} plant={plant} setModalOpen={setModalOpen} setIsSubmitting={setIsSubmitting}/>
         }

       </ModalContent>
    
     
     </Modal>
     </Suspense>
    : <FormLoader
    key="loader"
    />}
</AnimatePresence>
    </Root>
  
  ,modal)
}

export default PopupModal