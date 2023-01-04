import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import { InView, useInView } from 'react-intersection-observer'
import { keyframes } from '@emotion/react'

import { setBGColor } from '../../actions'

const slideIn = keyframes`
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    
    to {
        transform: translateY(0px);
        opacity: 1;
    }
`

const Education = (props) => {
    const { setBGColor } = props
    const [inView, setInView] = useState(false)
    const [eduRef, eduInView] = useInView()

    useEffect(() => {
        if (!eduInView) return
        setBGColor('default')
    }, [eduInView])

    return (
        <InView onChange={setInView} triggerOnce={true}>
            {({ ref }) => (
                <>
                    <div ref={ref}></div>
                    <Fade in={inView} timeout={{ enter: 1000 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                            <Typography variant='h3' sx={{ border: `${4/16}rem solid`, py: 2, px: 4}}>Education</Typography>
                        </Grid>
                    </Fade>

                        <Grid item xs={12} sx={{p: 2, mt: 2, animation: inView && `${slideIn} 0.5s ease-in 0.5s forwards`, opacity: 0 }}>
                            <Typography>Test</Typography>
                        </Grid>
                    <div ref={eduRef}></div>
                </>
            )}
        </InView>
    )
}

export default connect(null, { setBGColor })(Education)