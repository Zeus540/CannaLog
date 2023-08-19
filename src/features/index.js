import {authSlice,auth,logout,selectIsLoggedIn,selectUser} from "./auth/authSlice.js"

import {publicPlantsSlice,selectPublicJournal} from "./plants/publicPlantsSlice.js"
import {fetchPublicPlants,fetchPublicPlantsSingedIn} from "./plants/publicPlantsThunk.js"

import {myPlantsSlice,selectMyPlants,isLoadingMyPlants} from "./plants/myPlantsSlice.js"
import {fetchMyPlants,addPlants,deletePlant,takeAction,deleteAction} from "./plants/myPlantsThunk.js"
import {environmentsSlice,selectEnvironments,deleteEnvironmentLocally,selectEnvironmentsIsLoading,addEnvironmentLocally,editEnvironmentLocally} from "./enviroments/environmentsSlice.js"
import {deleteEnvironment} from "./enviroments/deleteEnvironmentThunk.js"
import {fetchEnvironments} from "./enviroments/environmentsThunk.js"

import {fetchEnvironmentTypes} from "./enviroments/environmentTypesThunk.js"
import {environmentTypesSlice,selectEnvironmentsTypes} from "./enviroments/environmentTypesSlice.js"
import {addEnvironment} from "./enviroments/addEnvironmentThunk.js"
import {editEnvironment} from "./enviroments/editEnvironmentThunk.js"

import { strainSlice,selectStrains } from "./strains/strainSlice.js"
import { fetchStrains } from "./strains/strainThunk.js"

import { irrigationTypesSlice,selectIrrigationTypes } from "./irrigationTypes/irrigationTypesSlice.js"
import { fetchIrrigationTypes } from "./irrigationTypes/irrigationTypesThunk.js"

import { selectStages,stagesSlice } from "./stages/stagesSlice.js"
import {fetchStages} from './stages/stagesThunk.js'

import { plantActionTypesSlice,selectPlantActionTypes } from "./plantActionTypes/plantActionTypesSlice.js"
import { fetchPlantActionTypes } from "./plantActionTypes/plantActionTypesThunk.js" 

import { notificationSlice } from "./notifications/notificationSlice.js"
import { fetchNotifications } from "./notifications/notificationThunk.js"

export {
    authSlice,
    auth,
    logout,
    selectIsLoggedIn,
    selectUser,
    publicPlantsSlice,
    selectPublicJournal,
    myPlantsSlice,
    selectMyPlants,
    environmentsSlice,
    selectEnvironments,
    deleteEnvironmentLocally,
    fetchEnvironments,
    deleteEnvironment,
    selectEnvironmentsIsLoading,
    fetchEnvironmentTypes,
    environmentTypesSlice,
    fetchMyPlants,
    fetchPublicPlants,
    fetchPublicPlantsSingedIn,
    selectEnvironmentsTypes,
    addEnvironment,
    addEnvironmentLocally,
    editEnvironmentLocally,
    editEnvironment,
    isLoadingMyPlants,
    strainSlice,
    fetchStrains,
    selectStrains,
    irrigationTypesSlice,
    fetchIrrigationTypes,
    selectIrrigationTypes,
    addPlants,
    takeAction,
    deleteAction,
    deletePlant,
    selectStages,
    stagesSlice,
    fetchStages,
    plantActionTypesSlice,
    fetchPlantActionTypes,
    selectPlantActionTypes,
    notificationSlice,
    fetchNotifications
} 
