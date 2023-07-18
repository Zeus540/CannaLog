import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import PreLoader from '../components/preLoader/PreLoader'
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import { Routes, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomePage from '../pages/HomePage/HomePage'
import PublicJournals from '../pages/PublicJournals/PublicJournals'
import Terms from '../pages/Terms/Terms';
import CookiePolicy from '../pages/CookiePolicy/CookiePolicy';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import Growers from '../pages/Growers/Growers';
import PublicPlants from '../pages/PublicPlants/PublicPlants';

import {
    fetchEnvironments,
    fetchEnvironmentTypes,
    fetchMyPlants,
    selectIsLoggedIn,
    selectPublicJournal,
    fetchPlantActionTypes
  } from '../features'
import { useDispatch, useSelector } from 'react-redux'
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

const Root = styled.div`

background:  ${props => props.theme.secondary};
`;

function AnimatedRoutes({themeType,toggleTheme}) {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    const publicPlants = useSelector(selectPublicJournal);
    const location = useLocation()
    const [mobileMenu, setMobileMenu] = useState(false);
    const dispatch = useDispatch()

 
    const OffClick = () => {
        if (mobileMenu == true) {
            setMobileMenu(false);
        }
    }

    useEffect(() => {
        if(isLoggedIn == true){
            dispatch(fetchMyPlants())
            dispatch(fetchEnvironments())
            dispatch(fetchEnvironmentTypes())
            dispatch(fetchPlantActionTypes())
        }
      }, [isLoggedIn])

    
    return (

        <AnimatePresence mode="wait">
            <Root>
                <NavBar mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} OffClick={OffClick} themeType={themeType} toggleTheme={toggleTheme}/>
                <Routes location={location} key={location.pathname}>
                    {isLoggedIn ?
                        <>
                           
                            <Route path="/" element={<PreLoader Page={PublicPlants} data={publicPlants.loading} />} />
                            <Route path="/my-environments" element={<Environments />} />
                            <Route path="/my-plants" element={<MyPlants />} />
                            <Route path="/my-plants/:plant_name/:environment_id/:plant_id" element={<MyPlantsDetailed />} />
                            <Route path="/growers" element={<Growers />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/cookie-policy" element={<CookiePolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="*" element={<NotFoundPage />} />
                            
                        </>
                        :
                        <>
                          <Route path="/public-plants" element={<PublicPlants />} />
                            <Route path="/" element={<PreLoader Page={HomePage} data={publicPlants.loading} />} />
                            <Route path="/sign-in" element={<Login />} />
                            <Route path="/sign-up" element={<Register />} />
                            <Route path="/sign-up/:name/:email" element={<RegistrationComplete />} />
                            <Route path="/verify/:token" element={<Verify />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/cookie-policy" element={<CookiePolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="*" element={<NotFoundPage />} />
                        </>

                    }
                </Routes>
                <Footer />
                <WebSocketListener/>
            </Root>
        </AnimatePresence>


    )
}

export default AnimatedRoutes