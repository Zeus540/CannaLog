import React, { useEffect,useState} from 'react'
import axios from '../../lib/axios'
import { BASE_URL_PROD } from '../../lib/Constants'
import styled from 'styled-components'
import {Root,Holder, Heading} from '../../utils/global_styles'
import { useSocket } from '../../context/SocketContext'
import Seo from '../../components/seo/Seo'

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

const socket = useSocket()

  useEffect(() => {
    axios.get(`${BASE_URL_PROD}/growers`)
      .then((response) => {
        setGrowers(response.data)
      }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!socket) return;

    const handleUserLoggedIn = (data) => {
      setGrowers(prev => prev.map(g =>
        g.user_id === parseInt(data) ? { ...g, is_logged_in: 1 } : g
      ));
    };

    socket.on('user_logged_in', handleUserLoggedIn);
    return () => { socket.off('user_logged_in', handleUserLoggedIn); };
  }, [socket])

  return (
<>
<Seo title="Growers" content="Check the real-time status of cannabis growers on our platform. Discover if your favorite cultivators are currently online. Stay connected, share insights, and engage with active growers in our vibrant cannabis community. Join now to explore the live presence of passionate cultivators."/>
    <Root
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.10 }}
    exit={{ opacity: 0 }}
    >
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
</>
  )
}

export default Growers