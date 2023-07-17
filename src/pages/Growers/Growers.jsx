import React, { useEffect,useState} from 'react'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import styled from 'styled-components'
import {Root,Holder, Heading} from '../../utils/global_styles'
import { socket } from '../../lib/socket'

const UserCardOutter = styled.div`
margin-top: 15px;
`

const UserCard = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
background:  ${props => props.theme.primary};
color:  ${props => props.theme.text};
padding: 15px;
margin-top: 15px;
`


const Dot = styled.div`
width:10px;
background:  ${props => props.theme.warn};
height: 10px;
border-radius: 50%;
`

const ActiveDot = styled.div`
width:10px;
background:  ${props => props.theme.accent};
height: 10px;
border-radius: 50%;

`
const Growers = () => {
const [growers, setGrowers] = useState([])

  useEffect(() => {
    axios.get(`${BASE_URL_PROD}/growers`)
      .then((response) => {
        setGrowers(response.data)
      }).catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {

    if (socket) {

      socket.on(`user_logged_in`, (data) => {
        // setGrowers(data)
        console.log("growers",growers)
        console.log("user",parseInt(data))
      });

  }

},[socket])

  return (
    <Root>
<Holder>
<Heading>Growers</Heading>
<UserCardOutter>
      {growers.map((user)=>{
        return(
          <UserCard>
            <h1>{user.user_name}</h1>
            {user.is_logged_in == 1 ? <ActiveDot></ActiveDot> : <Dot></Dot>}
        
            
          </UserCard>
        )
      })}
      </UserCardOutter>
      </Holder>
    </Root>
  )
}

export default Growers