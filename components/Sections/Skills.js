import { useState } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import ButtonBase from '@mui/material/ButtonBase'
import Skeleton  from '@mui/material/Skeleton'
import { InView } from 'react-intersection-observer'


import Terminal from '../Splash/Terminal'
import { controller, setSkillsInfo } from '../../actions'
import { createFalse } from 'typescript'

const Skills = (props) => {
    const [inView, setInView] = useState(false)
    const [display, setDisplay] = useState(0)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const { skills, controller, icons, skillsInfo, skillsObj, setSkillsInfo, altSkills } = props
    const { outputs, cmds, contType, fWidth, title } = skillsInfo
    const testArr = [1, 1, 1]

    const startSeq = (e) => {
        if (!e) return

        setInView(true)
        controller('skills', 0)
    }

    const updateSkills = (name) => {
        setLoading(true)
        setName(name)
        setDisplay(1)
        controller('alt_skills', 0)
        const obj = skillsObj[name]
        obj.contType = 'alt_skills'
        setSkillsInfo(obj)
        // setTimeout(() => {
        //     setLoading(false)
        // }, 1000)
        setLoading(false)
        
    }
    
    return (
            <InView onChange={(e) => startSeq(e)} triggerOnce={true}>
                { ({ ref }) => (
                <>
                <Fade in={inView} ref={ref} timeout={ {enter: 1000} } >
                    <Grid item xs={12} sm={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: { sm: `${3 / 16}rem solid`}, borderColor: {sm: 'lightBlue.200'}, height: '400px' }} >
                        {/* <Terminal
                            cmds={[['curl -s -o nice-things-to-have.txt', 'curl -s -o superpow', 'curl -s -o skills.txt https://myskills.com'], ['cat skills.txt']]}
                            outputs={[[], ['git\tDocker\tbash\tAWS\tPostgreSQL\n', 'MySQL\tmongoDB\tLinux\tMaterial UI\n', 'GitHub\tUbuntu\tReact\tTerraform\n', 'Python\tNode.js\tNext.js\tJupyter Notebooks\n', 'JavaScript\n', 'And many more!']]}
                            contType={'skills'}
                            contState={skills}
                            fWdith={false}
                            title={'resume/skills:bash'}
                            hidden={display != 0}
                        /> */}
                        { !loading ?
                        <Terminal
                            key={name}    
                            cmds={cmds}
                            outputs={outputs}
                            contType={contType}
                            contState={display == 0 ? skills : altSkills}
                            fWdith={fWidth}
                            title={title}
                            hidden={false}
                        /> : <Skeleton />
                         }
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
        altSkills: state.altSkills
    }
}

export default connect(mapStateToProps, { controller, setSkillsInfo })(Skills)