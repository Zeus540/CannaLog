import React,{ useEffect } from "react";
import {
    addEnvironmentLocally,
    editEnvironmentLocally,
    selectUser,
    deleteEnvironmentLocally
  } from '../features'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useSocket } from '../context/SocketContext'
import { useSnackbar } from 'notistack';

const WebSocketListener = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const socket = useSocket()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
 
        if(socket.connected){
    
           socket.on(`environment_added${user?.user_id}`, (data) => {
             dispatch(addEnvironmentLocally(data));
             enqueueSnackbar(`${data.environment_name} Added`, { variant: 'success' })
           });
    
          
            socket.on(`environment_edited${user?.user_id}`, (data) => {
              dispatch(editEnvironmentLocally(data));
              enqueueSnackbar(`${data.environment_name} Edited`, { variant: 'success' })
            });
         
            socket.on(`environment_deleted${user?.user_id}`, (data) => {
             dispatch(deleteEnvironmentLocally(parseInt(data)));
             enqueueSnackbar(`${data.environment_name} Deleted`, { variant: 'success' })
           });
    
          }
    
          return () =>{
            if(socket.connected){
            socket.off(`environment_added${user?.user_id}`)
            socket.off(`environment_edited${user?.user_id}`)
            socket.off(`environment_deleted${user?.user_id}`)
            }
          }
        
      },[socket]);

}

export default WebSocketListener