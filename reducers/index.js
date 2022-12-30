import { combineReducers } from "redux";

const splashSet = (state=0, action) => {

    if (action.type == 'SET_SPLASH') {
        return action.payload
    } else {
        return state
    }
}

const skillsSet = (state=0, action) => {

    if (action.type == 'SET_SKILLS') {
        return action.payload
    } else {
        return state
    }
}

export default combineReducers({
    splash: splashSet,
    skills: skillsSet
})