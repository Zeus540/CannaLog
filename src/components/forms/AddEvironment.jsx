import React, { useState, useEffect } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { StyledButton } from '../../utils/global_styles';
import { FormHolder, InputField, InputRangeField, TypeHolder, TypeButton, TypeButtonActive, Label, Error, ButtonHolder, InputFieldGroup,Input, InputFieldG, TypeHolderInner, InputFieldGFlex } from './Form_styles'
import { fetchEnvironmentTypes, selectEnvironmentsTypes } from '../../features';
import { useSelector } from 'react-redux';
import { addEnvironment, editEnvironment } from '../../features';
import { useDispatch } from 'react-redux';

const AddEnvironmentSchema = Yup.object().shape({
    environment_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
        environment_light_exposure: Yup.number()
        .min(0)
        .max(24)
        .nullable(),
        environment_length: Yup.number()
        .min(0)
        .nullable(),
        environment_height: Yup.number()
        .min(0)
        .nullable(),
        environment_width: Yup.number()
        .min(0)
        .nullable()

});

const AddEvironment = ({ openModal, modalType, data }) => {

    const dispatch = useDispatch()
    const environmentTypes = useSelector(selectEnvironmentsTypes)
    const [type, setType] = useState("")


    
    let intialValues = {
        environment_name: '',
        environment_type_id: type,
        environment_light_exposure: 12,
        environment_length:'',
        environment_width:'',
        environment_height:''
    }



    useEffect(() => {
        dispatch(fetchEnvironmentTypes())
        setType(data?.environment_type_id)

    }, [])


    const handleType = (id,e) => {
        e.preventDefault()
        setType(id)

    }


    const handleAddEnvironemt = async (values, setSubmitting) => {

        if (data?.environment_id == undefined ) {
      
            if (type !== "") {

                const updatedObject = { ...values, environment_type_id: type };
          
        
                let res = await dispatch(addEnvironment(updatedObject))
              
                if (res.payload.affectedRows > 0) {
                    openModal(modalType)
                    setSubmitting(false)
                }


            }

        } else {

            if (type !== "") {

         
                const updatedObject = { ...values, environment_type_id: type };
                let res = await dispatch(editEnvironment(updatedObject))
                if (res.payload.affectedRows > 0) {
                    openModal(modalType)
                    setSubmitting(false)
                }

            }

        }

    }

    return (

        <Formik
        initialValues={data?.environment_id == undefined ? intialValues : data}
            
            validationSchema={AddEnvironmentSchema}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
              
                    handleAddEnvironemt(values, setSubmitting)
                }, 400);


            }}
        >
            {({ isSubmitting, handleBlur, handleChange, values }) => (
                <FormHolder>
                    {/* <Label htmlFor='name'>Name</Label> */}
                    <Input type="text" name="environment_name" placeholder="Environemt Name" onChange={handleChange} onBlur={handleBlur} value={values?.environment_name}/>
                    <Error name="environment_name" component="p" />


                    <TypeHolder>
                        <Label htmlFor='name'>Type</Label>
                        <TypeHolderInner>
                            {environmentTypes?.map((t, index) => {
                                return (
                                    <div key={index}>

                                        {type == t.environment_type_id ?
                                            <TypeButtonActive

                                              
                                                name="environment_type_id"
                                                onClick={(e) => { handleType(t.environment_type_id,e) }}
                                                onBlur={handleBlur}
                                            >
                                                {t.environment_type_name}
                                            </TypeButtonActive>
                                            :
                                            <TypeButton

                                      
                                                name="environment_type_id"
                                                onClick={(e) => { handleType(t.environment_type_id,e) }}
                                                onBlur={handleBlur}
                                            >
                                                {t.environment_type_name}
                                            </TypeButton>
                                        }

                                    </div>
                                )
                            })}
                        </TypeHolderInner>
                    </TypeHolder>
                    <Error name="environment_type_id" component="p" />


                    <>
                        <Label htmlFor='environment_light_exposure'>{values?.environment_light_exposure} hrs Light Exposure</Label>
                        <InputRangeField type="range" name="environment_light_exposure" min="0" max="24" value={values?.environment_light_exposure} onChange={handleChange} onBlur={handleBlur} />
                        <Error name="light_exposure" component="p" />
                    </>


                    <InputFieldGroup>
                        {/* <Label htmlFor='length'>Length</Label> */}
                        <InputFieldGFlex>
                            <Input type="text" name="environment_length" placeholder="Length" onChange={handleChange} onBlur={handleBlur} value={values?.environment_length} />
                            <Error name="environment_length" component="p" />
                        </InputFieldGFlex>
                        <InputFieldGFlex>
                            {/* <Label htmlFor='width'>Width</Label> */}
                            <Input type="text" name="environment_width" placeholder="Width" onChange={handleChange} onBlur={handleBlur} value={values?.environment_width}/>
                            <Error name="environment_width" component="p" />
                        </InputFieldGFlex>
                        <InputFieldGFlex>
                            {/* <Label htmlFor='height'>Height</Label> */}
                            <Input type="text" name="environment_height" placeholder="Height" onChange={handleChange} onBlur={handleBlur} value={values?.environment_height}/>
                            <Error name="environment_height" component="p" />
                        </InputFieldGFlex>
                    </InputFieldGroup>


                    <ButtonHolder>
                        <StyledButton type="submit" >
                            Submit
                        </StyledButton>
                    </ButtonHolder>
                </FormHolder>
            )}
        </Formik>

    )
}

export default AddEvironment
