import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { ButtonOutlined } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, Input, Item, ItemGerm, ItemHarv, ItemTextAccent, ItemHodler, ItemTime, ItemTimeActive } from './Form_styles'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { selectStages, fetchStages,takeAction } from '../../features';

const AddNote = ({ plant,modalType,openModal,data }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStages())
    }, [])


    const stages = useSelector(selectStages)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddNoteSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
        notes: Yup.string()
             .required('Required'),
        plant_action_type_id: Yup.number()
             .required('Required')
             .min(1)
             .max(16),
    });

    let intialValues = {
        creation_date: moment(),
        timezone: userTimezone || moment.tz.guess(),
        stage_id: '',
        plant_id:plant.plant_id,
        plant_action_type_id:data.plant_action_type_id,
    }



    const handleDate = (values,date) => {
        values.creation_date = date
    }

    const handleAction = async(values, setSubmitting) => {
        console.log("values", values)
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
                    console.log("values",values)
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
                                displayWeekNumber={true}
                                minDate={new Date(getLocalizeTime(plant.creation_date))}
                                defaultValue={new Date()}
                                onChange={(value) => { handleDate(values,value.format('YYYY-MM-DD HH:mm:ss')) }}
                                formatDensity="dense"
                            />
                        </LocalizationProvider>

                        {/* {stages?.map((t, index) => {
                                return (
                              
                                )
                            })} */}
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