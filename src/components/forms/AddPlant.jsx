import React, { useState, useEffect } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { Button } from '../../utils/global_styles';
import { FormHolder, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, InputFull, Item,ItemGerm,ItemHarv,ItemTextAccent,StyledDateTimePicker  } from './Form_styles'
import { useSelector } from 'react-redux';
import { selectEnvironments, fetchStrains, selectStrains, fetchIrrigationTypes, selectIrrigationTypes,addPlants,selectStages,fetchStages } from '../../features';
import { useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { RadioGroup, Radio,FormControlLabel } from '@mui/material';
import { format } from 'date-fns';
import { useSnackbar } from 'notistack';
import FormLoader from '../loader/FormLoader';

const AddEnvironmentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),

});

const AddPlant = ({ openModal, modalType, data }) => {

    const dispatch = useDispatch()
    const environments = useSelector(selectEnvironments)
    const strains = useSelector(selectStrains)
    const stages = useSelector(selectStages)
    const irrigationTypes = useSelector(selectIrrigationTypes)
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        dispatch(fetchStrains())
        dispatch(fetchStages())
        dispatch(fetchIrrigationTypes())

    }, [])

   
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    let intialValues = {
        creation_date: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
        name: '',
        environment: 0,
        strain: 0,
        stage: 0,
        irrigation: 0,
        public:1,
    }

    const handleAddPlant =  (values, setSubmitting) => {

        setSubmitting(true)

        dispatch(addPlants(values))
        .then((response)=>{
            console.log('response',response)
            if (response.payload.length > 0) {
                enqueueSnackbar('Plant Added',{variant:'success'})
                openModal(modalType)
            }
        })
        .catch((err)=>{
            enqueueSnackbar(`${err.response.status} ${err.response.data}`, { variant: 'error' })
        })
        .finnaly(()=>{
            setSubmitting(false)
        })
    }

    const handleDate = (values,date) => {
        values.creation_date = date
    }

    return (

        <Formik
            initialValues={intialValues}

            validationSchema={AddEnvironmentSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    handleAddPlant(values, setSubmitting)
                }, 400);
            }}
        >
            {({ isSubmitting, handleBlur, handleChange, values }) => (
                <FormHolder>
                     {!isSubmitting && <>
 <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StyledDateTimePicker
                                name="creation_date"
                                maxDate={new Date()}
                                defaultValue={new Date()}
                                onChange={(value) => { handleDate(values,format(value,'yyyy-MM-dd HH:mm:ss')) }}
                              
                            />
                        </LocalizationProvider>

                    <InputFull
                        autoComplete="false"
                        name="name"
                        label="Name"
                        required
                        onChange={handleChange}
                    />

                    <InputFull

                        name="environment"
                        label="Environment"
                        select
                        required
                        onChange={handleChange}
                    >
                        {environments?.map((t, index) => {
                            return (
                                <Item key={index} value={t.environment_id}>
                                    <div> {t.environment_name}</div>
            
                                    <ItemTextAccent> {t.environment_type_name}</ItemTextAccent>
                                </Item>
                            )
                        })}
                    </InputFull>

                    <InputFull

                        name="stage"
                        label="Stage"
                        select
                        required
                        onChange={handleChange}
                    >
                        {stages?.map((t, index) => {
                            return (
                               
                               
                                <Item key={index} value={t.stage_id}>
                                    <div> {t.stage_name}</div>
                                </Item>
                           
                           
                               
                              
                            )
                        })}
                    </InputFull>

                    <InputFull

                        name="irrigation"
                        label="Irrigation Type"
                        required
                        select
                        onChange={handleChange}
                  
                    >
                        {irrigationTypes?.map((t, index) => {
                            return (
                                <Item key={index} value={t.irrigation_type_id}>
                                    <div> {t.irrigation_type}</div>
                                    <ItemTextAccent> {t.irrigation_type_description}</ItemTextAccent>
                                </Item>
                            )
                        })}
                    </InputFull>

                    <InputFull

                        name="strain"
                        label="Strain"
                        required
                        select
                        onChange={handleChange}
                    >
                        {strains?.map((t, index) => {
                            return (
                                <Item key={index} value={t.strain_id}>
                                    <div> {t.strain_name}</div>
                                    <ItemTextAccent> {t.strain_seedbank}</ItemTextAccent>
                                   
                                </Item>
                            )
                        })}
                    </InputFull>

                    <RadioGroup
                        defaultValue={values.public}
                        name="public"
                        onChange={handleChange}
                        required
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Private" />
                        <FormControlLabel value={1} control={<Radio />} label="Public" />
                    </RadioGroup>
                    </>
}
                    <ButtonHolder>
                        {!isSubmitting ? 
                          <Button type="submit" >
                          Submit
                      </Button>
                      : 
          <FormLoader msg="Adding Plant"/>
        }
                      
                    </ButtonHolder>

                </FormHolder>
            )}
        </Formik>

    )
}

export default AddPlant
