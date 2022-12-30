import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'
import { InView } from 'react-intersection-observer'

const Skills = () => {
    const [inView, setInView] = useState(false)
    
    return (
            <InView onChange={setInView} triggerOnce={true}>
                { ({ ref }) => (
                <>
                <Fade in={inView} ref={ref} timeout={ {enter: 1000} } >
                    <Grid item xs={6} sx={{ width: '100%' }} >
                        <Card sx={{ backgroundColor: 'background.default' }}>
                            x
                        </Card>
                    </Grid>
                </Fade>
                <Fade in={inView} ref={ref} timeout={ {enter: 1000} } >
                    <Grid item xs={6} sx={{ width: '100%' }}>
                        <Card sx={{ borderColor: 'blue.500', borderWidth: '5px', borderStyle: 'solid', width: '100%', height: '50px' }}>
                            x
                        </Card>
                    </Grid>
                </Fade>
                </>
            )}
            </InView>
    )
}

export default Skills