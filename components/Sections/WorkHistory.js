import React,{ useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { InView, useInView } from "react-intersection-observer";
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

const WorkHistory = (props) => {
    const { workInfo, setBGColor, setSection } = props
    const [inView, setInView] = useState(false)
    const [workRef, workInView] = useInView({ threshold: 0.55 })

    useEffect(() => {
        
        if (!workInView) return
        setSection('work history', workInView)
        setBGColor('default')
    }, [workInView])

    return (
        <>
        <InView onChange={setInView} triggerOnce={true}>
        {({ref}) => (
            <React.Fragment>
            <Fade in={inView} timeout={{ enter: 500, exit: 100 }}>
                <Grid  item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', }}>
                    <Typography variant='h3' sx={{ py: 2, px: 2}}>work history</Typography>
                    <Box sx={{ display: 'flex', borderRadius: '100%', border: `${3/16}rem solid`, borderColor: 'primary.main', p: 1}}>
						<WorkHistoryIcon sx={{ color: 'primary.main', fontSize: '40px', }}/>
					</Box>
                </Grid>
            </Fade>
            {/* <Fade in={inView} timeout={{ enter: 1000 }}> */}
            <Grid ref={ref} item xs={12} sx={{p: 2, mt: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
                {workInfo.jobs.map((e) => {
                    const { name, startDate, endDate, title, location, bulletPoints } = e
                    
                    return (
                        <Box key={name} sx={{ animation: inView && `${slideIn} 0.5s linear 0.5s forwards`, opacity: 0 }}>
                        
                            <Typography variant='h4'>{title}</Typography>
                            <Typography>{`${startDate} - ${endDate ? endDate : 'Current'}`}</Typography>
                            <Typography variant='bodyBold'>{name} - {location}</Typography>
                        <List dense>
                        {bulletPoints.map((el, idx) => (
                            <Fade key={`${name}${idx}`} in={inView} timeout={{ enter: 2000 + (idx * 1000) }}>
                                <ListItem>
                                    <ListItemIcon >
                                        {/* <Avatar sx={{ backgroundColor: 'secondary.dark', width: '25px', height: '25px', mb: 0.25 }}> */}
                                            {/* <ChevronRightIcon sx={{ color: 'lightGreen.A400'}}/>*/}
                                             <DoubleArrowIcon sx={{ fontSize: '20px', color: 'primary.dark'}}/>
                                        {/* </Avatar> */}
                                    </ListItemIcon>
                                    <ListItemText primaryTypographyProps={{ variant: 'body', fontSize: '14px' }}>{el}</ListItemText>
                                </ListItem>
                            </Fade>
                        ))}
                        </List>
                        </Box>
                    )
                })}
            </Grid>
            {/* </Fade> */}
            
            </React.Fragment>
        )
        }
        </InView>
        <Box id='workhistory' ref={workRef} sx={{ position: 'absolute', height: '100%', width: '100%', visibility: 'hidden'}}>Center</Box>
        </>
    )
}


export default connect(null, { setBGColor, setSection })(WorkHistory)