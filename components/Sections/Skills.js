import { useState } from 'react'
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import { InView } from 'react-intersection-observer'

import Terminal from '../Splash/Terminal'
import { controller } from '../../actions'

const Skills = (props) => {
    const [inView, setInView] = useState(false)
    const { skills, controller } = props

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
                    <Grid item xs={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
                        <Terminal 
                            cmds={[['curl -s -o nice-things-to-have.txt', 'curl -s -o superpow', 'curl -s -o skills.txt https://myskills.com'], ['cat skills.txt']]}
                            outputs={[[], ['React\tNext.js\t Redux\n', 'Docker\tTerraform']]}
                            contType={'skills'}
                            contState={skills}
                            fWidth={false}
                            title={'resume/skills:bash'}
                        />
                    </Grid>
                </Fade>
                </>
            )}
            </InView>
    )
}

const mapStateToProps = (state) => {
    return {
        skills: state.skills
    }
}

export default connect(mapStateToProps, { controller })(Skills)