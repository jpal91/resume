import { combineReducers } from "redux";

const splash = (state=0, action) => {
    if (action.type == 'SET_SPLASH') {
        return action.payload
    } else {
        return state
    }
}

export default combineReducers({
    splash: splash
})