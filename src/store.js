import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice, publicPlantsSlice,environmentsSlice,myPlantsSlice,environmentTypesSlice,strainSlice,irrigationTypesSlice,stagesSlice,plantActionTypesSlice,notificationSlice } from './features'

const rootReducers = combineReducers(
    {
        auth: authSlice.reducer,
        notifications:notificationSlice.reducer,
        strains:strainSlice.reducer,
        irrigationTypes:irrigationTypesSlice.reducer,
        publicPlants: publicPlantsSlice.reducer,
        myPlants:myPlantsSlice.reducer,
        stages:stagesSlice.reducer,
        environments: environmentsSlice.reducer,
        environmentTypes:environmentTypesSlice.reducer,
        plantActionTypes:plantActionTypesSlice.reducer
    })

export const store = configureStore({
    reducer: rootReducers,

})