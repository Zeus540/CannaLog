import React, { useEffect, useState, useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';
import { StyledButton } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, ButtonHolder, InputFull, Item, NutrientHolcer, Input, InputHolder } from './Form_styles'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { takeAction } from '../../features';
import { format } from 'date-fns';
import { BASE_URL_PROD } from '../../lib/Constants';
import { useSnackbar } from 'notistack';
import axios from '../../lib/axios';


const AddFeeding = ({ plant, modalType, openModal, data,setModalOpen,setIsSubmitting}) => {
    const [nutrientsTypes, setNutrientsTypes] = useState([]);
    const [measurementUnits, setMeasurementUnits] = useState([]);

    const [nutrientsList, setNutrientsList] = useState([]);
    const [nutrientsListData, setNutrientsListData] = useState([]);
    const { enqueueSnackbar } = useSnackbar()
     const dispatch = useDispatch()

   


    useEffect(() => {

        axios.get(`${BASE_URL_PROD}/nutrients`)
            .then((response) => {
                setNutrientsTypes(response.data)
                console.log("nutrients", response.data);
            })
            .catch((error) => {
                enqueueSnackbar(`${error.response.status} ${error.response.statusText}`, { variant: 'error' })
                console.log(error);
            })

        axios.get(`${BASE_URL_PROD}/measurement_units`)
            .then((response) => {
                setMeasurementUnits(response.data)
            })
            .catch((error) => {
                enqueueSnackbar(`${error.response.status} ${error.response.statusText}`, { variant: 'error' })
                console.log(error);
            })


    }, [])

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddWateringSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
    });

    let intialValues = {
        creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        plant_id: plant.plant_id,
        timezone: userTimezone,
        plant_action_type_id:data.plant_action_type_id,
    }


    const handleDate = (values, date) => {
        values.creation_date = date
    }

    const handleAction = async (values, isSubmitting) => {
        setIsSubmitting(true)
        values.nutrient_list = nutrientsListData
     
         let res = await  dispatch(takeAction(values))
         if (res.payload.affectedRows > 0) {
            setModalOpen(false)
            setIsSubmitting(false)

         }

    }

    const handleAdd = (e, child) => {
        if (nutrientsListData.map((n) => n.nutrient_id).includes(e.target.value.nutrient_id)) {

        } else {
            e.target.value.nutrient_amount = '0'
            e.target.value.nutrient_measurement = 'ml'
            setNutrientsListData([...nutrientsListData, e.target.value])
        }
    }

    const handleAmountChange = (e, child) => {
        console.log("e", e.target.value)
        child.nutrient_amount = parseInt(e.target.value)
    }

    const handleUnitChange = (e, child) => {
        console.log("e", e.target.value)
        child.nutrient_measurement = parseInt(e.target.value)

    }
    return (
        <div>
            <Formik
                initialValues={intialValues}
                validationSchema={AddWateringSchema}
                onSubmit={(values,isSubmitting ) => {
                    setTimeout(() => {
                        handleAction(values, isSubmitting)
                    }, 400);
                }}
            >
                {({ handleBlur, handleChange, values,setFieldValue }) => (
                    <FormHolder>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StyledDateTimePicker
                                name="creation_date"
                                maxDate={new Date()}

                                minDate={new Date(getLocalizeTime(plant.creation_date))}
                                defaultValue={new Date()}
                                onChange={(value) => { handleDate(values, format(value, 'yyyy-MM-dd HH:mm:ss')) }}

                            />
                        </LocalizationProvider>
                    
                        <InputFull
                            id="NUTRIENTS"
                            label="Select Nutrients"
                            variant="outlined"
                            onChange={(e, child) => { handleAdd(e, child) }}
                            select
                        >

                            {nutrientsTypes?.map((n, index) => {
                                return (
                                    <Item key={index} value={n}>

                                        {n?.nutrient_name}
                                    </Item>
                                )
                            })}

                        </InputFull>


                        {nutrientsListData.length > 0 && nutrientsListData?.map((n) => {
                            return (
                                <NutrientHolcer>
                                    <p>{n.nutrient_name}</p>
                                    <InputHolder margin='0px -15px' >
                                        <Input
                                            width="50"
                                            margin='0px 10px'
                                            label="Amount"
                                            required
                                            variant="outlined"
                                            onChange={(e) => { handleAmountChange(e, n) }}

                                        />
                                        <Input
                                            width="50"
                                            margin='0px 10px'
                                            label="Units"
                                            required
                                            variant="outlined"
                                            onChange={(e) => { handleUnitChange(e, n) }}
                                            select
                                        >
                                            {measurementUnits?.map((n, index) => {
                                                return (
                                                    <Item key={index} value={n.measurement_unit_id}>

                                                        {n?.measurement_unit}
                                                    </Item>
                                                )
                                            })}
                                        </Input>
                                    </InputHolder>
                                </NutrientHolcer>
                            )
                        })}

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

export default AddFeeding