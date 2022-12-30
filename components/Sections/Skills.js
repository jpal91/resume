import { useState } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { InView } from 'react-intersection-observer'
import CircleIcon from '@mui/icons-material/Circle'
import { keyframes } from '@emotion/react'

import Terminal from '../Splash/Terminal'
import { controller } from '../../actions'

const ripple = keyframes`
    25% {
        transform: scale(1.5);

    }
    75% {
        transform: scale(0.75);

    }
    to {
        opacity: 1;
    }
`

const ripple2 = keyframes`
    0% {
        transform: scale(1)
    }

    50% {
        transform: scale(1.2)
    }

    100% {
        transform: scale(1)
    }
`

const ripple3 = keyframes`
    to {
        transform: scale(1.2)
    }
`

const Skills = (props) => {
    const [inView, setInView] = useState(false)
    const { skills, controller, icons, skillsInfo } = props
    const { outputs, cmds, contType, fWidth, title } = skillsInfo
    const testArr = [1, 1, 1]

    const startSeq = (e) => {
        if (!e) return

        setInView(true)
        controller('skills', 0)
    }
    
    return (
            <InView onChange={(e) => startSeq(e)} triggerOnce={true}>
                { ({ ref }) => (
                <>
                <Fade in={inView} ref={ref} timeout={ {enter: 1000} } >
                    <Grid item xs={12} sm={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: { sm: `${3 / 16}rem solid`}, borderColor: {sm: 'lightBlue.200'}, height: '400px' }} >
                        <Terminal
                            cmds={cmds}
                            outputs={outputs}
                            contType={contType}
                            contState={skills}
                            fWdith={fWidth}
                            title={title}
                        />
                    </Grid>
                </Fade>
                <Grid item xs={12} sm={6} sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column-reverse', height: '400px'}} >
                    {icons.map((e, i) => {
                        const name = e.replace('.svg', '')
                        return (
                            <Box key={name} sx={{ transition: 'transform 0.5s ease-in-out', '&:hover': { transform: 'scale(1.2)'}}}>
                            <Fade  in={inView && skills >= 1} timeout={ {enter: 1000 + (i * 500)} }>
                                    <Image src={`/svg-icons/${e}`} height="60" width="60" alt={name} />
                                
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
        skillsInfo: state.skillsInfo
    }
}

export default connect(mapStateToProps, { controller })(Skills)