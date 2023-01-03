import { useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Divider from '@mui/material/Divider'
import { InView } from "react-intersection-observer";

const WorkHistory = (props) => {
    const [inView, setInView] = useState(false)
    
    return (
        <InView onChange={setInView} triggerOnce={true}>
        {({ref}) => (
            <Fade in={inView} timeout={{ enter: 1000, exit: 100 }}>
                <Grid ref={ref} item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h3'>Hello</Typography>
                    <Divider variant='center' sx={{ 
                        height: '10px', width: '50%',
                         }}/>
                </Grid>
            </Fade>
        )
        }
        </InView>
    )
}

export default WorkHistory