import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { ButtonOutlined } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, Input, Item, ItemGerm, ItemHarv, ItemTextAccent, ItemHodler, ItemTime, ItemTimeActive,StyledTextareaAutosize } from './Form_styles'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { selectStages, fetchStages,takeAction } from '../../features';


const AddNote = ({ plant,modalType,openModal,data }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStages())
    }, [])



    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddNoteSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
        plant_note: Yup.string()
             .required('Required'),
        plant_action_type_id: Yup.number()
             .required('Required')
             .min(1)
             .max(16),
    });

    let intialValues = {
        creation_date: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
        plant_note: '',
        plant_id:plant.plant_id,
        plant_action_type_id:data.plant_action_type_id,
    }


    const handleDate = (values,date) => {
        console.log("date",date)
        values.creation_date = date
    }

    const handleAction = async(values, setSubmitting) => {
      
        setSubmitting(true)

        let res = await  dispatch(takeAction(values))
        if (res.payload.affectedRows > 0) {
            openModal(modalType)
            setSubmitting(false)
        }
       
    }


    return (
        <div>
            <Formik
                initialValues={intialValues}
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
                                defaultValue={new Date()}
                                onChange={(value) => { handleDate(values,format(value,'yyyy-MM-dd HH:mm:ss')) }}
                              
                            />
                        </LocalizationProvider>
                            <StyledTextareaAutosize
                            aria-label="textarea"
                            minRows={3}
                            name="plant_note"
                            onChange={handleChange}
                            placeholder="Enter your text"
                            style={{ width: '100%' }}
                            />

                        <ButtonHolder>
                            <ButtonOutlined type="submit" >
                                Submit
                            </ButtonOutlined>
                        </ButtonHolder>

                    </FormHolder>
                )}
            </Formik>
        </div>
    )
}

export default AddNote