import React, { useEffect, useState, useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../utils/global_styles';
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


const AddWatering = ({ plant, modalType, openModal, data }) => {
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

        setNutrientsListData([])
    }, [])

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddWateringSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
            water_amount: Yup.string()
            .required('Required'),

    });

    let intialValues = {
        creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        water_amount: '',
        water_amount_measurement: '',
        plant_id: plant.plant_id,
        timezone: userTimezone,
        plant_action_type_id:data.plant_action_type_id,
    }


    const handleDate = (values, date) => {
        values.creation_date = date
    }

    const handleAction = async (values, setSubmitting) => {

        values.nutrient_list = nutrientsListData
        console.log("handleAction", values)
         setSubmitting(true)

         let res = await  dispatch(takeAction(values))
         if (res.payload.affectedRows > 0) {
             openModal(modalType)
           setSubmitting(false)
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        handleAction(values, setSubmitting)
                    }, 400);
                }}
            >
                {({ isSubmitting, handleBlur, handleChange, values,setFieldValue }) => (
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
                        <InputHolder width="100">
                            <Input
                                width="70"
                                margin='0px 15px 15px 0px'
                                label="Water Amount"
                                id='water_amount'
                                variant="outlined"
                                required
                                onChange={handleChange}
type='number'
                            />
                            <Input
                                width="30"
                                margin='0px 0px 15px 0px'
                                label="Units"
                                id='water_amount_measurement'
                                variant="outlined"
                                required
                                onChange={(e)=>[setFieldValue("water_amount_measurement",e.target.value)]}
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
                                            variant="outlined"
                                            onChange={(e) => { handleAmountChange(e, n) }}

                                        />
                                        <Input
                                            width="50"
                                            margin='0px 10px'
                                            label="Units"
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

export default AddWatering