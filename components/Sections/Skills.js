import { useState } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import { InView } from 'react-intersection-observer'
import CircleIcon from '@mui/icons-material/Circle'

import Terminal from '../Splash/Terminal'
import { controller } from '../../actions'

const Skills = (props) => {
    const [inView, setInView] = useState(false)
    const { skills, controller, icons } = props
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
                    <Grid item xs={6} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: `${3 / 16}rem solid`, borderColor: 'lightBlue.200', height: '400px' }} >
                        <Terminal 
                            cmds={[['curl -s -o nice-things-to-have.txt', 'curl -s -o superpow', 'curl -s -o skills.txt https://myskills.com'], ['cat skills.txt']]}
                            outputs={[[], ['git\tDocker\tbash\tAWS\tPostgreSQL\n', 'MySQL\tmongoDB\tLinux\tMaterial UI\n', 'GitHub\tUbuntu\tReact\tTerraform\n', 'Python\tNode.js\tNext.js\tJupyter Notebooks\n', 'JavaScript\n', 'And many more!']]}
                            contType={'skills'}
                            contState={skills}
                            fWidth={false}
                            title={'resume/skills:bash'}
                        />
                    </Grid>
                </Fade>
                <Grid item xs={6} sx={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'column-reverse', height: '400px'}} >
                    {icons.map((e, i) => {
                        const name = e.replace('.svg', '')
                        return (
                            <Fade key={name} in={inView && skills >= 1} timeout={ {enter: 1000 + (i * 500)} }>
                                <Image src={`/svg-icons/${e}`} height="60" width="60" alt={name} />
                            </Fade>
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
        skills: state.skills
    }
}

export default connect(mapStateToProps, { controller })(Skills)