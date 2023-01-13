import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Box from '@mui/material/Box'
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

import Terminal from '../Terminal/Terminal';

import { setSection } from '../../actions';

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

const Splash = (props) => {
	const { splash, setSection } = props
    const [scrollId, setScrollId] = useState();
    const { ref, inView } = useInView();

    useEffect(() => {
		if (typeof window != undefined) {
			setScrollId(document.getElementById("skills-terminal"));
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
			<Grid
				item
				xs={12}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: { xs: "center", sm: "center" },
					position: "relative",
				}}
			>
				<div id="splash"></div>
				<Terminal
					contType={"splash"}
					contState={splash}
					fWidth={true}
					title={"~:bash"}
                    payload={payload}
				/>
				<Box
					ref={ref}
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						visibility: "hidden",
					}}
				>
					Center
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
					transition: "opacity 1s linear 1s",
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
				>
					<KeyboardDoubleArrowDownIcon
						sx={{
							fontSize: "84px",
							color: inView ? "white.main" : "blueGrey.400",
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