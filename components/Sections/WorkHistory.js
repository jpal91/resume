import React,{ useState, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { InView } from "react-intersection-observer";
import { keyframes } from '@emotion/react'

const slideIn = keyframes`
    from {
        transform: translateY(100px);
    }
    
    to {
        transform: translateY(0px);
    }
`

const WorkHistory = (props) => {
    const { workInfo } = props
    const [inView, setInView] = useState(false)
    const containerRef = useRef(null)
    
    return (
        <InView onChange={setInView} triggerOnce={true}>
        {({ref}) => (
            <React.Fragment>
            <Fade in={inView} timeout={{ enter: 500, exit: 100 }}>
                <Grid  item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', }}>
                    <Typography variant='h3' sx={{ border: `${4/16}rem solid`, py: 2, px: 4}}>Work History</Typography>
                    {/* <Divider sx={{ 
                        height: '5px', width: '70%', margin: '10px 0', border: 0,
                        '&:after': { display: 'block', content: '""', height: '20px', 
                        backgroundImage: 'radial-gradient(farthest-side at center top, #a7c0cd 0%, rgba(255, 255, 255, 0) 100%)'
                        }, 
                         }}/> */}
                </Grid>
            </Fade>
            {/* <Slide direction='up' in={inView} timeout={{ enter: 1000 }} container={containerRef.current}> */}
            <Fade in={inView} timeout={{ enter: 1000 }}>
            <Grid ref={ref} item xs={12} sx={{p: 2, mt: 2, animation: inView && `${slideIn} 0.5s ease-in forwards`}}>
                {workInfo.jobs.map((e) => {
                    const { name, startDate, endDate, title, location, bulletPoints } = e
                    
                    return (
                        <React.Fragment key={name}>
                        
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
                        </React.Fragment>
                    )
                })}
            </Grid>
            {/* </Slide> */}
            </Fade>
            <div ></div>
            </React.Fragment>
        )
        }
        </InView>
    )
}

export default WorkHistory