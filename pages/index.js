import React, { useState, useEffect } from 'react'
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';
import { InView } from 'react-intersection-observer'

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';

const Home = () => {
	const [inView, setInView] = useState(false)

	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
					<Terminal />

				</Grid>
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
					
					<InView onChange={setInView} triggerOnce={true}>
						{ ({ ref, entry }) => {
							console.log(inView)
							return (
							
							
							<Box ref={ref}>
								{/* <Fade in={inView} timeout={ {enter: 1000} } > */}
									{/* <> */}
									<Skills inView={inView}/>
									{/* <Typography id='test' >Test</Typography> */}
									{/* </> */}
								{/* </Fade> */}
							</Box>
							
							)
						}}
					</InView>
				</Grid>
			</Container>
		</>
	);
};

export default Home
