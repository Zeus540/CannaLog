import React,{ useEffect } from "react";
import { socket } from "../lib/socket";

const WebSocketListener = () => {

    
useEffect(()=>{

    // Add your event listeners here
    socket.on('eventName', (data) => {
        // Handle the event data
        console.log('Event received:', data);
      });
      
},[])

}

export default WebSocketListener