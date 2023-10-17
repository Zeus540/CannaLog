import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectNotifications,readNotifications,readNotification  } from '../../features/index'
import { Root,Heading } from '../../utils/global_styles'
import styled from 'styled-components'
import { getElapsedDaysNotificationsFull,getElapsedDaysNotifications } from '../../helpers/getElapsedDays'
import { useSnackbar } from 'notistack'


export const Holder = styled.div`
max-width: 1920px;
margin: 40px;
width:100%;
border-radius: 5px;
padding:20px;

overflow:hidden;
transition: all 1s ease;
@media (max-width: 425px) {
  margin: 40px 0px;
}
`

const NotificationCard = styled.div`
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.notification_card.inactive};
padding: 20px;
margin-bottom: 15px;
display: flex;
    border-radius: 5px;
    p{
        color: ${(props)=>props.theme.accent};
    }
`
const NotificationCardActive = styled.div`
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.notification_card.active};

padding: 20px;
margin-bottom: 15px;
display: flex;
    border-radius: 5px;
    p{
        color: ${(props)=>props.theme.accent};
    }
`
const NotificationHeadingHolderInner = styled.div`
display: flex;
justify-content: space-between;
`
const NotificationHeadingHolder = styled.div`
display: flex;
justify-content: space-between;
p{
    color: ${(props)=>props.theme.accent};
    cursor: pointer;
}
`
const NotificationCardTextHolder = styled.div`
display: flex;
    flex-direction: column;
    margin-left: 15px;
`

const NotificationCardActiveDot = styled.div`
height: 9px;
    width: 9px;
    background: red;
    border-radius: 50%;
    margin-left: 9px;
`
const NotificationCardAvatar = styled.p`
width: 15px;
height: 15px;
color: white!important;
    padding: 15px;
    background:  ${props => props.theme.accent};
   
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const NotificationHolder = styled.div`
margin-top: 15px;

`
const NotificationCardText = styled.div`
display: flex;
align-items: center;

p{

}
`
const NotificationCardDate = styled.div`
display: flex;
margin-top: 5px;
sub{

    font-size:14px
}
`

const NotificationAmount = styled.h3`
display: flex;
color: white;
background: ${(props)=>props.theme.accent};
border-radius: 5px;
width: fit-content;
padding: 3px 15px;
margin-left: 15px;
font-size: 14px;
height: fit-content;
`
const Notifications = () => {

    const notifications = useSelector(selectNotifications)
    const dispatch = useDispatch()
   const { enqueueSnackbar } = useSnackbar()

    console.log("notifications",notifications.length)

    const handleReadAll = () =>{
        dispatch(readNotifications(notifications.map((n)=> n.user_notification_id)))
        console.log("notificationssssssss",notifications.map((n)=> n.user_notification_id))
    }

    const handleRead = (id) =>{
        dispatch(readNotification(id))
        .then((response)=>{
            if(response.payload.message){
                console.log("response",response.payload.message)
                enqueueSnackbar(`${response.payload.message}`, { variant: 'success' })
            }
        })
        .catch((err)=>{
            enqueueSnackbar(`${err.payload.message}`, { variant: 'error' })
        })
    }
    
  return (
    <Root>
        <Holder>
            <NotificationHeadingHolder>
            <NotificationHeadingHolderInner><Heading>Notifications </Heading ><NotificationAmount>{notifications.length}</NotificationAmount></NotificationHeadingHolderInner> <p onClick={()=>handleReadAll()}>Mark all as read</p>
            </NotificationHeadingHolder>
            <NotificationHolder>
        {notifications?.map((n)=>{
            if(n.notification_read == 0){
                return(
                    <NotificationCardActive onClick={()=>handleRead(n.user_notification_id)}>
                    
                    <NotificationCardAvatar>
                    {n?.actor_user_name?.charAt(0)}
                    </NotificationCardAvatar>

                    <NotificationCardTextHolder>
                   <NotificationCardText>
                   <h1>{n.actor_user_name}</h1>&nbsp;&nbsp;{n.notification_action_type}&nbsp;&nbsp;your plant<h1>&nbsp;&nbsp;{n.plant_id}</h1> <NotificationCardActiveDot/>
                   </NotificationCardText>
                   <NotificationCardDate>
                    

                   {getElapsedDaysNotificationsFull(n.creation_date).minutesDifference < 59 ? 
                   <>{getElapsedDaysNotificationsFull(n.creation_date).minutesDifference < 1 ? <>now</> : <>{getElapsedDaysNotificationsFull(n.creation_date).minutesDifference}m ago</>}</> 
                   : 
                   <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference > 24 ? <>{getElapsedDaysNotifications(n.creation_date) > 1 ? <>{getElapsedDaysNotifications(n.creation_date)} day ago</> : <>{getElapsedDaysNotifications(n.creation_date)} days ago</>}</> : <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference < 2 ? <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference} hour ago</> :<>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference} hours ago</> } </>}</>
                   }

                   </NotificationCardDate>
                   </NotificationCardTextHolder>
                   </NotificationCardActive>
                    
                )
            }else{
                return(
                    <NotificationCard>
             
             <NotificationCardAvatar>
                    {n?.actor_user_name?.charAt(0)}
                    </NotificationCardAvatar>

                    <NotificationCardTextHolder>
                   <NotificationCardText>
                   <h1>{n.actor_user_name}</h1>&nbsp;&nbsp;{n.notification_action_type}&nbsp;&nbsp;your plant<h1>&nbsp;&nbsp;{n.plant_id}</h1>
                   </NotificationCardText>
                   <NotificationCardDate>
                    

                   {getElapsedDaysNotificationsFull(n.creation_date).minutesDifference < 59 ? 
                   <>{getElapsedDaysNotificationsFull(n.creation_date).minutesDifference} Mins ago</> 
                   : 
                   <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference > 24 ? <>{getElapsedDaysNotifications(n.creation_date) > 1 ? <>{getElapsedDaysNotifications(n.creation_date)} Day ago</> : <>{getElapsedDaysNotifications(n.creation_date)} Days ago</>}</> : <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference < 2 ? <>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference} Hour ago</> :<>{getElapsedDaysNotificationsFull(n.creation_date).hoursDifference} Hours ago</> } </>}</>
                   }

                   </NotificationCardDate>
                   </NotificationCardTextHolder>
                   </NotificationCard>
                    
                )
            }
           
            })}
            </NotificationHolder>
        </Holder>
    </Root>
  )
}

export default Notifications