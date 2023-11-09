import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { StyledButton } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, Input, Item, ItemGerm, ItemHarv, ItemTextAccent, ItemHodler, ItemTime, ItemTimeActive,StyledTextareaAutosize } from './Form_styles'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getLocalizeTime, } from '../../helpers/getLocalizeTime';
import { getLocalizedDate } from '../../helpers/getLocalizeDate';
import { takeAction,editAction } from '../../features';
import { useSnackbar } from 'notistack';

const AddNote = ({ plant,setModalOpen,setIsSubmitting,data }) => {

 
    
    const dispatch = useDispatch()
    const { enqueueSnackbar } = useSnackbar()
    


    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddNoteSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
        plant_note: Yup.string()
             .required('Required'),
        plant_action_type_id: Yup.number()
             .required('Required')
        
    });

    let intialValues = {
        creation_date: data.plant_note !== undefined ? format(new Date(getLocalizedDate(data.creation_date)),'yyyy-MM-dd HH:mm:ss') :  format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
        plant_note: data.plant_note || '',
        plant_id:plant.plant_id,
        plant_action_type_id:data.plant_action_type_id == undefined ? 13 : data.plant_action_type_id,
        plant_action_id:data.plant_action_id,
        plant_note_id:data.plant_note_id
    }


    const handleDate = (values,date) => {
        
        values.creation_date = date
    }

    const handleAction = async(values, setSubmitting) => {
        setIsSubmitting(true)
        setSubmitting(true)

        console.log(values)
        if(data.plant_note_id){
            dispatch(editAction(values))
            .then((response)=>{
                if (response.payload.affectedRows > 0) {
                    setIsSubmitting(false)
                    setModalOpen(false)
                    setSubmitting(false)
                    enqueueSnackbar(`Note Edited`, { variant: 'success' })
                }
            })
        }else{
            dispatch(takeAction(values))
            .then((response)=>{
                if (response.payload.affectedRows > 0) {
                    setIsSubmitting(false)
                    setModalOpen(false)
                    setSubmitting(false)
                    enqueueSnackbar(`Note Uploaded`, { variant: 'success' })
                }
            })
        }
      
     
       
    }


    return (
        <div>
            <Formik
                initialValues={intialValues}
                enableReinitialize
                validationSchema={AddNoteSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleAction(values, setSubmitting)
                    }, 400);
                }}
            >
                {({ isSubmitting, handleBlur, handleChange, values }) => (
                    <FormHolder>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StyledDateTimePicker
                                name="creation_date"
                                maxDate={new Date()}
                                minDate={new Date(getLocalizeTime(plant.creation_date))}
                                defaultValue={values.creation_date !== undefined ? new Date(values.creation_date) : new Date()}
                                onChange={(value) => { handleDate(values,format(value,'yyyy-MM-dd HH:mm:ss')) }}
                            />
                        </LocalizationProvider>
                            <StyledTextareaAutosize
                            aria-label="textarea"
                            minRows={3}
                            value={values.plant_note}
                            name="plant_note"
                            onChange={handleChange}
                            placeholder="Enter your text"
                            style={{ width: '100%' }}
                            />

                        <ButtonHolder>
                            <StyledButton type="submit" >
                                Submit
                            </StyledButton>
                        </ButtonHolder>

                    </FormHolder>
                )}
            </Formik>
        </div>
    )
}

export default AddNote