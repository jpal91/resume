import React from 'react'
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import SnackBar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import BadgeIcon from '@mui/icons-material/Badge';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { InView, useInView } from "react-intersection-observer";

import Terminal from "../Terminal/Terminal";

import {
	controller,
	setSection,
} from "../../actions";

const payload = [
    {
        type: 'cmd',
        values: ['chmod +x certs.sh'],
        stage: 0
    },
    {
        type: 'output',
        values: [],
        stage: 0,
    },
    {
        type: 'cmd',
        values: ['source ./certs.sh'],
        stage: 1
    },
    {
        type: 'output',
        values: ['AWS Certified Cloud Practitioner'],
        stage: 1
    }
]

const Certs = (props) => {
    const { certsObj, certs, fWidth, title, controller, setSection } = props
    const [certRef, certInView] = useInView({ threshold: 0.55 });
    const [open, setOpen] = useState(false)
    
    const handleClick = (verf) => {
        navigator.clipboard.writeText(verf)
        setOpen(true)
    }
    
    const handleClose = (event, reason) => {
        if (reason == 'clickaway') return
        setOpen(false)
    }

    useEffect(() => {
        if (!certInView) return;
		setSection("certs");
	}, [certInView]);

    return (
        <>
            <InView onChange={(e) => e && controller('certs', 0)} triggerOnce={true}>
                {({ ref, inView }) => (
                    <>
                        <Fade in={inView} timeout={{ enter: 1000, exit: 100}}>
                            <Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									mb: { xs: 0, sm: 2 },
								}}
							>
                                <Typography variant="h3" sx={{ py: 2, px: 2 }}>
									certifications
								</Typography>
                                <Box
									sx={{
										display: "flex",
										borderRadius: "100%",
										border: `${3 / 16}rem solid`,
										borderColor: "primary.main",
										p: 1,
									}}
								>
									<BadgeIcon
										alt="Badge Icon"
										sx={{
											color: "primary.main",
											fontSize: "40px",
										}}
									/>
								</Box>
                            </Grid>
                        </Fade>
                        
                        <Grid
							item
							xs={12}
							sx={{
								display: "flex",
								mt: { xs: 1, md: 0, lg: 2 },
								flexDirection: { xs: "column", lg: "row" },
							}}
						>

                            <Grid
                                item
                                xs={12}
                                lg={6}
                                sx={{
                                    width: "100%",
                                    display: { xs: "none", sm: "flex" },
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                    flexDirection: "column-reverse",
                                    height: "500px",
                                    p: { sm: 2, lg: 0 },
                                }}
                            >
                                {certsObj.map((e, i) => {
                                    const { name, image, href, verf } = e

                                    return (
                                        <Box
                                            key={name}
                                        >
                                            <Fade in={inView && certs > 1} timeout={{ enter: 1000 + i * 500 }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                    <ButtonBase
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href={href}
                                                        sx={{ borderRadius: '10px', transition: 'transform 0.5s ease-in-out', '&:hover': { transform: 'scale(1.05)' }, mb: 1 }}
                                                        title={name}
                                                        aria-label="Verify certification"
                                                    >
                                                        <Image
                                                            src={`/proj-pics/${image}`}
                                                            height="250"
                                                            width="250"
                                                            alt={name}
                                                        />
                                                        
                                                    </ButtonBase>
                                                    <ButtonBase aria-label="Copy to clipboard" title="Copy to clipboard" onClick={() => handleClick(verf)} sx={{ borderRadius: '10px' }}>
                                                        <Typography variant='h6'>
                                                            {`Verification #: ${verf} `}
                                                            <ContentCopyIcon sx={{ fontSize: 'inherit' }}/>
                                                        </Typography>
                                                    </ButtonBase>
                                                </Box>
                                            </Fade>
                                        </Box>
                                    )
                                })}
                            </Grid>

                            <Fade
                                in={inView}
                                
                                timeout={{ enter: 1000, exit: 100 }}
                            >
                                <Grid
                                    ref={ref}
                                    item
                                    id="certs-terminal"
                                    xs={12}
                                    lg={6}
                                    sx={{
                                        display: 'flex',
                                        width: "100%",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderLeft: {
                                            xs: "none",
                                            lg: `${3 / 16}rem solid`,
                                        },
                                        borderColor: {
                                            sm: "primary.main",
                                            lg: "primary.main",
                                        },
                                        height: "500px",
                                        pt: { xs: 3, lg: 0 },
                                    }}
                                >
                                    <Terminal
                                        contType='certs'
                                        contState={certs}
                                        fWdith={fWidth}
                                        title={title}
                                        payload={payload}
                                    />
                                </Grid>
                            </Fade>
                        </Grid>
                    </>
                )}
            </InView>
            <Box
				id='certs-vb'
                ref={certRef}
				sx={{
					position: "absolute",
					height: "100%",
					width: "100%",
					visibility: "hidden",
					top: 0,
					left: 0,
				}}
			>
				Center
			</Box>
            <SnackBar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert severity="info" variant='filled' sx={{ backgroundColor: 'primary.main' }}>Copied to clipboard</Alert>
            </SnackBar>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        certs: state.certs
    }
}

export default connect(mapStateToProps, { controller, setSection })(Certs)