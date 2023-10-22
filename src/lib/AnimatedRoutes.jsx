import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import PreLoader from '../components/preLoader/PreLoader'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from '../pages/HomePage/HomePage'
import { SnackbarProvider } from 'notistack'
import Terms from '../pages/Terms/Terms';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Growers from '../pages/Growers/Growers';
import Notifications from '../pages/Notifications/Notifications';
import PublicPlants from '../pages/PublicPlants/PublicPlants';
import { SocketProvider } from '../context/SocketContext';
import { NotificationProvider } from '../context/NotificationContext';
import {
    selectIsLoggedIn,
  } from '../features'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'
import RegistrationComplete from '../pages/Register/RegistrationComplete'
import Verify from '../pages/Register/Verify'
import NavBar from '../components/navbar/NavBar'
import Environments from '../pages/Environments/Environments'
import MyPlants from '../pages/MyPlants/MyPlants'
import MyPlantsDetailed from '../pages/MyPlants/MyPlantsDetailed'
import Footer from '../components/footer/Footer'
import WebSocketListener from '../components/WebSocketListener';
import PublicPlantDetailed from '../pages/PublicPlants/PublicPlantDetailed';
import ProtectedRoutes from '../utils/ProtectedRoutes';
import { LogoutProvider } from '../context/LogoutContext';
import { useSelector } from 'react-redux';

const Root = styled.div`

background:  ${props => props.theme.secondary};
`;

function AnimatedRoutes({themeType,toggleTheme}) {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const location = useLocation()
    const [mobileMenu, setMobileMenu] = useState(false);

    const OffClick = () => {
        if (mobileMenu == true) {
            setMobileMenu(false);
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
            <Root >
            <NotificationProvider>
                <SocketProvider>
                
                <NavBar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} OffClick={OffClick} themeType={themeType} toggleTheme={toggleTheme}/>
                    <Routes location={location} key={location.pathname}>
                        <Route element={<ProtectedRoutes/>}>        
                            <Route path="/my-environments" element={<Environments />} />
                            <Route path="/my-plants" element={<MyPlants />} />
                            <Route path="/my-plants/:plant_name/:environment_id/:plant_id" element={<MyPlantsDetailed />} />
                            <Route path="/notifications" element={<Notifications />} />
                            <Route path="/growers" element={<Growers />} />
                        </Route>
                     
           
                        <Route path="/public-plant/:plant_name/:environment_id/:plant_id" element={<PublicPlantDetailed />} />
                        <Route path="/terms" element={<Terms />} />
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