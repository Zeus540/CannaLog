import React, { useEffect, useState,useRef } from 'react'
import { Formik, } from 'formik';
import * as Yup from 'yup';

import { Button } from '../../utils/global_styles';
import { FormHolder, StyledDateTimePicker, InputField, InputFieldSelect, Label, Error, ButtonHolder, Option, Input, Item, ItemGerm, ItemHarv, ItemTextAccent, ItemHodler, ItemTime, ItemTimeActive } from './Form_styles'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
import { selectStages, fetchStages,takeAction } from '../../features';

const ChangeStage = ({ plant,modalType,openModal,data }) => {
    const [indexHover, setIndexHover] = useState('')
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartX, setDragStartX] = useState(0);
    const [scrollLeftStart, setScrollLeftStart] = useState(0);
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setDragStartX(e.pageX || e.touches[0].pageX);
      setScrollLeftStart(containerRef.current.scrollLeft);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const x = e.pageX || e.touches[0].pageX;
      const dragDistance = x - dragStartX;
      containerRef.current.scrollLeft = scrollLeftStart - dragDistance;
    };
  
    const handleMouseUp = () => {
      setIsDragging(false);
    };
  
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchStages())
    }, [])


    const stages = useSelector(selectStages)
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;


    const AddActionSchema = Yup.object().shape({
        creation_date: Yup.string()
            .required('Required'),
        stage_id: Yup.number()
             .required('Required')
             .min(1)
             .max(5),
        plant_action_type_id: Yup.number()
             .required('Required')
             .min(1)
             .max(16),
    });

    let intialValues = {
        creation_date: format(new Date(),'yyyy-MM-dd HH:mm:ss'),
        timezone: userTimezone ,
        stage_id: '',
        plant_id:plant.plant_id,
        plant_action_type_id:data.plant_action_type_id,
    }


    const handleHover = (index,values) => {
        if (index == 0) {
            setIndexHover(0)
        } else {
            values.stage_id = index + 1
            setIndexHover(index)
        }

    }

    const handleDate = (values,date) => {
        values.creation_date = date

    }

    const handleAction = async(values, setSubmitting) => {
    
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
                validationSchema={AddActionSchema}
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

                        <ItemHodler     
                        ref={containerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleMouseDown}
                        onTouchMove={handleMouseMove}
                        onTouchEnd={handleMouseUp}
                        >
                            {stages?.map((t, index) => {
                                return (
                                    <ItemTimeActive bg={((index + 1 <= plant.stage) || (index <= indexHover)) ? t.stage_color : (props) => props.theme.primary} border={((index + 1 <= plant.stage) || (index <= indexHover)) ? t.stage_color : (props) => "grey"} key={index} value={t.stage_id} onMouseEnter={() => handleHover(index,values)} onClick={() => handleHover(index,values)}>
                                        <div> {t.stage_name}</div>
                                    </ItemTimeActive>
                                )
                            })}
                        </ItemHodler>

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

export default ChangeStage