import React,{useState,useEffect} from 'react'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import { useParams } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { Button } from '../../utils/global_styles'
import { Input } from './Form_styles'
import styled from 'styled-components'

export const ActionHolder = styled.div`

margin: 0px auto;
margin-top: 15px;

`

function UploadImage({modalType,openModal,data,plant}) {
    const [loading, setLoading] = useState(false)
const params = useParams()
    const [formObject,setFormObject] = useState({
        "file":""
    })
    
    const handleSubmit = (e)=>{
        setLoading(true)
        e.preventDefault()

        let formData = new FormData()

        formData.append("file",formObject.file)
        formData.append("plant_id",params.plant_id)
        formData.append("creation_date",new Date())
    

         axios.post(`${BASE_URL_PROD}/plants/take_action/${4}`,formData)
         .then((response)=>{
             if(response.status == 200){
                openModal(modalType)
             }
         })
         .catch((err)=>{
             console.log(err)
         })

    }
  
    const handleChange = (e,type)=>{
        switch (type) {
            case "file":
                setFormObject({...formObject,file : e.target.files[0]})
                break;
            default:
                break;
        }
    }

    useEffect(() => {

        console.log("formObject",formObject)
    }, [formObject])
    
  return (
    <form encType='multipart/form-data' onSubmit={(e)=>{handleSubmit(e)}}>
        <Input type='file' name="file" onChange={(e)=>{handleChange(e,"file")}}/>
   <ActionHolder>
   {!loading ? <Button >Submit</Button> : <ThreeDots 
height="80" 
width="80" 
radius="9"
color="#4fa94d" 
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