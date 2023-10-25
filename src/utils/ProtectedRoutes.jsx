import { Outlet, Navigate,useLocation } from "react-router"
import { useCookies } from "react-cookie"
import { Suspense } from "react"
import styled from 'styled-components';
import {motion as m } from 'framer-motion'

const Root = styled(m.div)`
background:  ${props => props.theme.secondary};
min-height:calc(100vh - 180px)
`;

const ProtectedRoutes = () => {
    const cookies = useCookies()
    const location = useLocation()

    let auth = cookies[0].user == undefined ? false : true
    
    return (
        auth ?  <Root><Outlet></Outlet></Root> : <Navigate to="/sign-in" state={location.pathname}/>
    )
}


export default ProtectedRoutes