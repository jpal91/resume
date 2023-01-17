import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image from 'next/image'
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Link from '@mui/material/Link'
import SvgIcon from "@mui/material/SvgIcon";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { InView, useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

import { setSection } from "../../actions";
import Logo2 from '../NavBar/Logo2'

const slideIn = keyframes`
    from {
        transform: translateX(-25px);
        opacity: 0;
    }

    to {
        transform: translateX(0px);
        opacity: 1;
    }
`;

const Contact = (props) => {
	const { setSection }= props
    const [inView, setInView] = useState(false);
    const [contactRef, contactInView] = useInView({ threshold: 0.8 })
    const width = 400

    useEffect(() => {
        if (!contactInView) return
        setSection('contact')
    }, [contactInView])

	return (
		<>
        <InView onChange={setInView} triggerOnce={true}>
			{({ ref }) => (
				<>
					<Fade in={inView} timeout={{ enter: 1000 }}>
						<Grid
							
							item
							xs={12}
							sx={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "row",
								alignItems: "center",
								mt: 5,
							}}
						>
							<Typography
								variant="h3"
								sx={{ color: "white.main", py: 2, px: 2 }}
							>
								contact me
							</Typography>
							<Box
								sx={{
									display: "flex",
									borderRadius: "100%",
									border: `${3 / 16}rem solid`,
									borderColor: "white.main",
									p: 1,
								}}
							>
								<ConnectWithoutContactIcon
									sx={{
										color: "white.main",
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
							justifyContent: "center",
							columnGap: 5,
							mt: 5,
						}}
					>
						<ButtonBase aria-label="LinkedIn" title="LinkedIn">
                            <Link color='inherit' href='https://www.linkedin.com/in/justinpallansch/' target='_blank' rel='noopener noreferrer'>
                                <LinkedInIcon
                                    sx={{
                                        color: "white.main",
                                        animation:
                                            inView &&
                                            `${slideIn} 1s ease-in forwards`,
                                        fontSize: "64px",
                                        opacity: 0,
                                        "&:hover": {
                                            color: 'primary.main'
                                        },
                                        transition: 'color 0.5s ease-out'
                                    }}
                                />
                            </Link>
						</ButtonBase>
						<ButtonBase sx={{ borderRadius: '100%' }} aria-label="GitHub" title="GitHub">
                            <Link color='inherit' href='https://github.com/jpal91' target='_blank' rel='noopener noreferrer'>
                                <GitHubIcon
                                    sx={{
                                        color: "white.main",
                                        animation:
                                            inView &&
                                            `${slideIn} 1s ease-in 0.5s forwards`,
                                        fontSize: "64px",
                                        opacity: 0,
                                        "&:hover": {
                                            color: 'primary.main'
                                        },
                                        transition: 'color 0.5s ease-out'
                                    }}
                                />
                            </Link>
						</ButtonBase>
						<ButtonBase sx={{ borderRadius: '5%' }} aria-label="Email" title="Email">
                            <Link color='inherit' href='mailto: pallanschja@gmail.com?subject=Feedback' target='_blank' rel='noopener noreferrer'>
                                <EmailIcon
                                    sx={{
                                        color: "white.main",
                                        animation:
                                            inView &&
                                            `${slideIn} 1s ease-in 1s forwards`,
                                        fontSize: "64px",
                                        opacity: 0,
                                        "&:hover": {
                                            color: 'primary.main'
                                        },
                                        transition: 'color 0.5s ease-out'
                                    }}
                                />
                            </Link>
						</ButtonBase>
					</Grid>
                    <Grid ref={ref} item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 15 }}>
                        {/* <Fade in={inView} timeout={{ enter: 5000 }}> */}
                        {/* <Image 
                            src='/proj-pics/logo-cloud.svg'
                            width='400'
                            height='240'
                            alt='logo'
                        /> */}
                        	<SvgIcon
								component={Logo2}
                                alt="Website Logo"
								sx={{
									// width: "50px",
									// height: "30px",
									width: `${width}px`,
									height: `${width * 0.6}px`,
									color: "white.main",
									// boxShadow:
									// 	"4px 4px 5px 2px rgb(0 0 0 / 20%)",
									transition: "color 1s linear",
									filter: 'drop-shadow(3px 5px 2px rgb(0 0 0 / 0.4))'
								}}
								viewBox="0 0 20 12.12"
							/>
                        {/* </Fade> */}
                    </Grid>
				</>
			)}
		</InView>
        <Box ref={contactRef} sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', visibility: 'hidden'}}>Center</Box>
        </>
	);
};

export default connect(null, { setSection })(Contact)
