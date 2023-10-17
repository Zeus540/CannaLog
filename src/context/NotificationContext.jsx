import React,{createContext, useContext,useEffect,useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchNotifications, selectUser} from '../features/index'
import { useSnackbar } from 'notistack';

const NotificationContext = createContext()

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({children}) =>{
  
  const user = useSelector(selectUser)
  const [newNotification,setNewNotification] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()


    useEffect(() => {
    
      if(user){

      dispatch(fetchNotifications())
      .then((res)=>{
        let check = res.payload?.map((n)=> n.notification_read)?.includes(0)
       if(check){
        setNewNotification(true)
       }else{
        setNewNotification(false)
       }
      })
      .catch((err)=>{
        console.log("asdasdasd",err.payload.error)
        enqueueSnackbar(`${err.payload.error}`, { variant: 'error' })
      })
     
      }

    }, [user])

    const incomingNotifacation = ()=>{
      setNewNotification(true)
    }


    return(
        <NotificationContext.Provider value={{newNotification,incomingNotifacation}}>
        {children}
        </NotificationContext.Provider>
    )
}


