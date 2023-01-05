import { combineReducers } from "redux";

const initialSkills = {
    cmds: [['curl -s -o nice-things-to-have.txt', 'curl -s -o superpow', 'curl -s -o skills.txt https://myskills.com'], ['cat skills.txt']],
    outputs: [[], ['git\tDocker\tbash\tAWS\tPostgreSQL\n', 'MySQL\tmongoDB\tLinux\tMaterial UI\n', 'GitHub\tUbuntu\tReact\tTerraform\n', 'Python\tNode.js\tNext.js\tJupyter Notebooks\n', 'JavaScript\n', 'And many more!']],
    contType: 'skills',
    fWidth: false,
    title: 'resume/skills:bash'
}

const skillsInfo = (state=initialSkills, action) => {
    
    if (action.type == 'SET_SKILLS_INFO') {
        return { ...state, ...action.payload,  }
    } else {
        return state
    }
}

const splashSet = (state=0, action) => {

    if (action.type == 'SET_SPLASH') {
        return action.payload
    } else {
        return state
    }
}

const skillsSet = (state=-1, action) => {

    if (action.type == 'SET_SKILLS') {
        return action.payload
    } else {
        return state
    }
}

const altSkills = (state=-1, action) => {

    if (action.type == 'SET_ALT_SKILLS') {
        return action.payload
    } else {
        return state
    }
}

const skillsDisplay = (state=0, action) => {
    if (action.type == 'SET_SKILLS_DISPLAY') {
        return action.payload
    } else {
        return state
    }
}

const lockTransitions = (state=false, action) => {
    if (action.type == 'LOCK_TRANSITIONS') {
        return action.payload
    } else {
        return state
    }
}

const bgColor = (state='default', action) => {
    if (action.type == 'SET_BG_COLOR') {
        return action.payload
    } else {
        return state
    }
}

const modalState = (state={}, action) => {
    if (action.type == 'SET_MODALS') {
        const stateObj = state
        const { id, newState } = action.payload
        stateObj[id] = newState
        
        return stateObj
    } else {
        return state
    }
}

export default combineReducers({
    splash: splashSet,
    skills: skillsSet,
    skillsInfo: skillsInfo,
    altSkills: altSkills,
    skillsDisplay: skillsDisplay,
    lockTransitions: lockTransitions,
    bgColor: bgColor,
    modalState: modalState
})