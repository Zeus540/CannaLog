import { useEffect,useState } from "react";
import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { BASE_URL_PROD_SOCKET } from "../../lib/Constants";
import { useSelector,useDispatch  } from "react-redux";
import { selectIsLoggedIn } from "../auth/authSlice";

let initialState = {
    isConnected:false,
}

const socketConfig = {
  reconnectionDelayMax: 10000,
  // auth: {
  //   token: "123"
  // },
  // query: {
  //   "my-key": "my-value"
  // }
}



export const webSocketSlice = createSlice({
    name:'webSocket',
    initialState,
    reducers:{
        connect:(state,)=>{
            state.isConnected = true
        },
        disconnet:()=>{
          state.isConnected = false
        }
    },
})

export const {connect,disconnet} = webSocketSlice.actions

export const useWebSocket = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [socket, setSocket] = useState(null); 

  useEffect(() => {
    if (isLoggedIn) {
      const newSocket = io(`${BASE_URL_PROD_SOCKET}`, socketConfig);
      setSocket(newSocket); 
      dispatch(connect());
    } else {
      if (socket) {
        socket.disconnect();
      }
      dispatch(disconnect());
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isLoggedIn]);

  return { socket };
};