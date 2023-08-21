import React, { useState, useEffect } from 'react'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { Button } from '../../utils/global_styles'
import { Input, StyledDateTimePicker } from './Form_styles'
import styled from 'styled-components'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { format } from 'date-fns';
import { getLocalizeTime } from '../../helpers/getLocalizeTime';
export const ActionHolder = styled.div`

margin: 0px auto;
margin-top: 15px;

`
export const PreviewImage = styled.img`

aspect-ratio: 16/9;
object-fit: contain;

`

function UploadImage({ modalType, openModal, data, plant }) {
  const [loading, setLoading] = useState(false)
  const [uploadDate, setUploadDate] = useState(format(new Date(),'yyyy-MM-dd HH:mm:ss'))
  const [imagePreview, setImagePreview] = useState(null);
  const params = useParams()
  const [image, setImage] = useState('')

  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()



    let formData = {
      file:image,
      plant_id:params.plant_id,
      creation_date:uploadDate
    }


    axios.post(`${BASE_URL_PROD}/plants/take_action/${4}`, formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Important for sending form data
      },
    })
      .then((response) => {
        if (response.status == 200) {
          openModal(modalType)
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }

  const handleChange = (e, type) => {

    setImage(e.target.files[0]);

    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setImagePreview(null);
    }
  };

  const handleDate = (date ) => {
    
    setUploadDate(date)

  }

  return (
    <form  onSubmit={(e) => { handleSubmit(e) }}>
 
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StyledDateTimePicker
          name="creation_date"
          maxDate={new Date()}
          minDate={new Date(getLocalizeTime(plant.creation_date))}
          defaultValue={new Date()}
          onChange={(value) => { handleDate(format(value,'yyyy-MM-dd HH:mm:ss')) }}

        />
      </LocalizationProvider>
      {imagePreview && (
        <PreviewImage
          src={imagePreview}
          alt="Preview"

        />
      )}
      <Input type='file' name="file" onChange={(e) => { handleChange(e, "file") }} />
      <ActionHolder>
        {!loading ? <Button >Submit</Button> : <ThreeDots
          height="40"
          width="40"
          radius="9"
          color="#8bab50"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />}
      </ActionHolder>
    </form>
  )
}

export default UploadImage