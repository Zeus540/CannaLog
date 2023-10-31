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


const AddWatering = ({ plant, modalType, openModal, data,setModalOpen,setIsSubmitting}) => {
    const [measurementUnits, setMeasurementUnits] = useState([]);
    const { enqueueSnackbar } = useSnackbar()
     const dispatch = useDispatch()

   


    useEffect(() => {

        // axios.get(`${BASE_URL_PROD}/nutrients`)
        //     .then((response) => {
        //         setNutrientsTypes(response.data)
        //         console.log("nutrients", response.data);
        //     })
        //     .catch((error) => {
        //         enqueueSnackbar(`${error.response.status} ${error.response.statusText}`, { variant: 'error' })
        //         console.log(error);
        //     })

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
            water_amount: Yup.string()
            .required('Required'),

    });

    let intialValues = {
        creation_date: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        water_amount: data.water_amount !== undefined ? data.water_amount :'',
        water_amount_measurement: data.water_amount_measurement !== undefined ? data.water_amount_measurement :'',
        plant_id: plant.plant_id,
        timezone: userTimezone,
        plant_action_type_id:data.plant_action_type_id,
    }


    const handleDate = (values, date) => {
        values.creation_date = date
    }

    const handleAction = async (values, isSubmitting) => {
        setIsSubmitting(true)
     
         let res = await  dispatch(takeAction(values))
         if (res.payload.affectedRows > 0) {
            setModalOpen(false)
            setIsSubmitting(false)

         }

    }


    return (
        <div>
            <Formik
                initialValues={intialValues}
                enableReinitialize
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
                        <InputHolder width="100">
                            <Input
                                width="70"
                                margin='0px 15px 15px 0px'
                                label="Water Amount"
                                id='water_amount'
                                value={values.water_amount}
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
                                value={values.water_amount_measurement}
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

export default AddWatering