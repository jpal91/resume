import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import ButtonBase from '@mui/material/ButtonBase'

import ModalBase from './ModalBase'

const ProjModal = (props) => {
    const { id, name, description, startDate, endDate, website, github, techUsed, subHeader} = props
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    return (
        <>
            <Paper sx={{ backgroundColor: 'inherit', border: '1px solid', borderColor: 'white.main', my: 1, '&:hover': { opacity: 0.5 } }}>
                <ButtonBase onClick={handleOpen} sx={{ p: 1.5, '&:active': { color: 'white.main' }, '&:focus': { color: 'white.main' }, }} >
                    <Typography variant='cardBody'>Learn More</Typography>
                </ButtonBase>
            </Paper>
            <ModalBase 
                id={id}
                name={name}
                description={description}
                startDate={startDate}
                endDate={endDate}
                website={website}
                github={github}
                handleClose={handleClose}
                open={open}
                techUsed={techUsed}
                subHeader={subHeader}
            />
        </>
    )
}


export default (ProjModal)