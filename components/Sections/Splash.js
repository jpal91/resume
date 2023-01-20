import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Typed from "react-typed";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

import Terminal from '../Terminal/Terminal';

import { setSection } from '../../actions';

const fadeOut = keyframes`
	0% {
		opacity: 1;

	}

	90% {
		max-height: 100%
	}

	100% {
		opacity: 0;
		max-height: 0%;
	}
`

const downArrow = keyframes`
	from {
		opacity: 1;
		transform: translateY(0px);
	}

	to {
		opacity: 0.5;
		transform: translateY(25px);
	}
`;

const payload = [
    {
        type: 'cmd',
        values: [" echo Hello, my name is $(grep '^J.*n$' names.txt)"],
        stage: 0
    },
    {
        type: 'output',
        values: ["Hello, my name is Justin"],
        stage: 0
    },
    {
        type: 'cmd',
        values: ["echo $MY_GREETING"],
        stage: 1
    },
    {
        type: 'output',
        values: ["Welcome to my Resume"],
        stage: 1
    },

]

const aboutMe = [
	"Cloud Developer",
	"Passionate About Tech",
	"Excited to Learn",
	"Experienced in Web Dev",
	"Travel Enthusiast",
	"Dogs &gt; Cats",
	"Sales Expert",
	"Enjoys Solving Puzzles",
	"Wants To Automate Everything",
	"Mountains &gt; Beach",
]

const Splash = (props) => {
	const { splash, setSection } = props
    const [scrollId, setScrollId] = useState();
    const { ref, inView } = useInView();
	const tRef = useRef()

    useEffect(() => {
		if (typeof window != undefined) {
			setScrollId(document.getElementById("certs-vb"));
		}

		const timeout = setTimeout(() => {
			tRef.current.start()
		}, 15000)

		return () => {
			clearTimeout(timeout)
		}
	}, []);

    useEffect(() => {
        if (!inView) return
        setSection('home')
    }, [inView])
    
    return (
		<Container
			sx={{
				display: "flex",
				width: "100%",
				height: "100%",
				flexDirection: "column",
			}}
		>
				<Box
					ref={ref}
					sx={{
						position: "absolute",
						top: "20%",
						left: "50%",
						visibility: "hidden",
					}}
				>
					Center
				</Box>
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: { xs: "center", sm: "center" },
					position: "relative",
					// animation: splash >= 2 && `${fadeOut} 1s linear 1s forwards`,
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: { xs: 'center', sm: 'center' }, width: '100%', animation: splash >= 2 && `${fadeOut} 1s linear 1s forwards`, }}>
				<Terminal
					contType={"splash"}
					contState={splash}
					fWidth={true}
					title={"~:bash"}
                    payload={payload}
				/>
				</Box>
			
			<Box sx={{ display: 'flex', height: '100%', minWidth: '92.5%', animation: splash >= 2 && `${fadeOut} 1s reverse 2.5s forwards`, opacity: 0, justifyContent: 'center', alignItems: 'center' }}>
				<Typography variant='h1' sx={{ fontSize: {xs: '80px', sm: '60px', lg: '50px'}, color: 'lightBlue.200', backgroundColor: 'grey.800', p: 3, borderRadius: '8px', minWidth: '100%' }}>
					<Typography variant='h1' component="span" sx={{ display: { xs: 'none', sm: 'initial' }, fontSize: 'inherit', color: 'lightGreen.A400' }}>$ </Typography>
					<Typography variant='h1' component="span" sx={{ display: { xs: 'none', sm: 'initial' }, fontSize: 'inherit', color: 'white.main' }}>ABOUT_ME= </Typography>
					<Typed 
						typedRef={(typed) => tRef.current = typed}
						// strings={["Welcome to my Resume"]}
						strings={aboutMe}
						typeSpeed={75}
						// startDelay={15000}
						smartBackspace
						backSpeed={75}
						backDelay={1000}
						loop
						stopped
					/>
				</Typography>
			</Box>
			</Grid>
			<Grid
				item
				xs={12}
				sx={{
					display: { xs: "none", sm: "flex" },
					justifyContent: "flex-start",
					flexDirection: "column",
					alignItems: "center",
					opacity: splash >= 2 ? 1 : 0,
					transition: "opacity 1s linear 2.5s",
				}}
			>
				<ButtonBase
					disableRipple
					onClick={() =>
						scrollId.scrollIntoView({
							block: "center",
							behavior: "smooth",
						})
					}
					aria-label="Scroll down"
				>
					<KeyboardDoubleArrowDownIcon
						sx={{
							fontSize: "84px",
							color: inView ? "blueGrey.800" : "blueGrey.400",
							animation:
								splash >= 2 &&
								`${downArrow} 2s ease-in alternate infinite`,
							transition: "color 1s linear",
						}}
					/>
				</ButtonBase>
			</Grid>
		</Container>
	);
};

const mapStateToProps = (state) => {
    return {
        splash: state.splash
    }
}

export default connect(mapStateToProps, { setSection })(Splash);


    // {
    //     type: 'ml',
    //     values:
    //         `|||||    ||||||| ||||||| ||   || ||||   |||| |||||||
    //         ||   ||  ||      ||      ||   || || || || || ||
    //         ||   ||  ||      ||      ||   || ||  |||  || ||
    //         ||||||   ||||||| ||||||| ||   || ||       || |||||||
    //         ||   ||  ||           || ||   || ||       || ||
    //         ||    || ||||||| ||||||| ||||||| ||       || |||||||`,
    //     stage: 2
    // }