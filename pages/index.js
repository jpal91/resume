import React, { useState, useRef, useEffect } from 'react'
import Typed from 'react-typed'
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'

const Home = () => {
	const [fade, setFade] = useState(false)
	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Terminal />
					<Box sx={{ mt: 100 }}>
						<Fade in={fade} timeout={ {enter: 1000} }><Typography id='test'>Test</Typography></Fade>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Home
