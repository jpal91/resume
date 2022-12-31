import { useState } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import ButtonBase from '@mui/material/ButtonBase'
import { InView } from 'react-intersection-observer'


import Terminal from '../Splash/Terminal'
import SkillsInfo from './SkillsInfo'
import { controller, setSkillsInfo, setSkillsDisplay, setLockTransitions } from '../../actions'

const Skills = (props) => {
    const [inView, setInView] = useState(false)
    const [curName, setName] = useState('main')
    
    /**
     * skills Int - Initial controller for skills terminal, controls what is being displayed and icons appearing (updated by controller)
     * controller Func - Redux action handler to control all display types for terminals
     * icons Array - List of file names for icons in public folder to display
     * skillsInfo Obj - Comprises of the information in section below, used to render new info when icon is clicked
     * setSkillsInfo Func - Redux action handler to update skillsInfo
     * altSkills Int - Initial controller for alt_skills terminal - used when icon is clicked for specific skill to re-render terminal
     * skillsDisplay Int - Controller to show whether to display initial skills term, alt_skills term, or alt_skills info display (updated by controller)
     * setSkillsDisplay Func - Redux action handler to update skillsDisplay
     * lockTransitions Bool - Prevents user from clicking on icons while terminal is still rendering causing render issues
     * setLockTransitions Func - Redux action handler to update lockTransitions preventing or allowing user to click new skill icon
     * 
     * cmds Array[Array] - [["This is a command", "This is the same command retyped"], ["This is the next command"]]
     * outputs Array[Array] - [["This is the output to the first command"], ["Second command", "New line"]]
     * contType String - "skills" / "alt_skills"
     * title String - Name to show on terminal - '~:bash' 'skills:bash'
     * fWidth Bool - Show terminal half screen (sections) or in splash mode (full)
     */
    const { skills, controller, icons, skillsInfo, skillsObj, setSkillsInfo, altSkills, skillsDisplay, setSkillsDisplay, lockTransitions, setLockTransitions } = props
    const { outputs, cmds, contType, fWidth, title } = skillsInfo

    const startSeq = (e) => {
        if (!e) return

        setInView(true)
        controller('skills', 0)
    }

    const updateSkills = (name) => {
        if (name == curName || lockTransitions) return
        
        setLockTransitions(true)
        setName(name)
        setSkillsDisplay(1)
        controller('alt_skills', 0)
        setSkillsInfo(skillsObj[name])

    }
    
    return (
            <InView onChange={(e) => startSeq(e)} triggerOnce={true}>
                { ({ ref }) => (
                <>
                <Fade in={inView} ref={ref} timeout={ {enter: 1000} } >
                    <Grid item xs={12} sm={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: { sm: `${3 / 16}rem solid`}, borderColor: {sm: 'lightBlue.200'}, height: '400px' }} >
                        <Terminal
                            name={curName}    
                            cmds={cmds}
                            outputs={outputs}
                            contType={contType}
                            contState={skillsDisplay == 0 ? skills : altSkills}
                            fWdith={fWidth}
                            title={title}
                            hidden={skillsDisplay >= 2 ? true : false}
                        />
                        <SkillsInfo 
                            name={curName}
                            hidden={skillsDisplay >= 2 ? false : true}
                        />
                    </Grid>
                </Fade>
                <Grid item xs={12} sm={6} sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column-reverse', height: '400px'}} >
                    {icons.map((e, i) => {
                        const name = e.replace('.svg', '')
                        return (
                            <Box key={name} sx={{ transition: 'transform 0.5s ease-in-out', '&:hover': { transform: 'scale(1.2)'},}}>
                            <Fade  in={inView && skills >= 1} timeout={ {enter: 1000 + (i * 500)} }>
                                    <ButtonBase onClick={() => updateSkills(name)} sx={{ borderRadius: '10px' }}>
                                        <Image src={`/svg-icons/${e}`} height="60" width="60" alt={name} />
                                    </ButtonBase>
                            </Fade>
                            </Box>
                        )
                    })}
                </Grid>
                </>
            )}
            </InView>
    )
}

const mapStateToProps = (state) => {
    return {
        skills: state.skills,
        skillsInfo: state.skillsInfo,
        altSkills: state.altSkills,
        skillsDisplay: state.skillsDisplay,
        lockTransitions: state.lockTransitions
    }
}

export default connect(mapStateToProps, { controller, setSkillsInfo, setSkillsDisplay, setLockTransitions })(Skills)