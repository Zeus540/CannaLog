import { Outlet, Navigate } from "react-router"
import { useCookies } from "react-cookie"

const ProtectedRoutes = () => {
    const cookies = useCookies()
    console.log("cookies",cookies[0].user)
    let auth = cookies[0].user == undefined ? false : true
    return (
        auth ? <Outlet></Outlet> : <Navigate to="/sign-in"/>
    )
}


export default ProtectedRoutes