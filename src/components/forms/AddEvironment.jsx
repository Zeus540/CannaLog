import React, { useState, useEffect } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { ButtonOutlined } from '../../utils/global_styles';
import { FormHolder, InputField, InputRangeField, TypeHolder, TypeButton, TypeButtonActive, Label, Error, ButtonHolder, InputFieldGroup,Input, InputFieldG, TypeHolderInner, InputFieldGFlex } from './Form_styles'
import { selectEnvironmentsTypes } from '../../features';
import { useSelector } from 'react-redux';
import { addEnvironment, editEnvironment } from '../../features';
import { useDispatch } from 'react-redux';

const AddEnvironmentSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    light_exposure: Yup.number()
        .min(0)
        .max(24)
        .nullable(),
    length: Yup.number()
        .min(0)
        .nullable(),
    height: Yup.number()
        .min(0)
        .nullable(),
    width: Yup.number()
        .min(0)
        .nullable()

});

const AddEvironment = ({ openModal, modalType, data }) => {

    const dispatch = useDispatch()
    const environmentTypes = useSelector(selectEnvironmentsTypes)
    const [type, setType] = useState("")
    const [dataModified, setDataModified] = useState(null)



    let intialValues = {
        name: '',
        environment_type_id: type,
        light_exposure: 12,
        length: '',
        width: '',
        height: ''
    }

    useEffect(() => {

        if (data) {

            if (data.light_exposure == null) {
                const updatedObject = { ...data, light_exposure: 0 };
                setDataModified(updatedObject)
                setType(data?.environment_type_id)
            } else {
                setDataModified(data)
                setType(data?.environment_type_id)
            }




        } else {

            setType(data?.environment_type_id)
        }

    }, [])

    const handleType = (id) => {
        setType(id)

    }


    const handleAddEnvironemt = async (values, setSubmitting) => {


        if (dataModified == null) {
            console.log("adding", type)
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

                console.log("editing", type)
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
            initialValues={dataModified ? dataModified : intialValues}
            enableReinitialize
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
                    <Input type="text" name="name" placeholder="Environemt Name" onChange={handleChange} onBlur={handleBlur} />
                    <Error name="name" component="p" />


                    <TypeHolder>
                        <Label htmlFor='name'>Type</Label>
                        <TypeHolderInner>
                            {environmentTypes?.map((t, index) => {
                                return (
                                    <div key={index}>

                                        {type == t.environment_type_id ?
                                            <TypeButtonActive

                                                type="button"
                                                name="environment_type_id"
                                                onClick={() => { handleType(t.environment_type_id) }}
                                                onBlur={handleBlur}
                                            >
                                                {t.environment_type_name}
                                            </TypeButtonActive>
                                            :
                                            <TypeButton

                                                type="button"
                                                name="environment_type_id"
                                                onClick={() => { handleType(t.environment_type_id) }}
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
                        <Label htmlFor='name'>{values.light_exposure} hrs Light Exposure</Label>
                        <InputRangeField type="range" name="light_exposure" min="0" max="24" value={values.light_exposure} onChange={handleChange} onBlur={handleBlur} />
                        <Error name="light_exposure" component="p" />
                    </>


                    <InputFieldGroup>
                        {/* <Label htmlFor='length'>Length</Label> */}
                        <InputFieldGFlex>
                            <Input type="text" name="length" placeholder="Length" onChange={handleChange} onBlur={handleBlur} />
                            <Error name="length" component="p" />
                        </InputFieldGFlex>
                        <InputFieldGFlex>
                            {/* <Label htmlFor='width'>Width</Label> */}
                            <Input type="text" name="width" placeholder="Width" onChange={handleChange} onBlur={handleBlur} />
                            <Error name="width" component="p" />
                        </InputFieldGFlex>
                        <InputFieldGFlex>
                            {/* <Label htmlFor='height'>Height</Label> */}
                            <Input type="text" name="height" placeholder="Height" onChange={handleChange} onBlur={handleBlur} />
                            <Error name="height" component="p" />
                        </InputFieldGFlex>
                    </InputFieldGroup>


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

export default AddEvironment
