import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, ButtonHolder } from './Form_styles'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { takeAction } from '../../features';
import { format } from 'date-fns';

const BaseForm = ({ plant,modalType,openModal,data }) => {

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchStages())
    // }, [])

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const BaseFormSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),

    });

    let intialValues = {
        creation_date: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
    }


    const handleDate = (values,date) => {
        values.creation_date = date
    }

    const handleAction = async(values, setSubmitting) => {
        console.log("handleAction", values)
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
                validationSchema={BaseFormSchema}
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

                        <ButtonHolder>
                            <Button type="submit" >
                                Submit
                            </Button>
                        </ButtonHolder>

                    </FormHolder>
                )}
            </Formik>
        </div>
    )
}

export default BaseForm