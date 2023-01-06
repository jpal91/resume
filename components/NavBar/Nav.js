import React, { useEffect } from "react"
import { connect } from "react-redux"
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Slide from '@mui/material/Slide'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import SvgIcon from '@mui/material/SvgIcon'
import useScrollTrigger from '@mui/material/useScrollTrigger';

import Logo from './Logo'


const Nav = (props) => {
    const trigger = useScrollTrigger()
    const { section } = props
    const sections = ['home', 'skills', 'work history', 'education', 'projects', 'contact']

    useEffect(() => {
        // console.log(section)
    }, [section])

    return (
        <>

        <Slide appear={false} direction='down' in={trigger && section != 'footer'}>
            <AppBar sx={{ mt: 1, width: '80%', display: 'center', mx: 'auto', borderRadius: '10px', backgroundColor: 'primary.main' }}>
                <Toolbar sx={{ width: '100%' }}>
                    <Grid container fluid='true'>
                    <Grid item xs={1}>
                    <SvgIcon  component={Logo} sx={{ width: '50px', height: '50px', color: 'white.main', boxShadow: "4px 4px 5px 2px rgb(0 0 0 / 20%)", transition: 'color 1s linear'}} viewBox='0 0 20 20'/>
                    </Grid>
                    <Grid item xs={11} sx={{ display: 'flex', alignItems: 'center', columnGap: 5.5 }}>
                        {sections.map((e) => (
                            <Typography key={e} variant='navItem' sx={{ color: section == e && "lightGreen.A400", textDecoration: section == e && 'underline', textDecorationThickness: '5px', textUnderlineOffset: '7px'}}>
                                <Typography variant='navItem' component={'span'} sx={{ visibility: section != e && 'hidden', color: 'lightGreen.A400'}}>{`>> `}</Typography>
                                {e}
                            </Typography>
                        ))}
                    </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Slide>

        </>
    )
}

const mapStateToProps = (state) => {
    return {
        section: state.section
    }
}

export default connect(mapStateToProps)(Nav)