import { Outlet, Navigate,useLocation } from "react-router"
import { useCookies } from "react-cookie"

const ProtectedRoutes = () => {
    const cookies = useCookies()
    const location = useLocation()

    let auth = cookies[0].user == undefined ? false : true
    
    return (
        auth ? <Outlet></Outlet> : <Navigate to="/sign-in" state={location.pathname}/>
    )
}


export default ProtectedRoutes