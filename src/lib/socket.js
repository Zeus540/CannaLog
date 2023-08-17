import { io } from "socket.io-client";
import { BASE_URL_PROD } from "./Constants";

// Assuming you have already included the socket.io library in your HTML file
export const socket = io(``,{
    withCredentials:true
});
