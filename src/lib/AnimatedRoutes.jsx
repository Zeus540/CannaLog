import React, { useState, useEffect,lazy } from 'react'
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SnackbarProvider } from 'notistack'
import { useSelector } from 'react-redux';

//Pages
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import HomePage from '../pages/HomePage/HomePage'
import RegistrationComplete from '../pages/Register/RegistrationComplete'
import Verify from '../pages/Register/Verify'
import Terms from '../pages/Terms/Terms';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Growers from '../pages/Growers/Growers';
import Notifications from '../pages/Notifications/Notifications';
import PublicPlants from '../pages/PublicPlants/PublicPlants';
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import Environments from '../pages/Environments/Environments'
import MyPlants from '../pages/MyPlants/MyPlants'
import MyPlantsDetailed from '../pages/MyPlants/MyPlantsDetailed'
import PublicPlantDetailed from '../pages/PublicPlants/PublicPlantDetailed';

//Context
import { SocketProvider } from '../context/SocketContext';
import { NotificationProvider } from '../context/NotificationContext';
import { LogoutProvider } from '../context/LogoutContext';

//Features
import {
    selectIsLoggedIn,
  } from '../features'

//Components
import NavBar from '../components/navbar/NavBar'
import Footer from '../components/footer/Footer'
import WebSocketListener from '../components/WebSocketListener';

//Utils
import ProtectedRoutes from '../utils/ProtectedRoutes';





const Root = styled.div`
background:  ${props => props.theme.secondary};
`;

function AnimatedRoutes({themeType,toggleTheme}) {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const location = useLocation()
    const [sideBar, setSideBar] = useState(false);


    
    //const HomePage = lazy(()=>import('../pages/HomePage/HomePage'))
    //const Notifications = lazy(()=>import('../pages/Notifications/Notifications'))
    //const Growers = lazy(()=>import('../pages/Growers/Growers'))
    //const MyPlants = lazy(()=>import('../pages/MyPlants/MyPlants'))
    //const MyPlantsDetailed = lazy(()=>import('../pages/MyPlants/MyPlantsDetailed'))
    //const PublicPlants = lazy(()=>import('../pages/PublicPlants/PublicPlants'))
    //const PublicPlantDetailed = lazy(()=>import('../pages/PublicPlants/PublicPlantDetailed'))
    //const Environments = lazy(()=>import('../pages/Environments/Environments'))
    //const Terms = lazy(()=>import('../pages/Terms/Terms'))
    //const CookiePolicy = lazy(()=>import('../pages/CookiePolicy/CookiePolicy'))
    //const PrivacyPolicy = lazy(()=>import('../pages/PrivacyPolicy/PrivacyPolicy'))
    //const Login = lazy(()=>import('../pages/Login/Login'))
    //const Register = lazy(()=>import('../pages/Register/Register'))
    //const RegistrationComplete = lazy(()=>import('../pages/Register/RegistrationComplete'))
    //const Verify = lazy(()=>import('../pages/Register/Verify'))

    const OffClick = () => {
        if (sideBar == true) {
            setSideBar(false);
        }
    }

    useEffect(() => {

        window.scrollTo(0, 0);
        
        window.onunload = function () {
            window.scrollTo(0, 0);
        }

      }, [location]);

    
    return (

        <AnimatePresence >
          
            <SnackbarProvider anchorOrigin={{horizontal: "center", vertical: "top"}}>
            <LogoutProvider>
            <Root onClick={()=> {OffClick()}}>
            <NotificationProvider>
                <SocketProvider>
                
                <NavBar sideBar={sideBar} setSideBar={setSideBar} OffClick={OffClick} themeType={themeType} toggleTheme={toggleTheme}/>
                    <Routes location={location} key={location.pathname}>
                        <Route element={<ProtectedRoutes/>}>        
                            <Route path="/my-environments" element={<Environments />} />
                            <Route path="/my-plants" element={<MyPlants />} />
                            <Route path="/my-plants/:plant_name/:environment_id/:plant_id" element={<MyPlantsDetailed />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/growers" element={<Growers />} />
                        </Route>
                     
                      
                            <Route path="/public-plant/:plant_name/:environment_id/:plant_id" element={<PublicPlantDetailed />} />
                            <Route path="/terms" exact element={<Terms />} />
                            <Route path="/cookie-policy" element={<CookiePolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                       

                            {!isLoggedIn ?
                            <>
                        
                            <Route path="/" element={<HomePage />} />
                            <Route path="/public-plants" element={<PublicPlants />} />
                                <Route path="/sign-in" element={<Login />} />
                                <Route path="/sign-up" element={<Register />} />
                                <Route path="/sign-up/:name/:email" element={<RegistrationComplete />} />
                                <Route path="/verify/:token" element={<Verify />}/>
                        
                            </>
                            :
                            <>
                                <Route path="/" element={<PublicPlants />} />
                            </>
                            }
                      
                        <Route path="*" element={<NotFoundPage />}/>
                    </Routes>

                <Footer />
                <WebSocketListener/> 
                </SocketProvider>
               </NotificationProvider>
            </Root>
            </LogoutProvider>
            </SnackbarProvider>
            
        </AnimatePresence>


    )
}

export default AnimatedRoutes