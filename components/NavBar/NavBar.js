import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AppBar from "@mui/material/AppBar"

const NavBar = (props) => {
    return (
        <AppBar sx={{ mt: 1, mb: 2, p: 1, borderRadius: { xs: '1.6px', m: '2px', l:'4px', xl: '8px' }, opacity: 0.7, '&:hover': { opacity: 1 } }}>
            <Grid container>
                <Grid item xs={3}>A</Grid>
                <Grid item xs={6}>B</Grid>
                <Grid item xs={3}>C</Grid>
            </Grid>
        </AppBar>
    )
}

export default NavBar