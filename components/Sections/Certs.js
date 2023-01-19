import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typograhpy from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import BadgeIcon from '@mui/icons-material/Badge';
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
    }
]

const Certs = (props) => {
    const { certsObj, certs, fWidth, title, controller } = props
    const [certRef, inView] = useInView({ threshold: 0.55 });

    useEffect(() => {
		if (!inView) return;
		setSection("certs");
	}, [inView]);

    return (
        <>
            <InView onChange={(e) => e && controller('certs', 0)} triggerOnce={true}>
                {({ ref }) => (
                    <>
                        <Fade in={inView && certs < 2} timeout={{ enter: 1000, exit: 100}}>
                            <Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									mb: { xs: 0, sm: 4 },
								}}
							>
                                <Typograhpy variant="h3" sx={{ py: 2, px: 2 }}>
									certifications
								</Typograhpy>
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
                            lg={6}
                            sx={{
                                width: "100%",
                                display: { xs: "none", sm: "flex" },
                                justifyContent: "space-evenly",
                                alignItems: "center",
                                flexWrap: "wrap",
                                flexDirection: "column-reverse",
                                height: "500px",
                                p: { sm: 5, lg: 0 },
                            }}
						>
                            {certsObj.map((e, i) => {
                                const { name, image, href, verf } = e

                                return (
                                    <Box
                                        key={name}
                                        sx={{
                                            transition:
                                                "transform 0.5s ease-in-out",
                                            "&:hover": {
                                                transform: "scale(1.2)",
                                            },
                                            m: 2,
                                        }}
									>
                                        <Fade in={inView && certs >= 1} timeout={{ enter: 1000 + i * 500 }}>
                                            <ButtonBase
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={`${href}/?input#mainContent_txtVerificationCode=${verf}`}
                                                sx={{ borderRadius: '10px' }}
                                                title={name}
                                                aria-label={name}
                                            >
                                                <Image
                                                    src={`/proj-pics/${image}`}
                                                    height="150"
                                                    width="150"
                                                    alt={name}
                                                />
                                            </ButtonBase>
                                        </Fade>
                                    </Box>
                                )
                            })}
                        </Grid>

                        <Fade
                            in={inView && certs < 2}
                            
                            timeout={{ enter: 1000, exit: 100 }}
                        >
                            <Grid
                                ref={ref}
                                item
                                id="certs-terminal"
                                xs={12}
                                lg={6}
                                sx={{
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
                                    pb: { xs: 3, lg: 0 },
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
                    </>
                )}
            </InView>
            <Box
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
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        certs: state.certs
    }
}

export default connect(mapStateToProps, { controller, setSection })(Certs)