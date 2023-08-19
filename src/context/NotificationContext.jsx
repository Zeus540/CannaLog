import React,{createContext, useContext,useEffect,useState} from 'react'
import { BASE_URL_PROD } from "../lib/Constants";
import {useDispatch, useSelector} from 'react-redux'
import {fetchNotifications, selectUser} from '../features/index'
import axios from '../lib/axios';

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({children}) =>{
  
  const user = useSelector(selectUser)
  const [newNotification,setNewNotification] = useState(false)

  const dispatch = useDispatch()


    useEffect(() => {
    
      if(user){

      dispatch(fetchNotifications())
      .then((res)=>{
        let check = res.payload.map((n)=> n.notification_read).includes(0)
       if(check){
        setNewNotification(true)
       }else{
        setNewNotification(false)
       }
      })
     
      }

    }, [user])

    return(
        <NotificationContext.Provider value={{newNotification}}>
        {children}
        </NotificationContext.Provider>
    )
}


