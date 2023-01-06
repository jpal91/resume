import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Image from 'next/image'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'
import SchoolIcon from '@mui/icons-material/School';
import { InView, useInView } from 'react-intersection-observer'
import { keyframes } from '@emotion/react'

import { setBGColor, setSection } from '../../actions'

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
    const { setBGColor, setSection } = props
    const [inView, setInView] = useState(false)
    const [eduRef, eduInView] = useInView({ threshold: 0.55 })

    useEffect(() => {
        
        if (!eduInView) return
        setSection('education', eduInView)
        setBGColor('default')
    }, [eduInView])


    return (
        <InView onChange={setInView} triggerOnce={true}>
            {({ ref }) => (
                <>
                    <div ref={ref}></div>
                    <Fade in={inView} timeout={{ enter: 1000 }}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                            <Typography variant='h3' sx={{ py: 2, px: 2}}>education</Typography>
                            <Box sx={{ display: 'flex', borderRadius: '100%', border: `${3/16}rem solid`, borderColor: 'primary.main', p: 1}}>
								<SchoolIcon sx={{ color: 'primary.main', fontSize: '40px', }}/>
							</Box>
                        </Grid>
                    </Fade>

                        <Grid item xs={12} sx={{p: 2, mt: 1, animation: inView && `${slideIn} 0.5s ease-in 0.5s forwards`, opacity: 0, display: 'flex', flexDirection: { xs: 'column', sm: 'row-reverse' }, justifyContent: 'center', alignItems: { xs: 'center', sm: 'normal' }, columnGap: 5}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography variant='h4'>BS in Business Administration</Typography>
                            <Typography variant='h5' sx={{ mb: 1 }}>Concentration in Economics</Typography>
                            <Typography variant='bodyBold' component={'p'}>Appalachian State University - Boone, NC</Typography>
                            <Typography variant='bodyBold' component={'p'}>08/2009 - 12/2013</Typography>
                            </Box>
                            <Image src='/proj-pics/app_state.svg' height={300} width={200} alt='app-state'/>
                        </Grid>
                    <Box id='education' ref={eduRef} sx={{ position: 'absolute', height: '100%', width: '100%', visibility: 'hidden'}}>Center</Box>
                </>
            )}
        </InView>
    )
}

export default connect(null, { setBGColor, setSection })(Education)