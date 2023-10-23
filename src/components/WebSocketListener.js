import React,{ useEffect } from "react";
import {
    enviromentActions,
    selectUser,
    incomingNotification
  } from '../features'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import { useNotification } from '../context/NotificationContext'
import { useSnackbar } from 'notistack';
import Beep from '../assets/sounds/livechat.mp3'

const WebSocketListener = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const socket = useSocket()
    const {incomingNotifacation} = useNotification()
    const { enqueueSnackbar } = useSnackbar()


    function playAudio(url) {
      const audio = new Audio(url);
      audio.preload = "auto"; // Preload the audio
      audio.play().catch(error => {
        // Handle playback error, e.g., due to autoplay restrictions
        console.error("Error playing audio:", error);
      });
    }

    useEffect(() => {
 
        if(socket.connected){
    
           socket.on(`environment_added${user?.user_id}`, (data) => {
             dispatch(enviromentActions.addEnvironmentLocally(data));
             enqueueSnackbar(`${data.environment_name} Added`, { variant: 'success' })
           });
    
          
            socket.on(`environment_edited${user?.user_id}`, (data) => {
              dispatch(enviromentActions.editEnvironmentLocally(data));
              enqueueSnackbar(`${data.environment_name} Edited`, { variant: 'success' })
            });
         
            socket.on(`environment_deleted${user?.user_id}`, (data) => {
             dispatch(enviromentActions.deleteEnvironmentLocally(parseInt(data)));
             enqueueSnackbar(`${data.environment_name} Deleted`, { variant: 'success' })
           });
    
           socket.on(`notification${user?.user_id}`, (data) => {
            dispatch(incomingNotification(data));
            incomingNotifacation()
            playAudio(Beep)
            console.log("incomingNotification",data)
          });
          
          }
    
          return () =>{
            if(socket.connected){
            socket.off(`environment_added${user?.user_id}`)
            socket.off(`environment_edited${user?.user_id}`)
            socket.off(`environment_deleted${user?.user_id}`)
            socket.off(`notification${user.user_id}`)
            }
          }
        
      },[socket]);

}

export default WebSocketListener