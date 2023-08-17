import React,{createContext, useContext,useEffect,useState} from 'react'
import { io } from "socket.io-client";
import { BASE_URL_PROD } from "../lib/Constants";
import {useSelector} from 'react-redux'
import {selectUser} from '../features/index'

const SocketContext = createContext()


export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({children}) =>{
  const user = useSelector(selectUser)
  const [socket, setSocket] = useState('')

    const socketConfig = io(`${BASE_URL_PROD}`,{
        autoConnect:false,
        withCredentials:true
    });

    useEffect(() => {
      socketConfig.connect()

        
      socketConfig.on('connect',()=>{
          console.log("connected socket",socketConfig.id)
          setSocket(socketConfig)
        })

      return () => {
        socketConfig.disconnect()
      }
    }, [user])

    return(
        <SocketContext.Provider value={socket}>
        {children}
        </SocketContext.Provider>
    )
}


