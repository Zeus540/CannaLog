import React,{createContext, useContext,useEffect,useState} from 'react'
import {useDispatch, } from 'react-redux'
import {logout} from '../features/index'
import { useSnackbar } from 'notistack';
import { useNavigate,useLocation } from 'react-router-dom';

const LogoutContext = createContext()

export const useLogout = () => useContext(LogoutContext)

export const LogoutProvider = ({children}) =>{
  
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = ()=>{
    dispatch(logout())
    navigate('/sign-in',{ state: location.state })
 }

    useEffect(() => {
      window.addEventListener("logoutRequired",handleLogout)
   
      return(()=>{
        window.removeEventListener("logoutRequired",handleLogout)
      })
    }, [])


    return(
        <LogoutContext.Provider value={{}}>
        {children}
        </LogoutContext.Provider>
    )
}


