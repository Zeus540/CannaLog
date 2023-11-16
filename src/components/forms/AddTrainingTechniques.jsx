import React, { useEffect, useState, useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';
import { Checkbox,FormControlLabel } from '@mui/material';
import { StyledButton } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, ButtonHolder, InputFull, Item, NutrientHolcer, Input, InputHolder,Flex,CardSytled,CardCheckedSytled,FormControlLabelSytled } from './Form_styles'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { takeAction } from '../../features';
import { format } from 'date-fns';
import { BASE_URL_PROD } from '../../lib/Constants';
import { useSnackbar } from 'notistack';
import axios from '../../lib/axios';
import { TrainingCard } from '../cards/TrainingCard';

const AddTrainingTechniques = ({ plant, modalType, openModal, data,setModalOpen,setIsSubmitting}) => {
    const [trainingTechniquesList, setTrainingTechniquesList] = useState([]);
    const [trainingTechniques, setTrainingTechniques] = useState([]);
    const { enqueueSnackbar } = useSnackbar()
     const dispatch = useDispatch()


    useEffect(() => {

        axios.get(`${BASE_URL_PROD}/training_techniques`)
            .then((response) => {
                setTrainingTechniquesList(response.data)
                console.log("training_techniques", response.data);
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
            // e.target.value.nutrient_amount = '0'
            // e.target.value.nutrient_measurement = 'ml'
            // setNutrientsListData([...nutrientsListData, e.target.value])
        }
    }

    const handleChange = (e) => {
        e.target.checked = true;
        
        console.log("value",e.target.value)
        setTrainingTechniques([...trainingTechniques,e.target.value])
        console.log("trainingTechniques",trainingTechniques)
      };

      const Card = ({img,name})=>{
        return(
            <CardSytled>
                <img src={img} width='50px'/>
                <div>
                <p>{name}</p>
                </div>
            </CardSytled>
        )
      }

      const CardChecked = ({img,name})=>{
        return(
            <CardCheckedSytled>
                <img src={img} width='50px'/>
                <div>
                <p>{name}</p>
                </div>
            </CardCheckedSytled>
        )
      }

      
    return (
        <div>
            <Formik
                initialValues={intialValues}
                validationSchema={AddWateringSchema}
                onSubmit={(values,isSubmitting ) => {
                    setTimeout(() => {
                        // handleAction(values, isSubmitting)
                    }, 400);
                }}
            >
                {({ handleBlur, values,setFieldValue }) => (
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
                    
                        <Flex>
                        {trainingTechniquesList?.map((itm, index) => {
                                return (
                                    <FormControlLabelSytled
                                    control={<Checkbox value={itm.grow_techniques_id} icon={<Card img={itm?.grow_techniques_image} name={itm?.grow_techniques_name}/>} checkedIcon={<CardChecked img={itm?.grow_techniques_image} name={itm?.grow_techniques_name}/>} onChange={handleChange} />}

                                  />
                               
                                    //<TrainingCard key={index} value={itm} img={itm?.grow_techniques_image} name={itm?.grow_techniques_name}/>
                              
                                )
                            })}
</Flex>
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

export default AddTrainingTechniques