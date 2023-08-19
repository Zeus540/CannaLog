import React from 'react'
import { useSelector } from 'react-redux'
import { selectNotifications } from '../../features/notifications/notificationSlice'
import { Root,Holder,Heading } from '../../utils/global_styles'
import styled from 'styled-components'

const NotificationCard = styled.div`
color: ${(props)=>props.theme.text};
padding: 20px;
background: ${(props)=>props.theme.primary};
margin-bottom: 15px;
    border-radius: 10px;
    p{
        color: ${(props)=>props.theme.accent};
    }
`

const NotificationHeadingHolder = styled.div`
display: flex;
`
const NotificationHolder = styled.div`
margin-top: 15px;
`
const NotificationCardText = styled.div`
display: flex;
`


const NotificationAmount = styled.span`
display: flex;
color: ${(props)=>props.theme.text};
background: ${(props)=>props.theme.accent};
border-radius: 50px;
width: fit-content;
    padding: 5px 25px;
    margin-left: 15px;
`
const Notifications = () => {

    const notifications = useSelector(selectNotifications)
    console.log("notifications",notifications)
  return (
    <Root>
        <Holder>
            <NotificationHeadingHolder>
            <Heading>Notifications </Heading ><NotificationAmount>3</NotificationAmount>
            </NotificationHeadingHolder>
            <NotificationHolder>
        {notifications?.map((n)=>{
            return(
                <NotificationCard>
                    <NotificationCardText>
                    <h1>{n.actor_user_name}</h1>&nbsp;&nbsp;<p>{n.notification_action_type}</p>&nbsp;&nbsp;your plant {n.plant_id}
                    </NotificationCardText>
                    </NotificationCard>
            )
            })}
            </NotificationHolder>
        </Holder>
    </Root>
  )
}

export default Notifications