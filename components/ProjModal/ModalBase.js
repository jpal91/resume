import Modal from '@mui/material/Modal'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import Divider from '@mui/material/Divider'
import CloseIcon from '@mui/icons-material/Close';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import LinkIcon from '@mui/icons-material/Link';


const ModalBase = (props) => {
    const { open, id, name, description, startDate, endDate, website, github, handleClose, techUsed } = props

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Card
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    boxShadow: 24,
                }}
            >
                <Grid container fluid sx={{ display: 'flex' }}>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, mr: 1.5, mt: 1}}>
                        <ButtonBase onClick={handleClose} sx={{ borderRadius: '100%'}}>
                            <CloseIcon />
                        </ButtonBase>
                    </Grid>
                    <Grid container item xs={12} sx={{ display: 'flex', px: 2, pb: 2 }}>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', borderBottom: '1px solid', borderColor: 'primary.main', pb: 1 }} >
                            <Typography variant='modalHeader'>{name}</Typography>
                            <Typography variant='modalSubHeader'>{description}</Typography>
                        </Grid>
                        <Grid container item xs={12} sx={{ display: 'flex', mt: 2, gap: 1, justifyContent: 'center' }}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                                <Typography variant='modalSubHeader'>Description</Typography>
                                <FormatAlignCenterIcon sx={{ color: 'primary.main', mx: 1}} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', px: 2}}>
                                <Typography variant='modalBody' >This is a description of what the app is and what it does</Typography>
                            </Grid>
                            <Divider sx={{ width: '80%', color: 'blueGrey.600' }}/>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                                <Typography variant='modalSubHeader'>Tech Used</Typography>
                                <BuildCircleIcon sx={{ color: 'primary.main', mx: 1 }}/>
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-around'}}>
                                {techUsed.map((e, i) => (
                                    <>
                                    {i != 0 && <Typography variant='modalBody'>|</Typography>}
                                    <Typography variant='modalBody' sx={{ '&:hover': { color: 'primary.main' }}}>{e}</Typography>
                                    
                                    </>
                                ))}
                            </Grid>
                            <Divider sx={{ width: '80%', color: 'blueGrey.600' }}/>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Typography variant='modalSubHeader'>Project Life</Typography>
                                <AccessTimeIcon sx={{ color: 'primary.main', mx: 1}} />
                            </Grid>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', columnGap: 1 }}>
                                <Typography variant='modalBody'>
                                    {startDate}
                                    
                                </Typography>
                                <ArrowForwardIcon sx={{ color: 'primary.main'}} />
                                <Typography variant='modalBody' sx={{ color: 'primary.main'}}>{endDate ? endDate : 'Today'}</Typography>
                            </Grid>
                            <Divider sx={{ width: '80%', color: 'blueGrey.600' }}/>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center'}}>
                                <Typography variant='modalSubHeader'>Links</Typography>
                                <LinkIcon sx={{ color: 'primary.main', mx: 1}} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    )
}


export default (ModalBase)