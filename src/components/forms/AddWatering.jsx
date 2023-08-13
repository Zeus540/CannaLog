import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';
import { ButtonOutlined } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, ButtonHolder,InputFull,Item } from './Form_styles'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { takeAction } from '../../features';
import { format } from 'date-fns';
import { BASE_URL_PROD } from '../../lib/Constants';
import { useSnackbar } from 'notistack';
import axios from '../../lib/axios';


const AddWatering = ({ plant,modalType,openModal,data }) => {
    const [nutrientsTypes, setNutrientsTypes] = useState([]);
    const [nutrientsList, setNutrientsList] = useState([]);
    const [nutrientsListData, setNutrientsListData] = useState([]);
    const { enqueueSnackbar } = useSnackbar()
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(fetchStages())
    // }, [])


    useEffect(() => {

        // .sort((a, b) => a.Nutrient_Name?.localeCompare(b.Nutrient_Name))
          axios.get(`${BASE_URL_PROD}/nutrients`)
            .then((response) => {
              setNutrientsTypes(response.data)
              console.log("nutrients", response.data);
            })
            .catch((error) => {
              enqueueSnackbar(`${error.response.status} ${error.response.statusText}`,{variant:'error'})
              console.log(error);
            })
      
    
        setNutrientsListData([])
      }, [])

    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddWateringSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
            nutrient_measurement: Yup.string()
            .required('Required'),
            
    });

    let intialValues = {
        creation_date: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
        nutrient_measurement:''
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

    const handleAdd = (e, child) => {
      
    
        if(nutrientsListData.map((n) =>  n.Nutrient_Id ).includes(e.target.value.Nutrient_Id)){
    
      
    
        }else{
          e.target.value.nutrient_measurement = 'ml'
 
          setNutrientsListData([...nutrientsListData, e.target.value])
        }
      
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
                        <InputFull
                            id="NUTRIENTS"
                            label="Select Nutrients"
                            variant="outlined"
                            onChange={(e, child) => { handleAdd(e, child) }}
                            select
                            >

                            {nutrientsTypes?.map((n,index) => {
                            return (
                                <Item key={index} value={n}>
                                    {console.log("n?.nutrient_name",n?.nutrient_name)}
                                    {n?.nutrient_name}
                                    </Item>
                            )
                            })}

                        </InputFull>
                        

     {nutrientsListData.length > 0 && nutrientsListData?.map((n) => {
                return (
                <>
                {console.log("vvvvvvv",n)}
                </>
                )
              })}

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

export default AddWatering