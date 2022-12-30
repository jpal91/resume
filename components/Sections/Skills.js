import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Fade from '@mui/material/Fade'

const Skills = (props) => {
    return (
        <>
            <Fade in={props.inView} timeout={ {enter: 1000} } >
            <Card sx={{ borderColor: 'blue', borderWidth: '5px', borderStyle: 'solid', width: '100%', height: '50px' }}>
                x
            </Card>
            </Fade>
        </>
    )
}

export default Skills