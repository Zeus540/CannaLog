import React, { useState, useEffect } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { ButtonOutlined } from '../../utils/global_styles';
import { FormHolder, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, Input, Item,ItemGerm,ItemHarv,ItemTextAccent } from './Form_styles'
import { useSelector } from 'react-redux';
import { selectEnvironments, fetchStrains, selectStrains, fetchIrrigationTypes, selectIrrigationTypes,addPlants,selectStages,fetchStages } from '../../features';
import { useDispatch } from 'react-redux';

import { RadioGroup, Radio,FormControlLabel } from '@mui/material';

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


    useEffect(() => {
        dispatch(fetchStrains())
        dispatch(fetchStages())
        dispatch(fetchIrrigationTypes())

    }, [])

    console.log("stages", stages)

    let intialValues = {
        name: '',
        environment: 0,
        strain: 0,
        stage: 0,
        irrigation: 0,
        public:1,
    }

    const handleAddPlant = async (values, setSubmitting) => {

        let res = await  dispatch(addPlants(values))
        if (res.payload.length > 0) {
            openModal(modalType)
            setSubmitting(false)
        }
      
    }

    return (

        <Formik
            initialValues={intialValues}

            validationSchema={AddEnvironmentSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log("values", values)
                setTimeout(() => {
                    handleAddPlant(values, setSubmitting)
                }, 400);


            }}
        >
            {({ isSubmitting, handleBlur, handleChange, values }) => (
                <FormHolder>


                    <Input
                        autoComplete="false"
                        name="name"
                        label="Name"
                        required
                        onChange={handleChange}
                    />

                    <Input

                        name="environment"
                        label="Environment"
                        select
                        required
                        onChange={handleChange}
                    >
                        {environments?.map((t, index) => {
                            return (
                                <Item key={index} value={t.environment_id}>
                                    <div> {t.name}</div>
            
                                    <ItemTextAccent> {t.environment_type_name}</ItemTextAccent>
                                </Item>
                            )
                        })}
                    </Input>

                    <Input

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
                    </Input>

                    <Input

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
                    </Input>

                    <Input

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
                    </Input>

                    <RadioGroup
                        defaultValue={values.public}
                        name="public"
                        onChange={handleChange}
                        required
                    >
                        <FormControlLabel value={0} control={<Radio />} label="Private" />
                        <FormControlLabel value={1} control={<Radio />} label="Public" />
                    </RadioGroup>

                    <ButtonHolder>
                        <ButtonOutlined type="submit" >
                            Submit
                        </ButtonOutlined>
                    </ButtonHolder>

                </FormHolder>
            )}
        </Formik>

    )
}

export default AddPlant
