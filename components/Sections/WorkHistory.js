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
            <>
            <Fade in={inView} timeout={{ enter: 1000, exit: 100 }}>
                <Grid ref={ref} item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant='h3'>Work History</Typography>
                    <Divider sx={{ 
                        height: '5px', width: '70%', margin: '10px 0', border: 0,
                        '&:after': { display: 'block', content: '""', height: '20px', 
                        backgroundImage: 'radial-gradient(farthest-side at center top, #81d4fa 0%, rgba(255, 255, 255, 0) 100%)'
                        }, 
                         }}/>
                </Grid>
            </Fade>
            <Grid item xs={12}>
                
            </Grid>
            </>
        )
        }
        </InView>
    )
}

export default WorkHistory