import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client";
import { BASE_URL_PROD } from "../lib/Constants";
import { useSelector } from 'react-redux'
import { selectUser } from '../features/index'

const SocketContext = createContext(null)

export const useSocket = () => useContext(SocketContext)

export const SocketProvider = ({ children }) => {
  const user = useSelector(selectUser)
  const [socket, setSocket] = useState(null)
  const socketRef = useRef(null)

  useEffect(() => {
    const s = io(BASE_URL_PROD, {
      autoConnect: false,
      withCredentials: true,
    })
    socketRef.current = s

    s.on('connect', () => {
      setSocket(s)
    })

    s.on('disconnect', () => {
      setSocket(null)
    })

    if (user) {
      s.connect()
    }

    return () => {
      s.removeAllListeners()
      s.disconnect()
      socketRef.current = null
    }
  }, [user])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}
