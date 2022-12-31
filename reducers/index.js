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

export default combineReducers({
    splash: splashSet,
    skills: skillsSet,
    skillsInfo: skillsInfo,
    altSkills: altSkills
})