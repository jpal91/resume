import React, { useState, useRef, useEffect } from 'react'
import Typed from 'react-typed'
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';

const Home = () => {
	const [typeState, setTypeState] = useState(1)
	const [fade, setFade] = useState(false)
	let [tRef1, tRef2] = [useRef(), useRef()]
	const cb = () => setFade(true)
	
	
	
	useEffect(() => {
		
		if (typeState == 1) {
			return
		}
		
		const conductor = (ts) => {
			switch(ts) {
				case 1:
					tRef1.current.toggle()
					break;
				case 2:
					tRef2.current.toggleBlinking()
					setTimeout(() => tRef2.current.start(), 1000)
					break;
			}
		}
		conductor(typeState)
	}, [typeState])
	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
						<Typography variant='h1'>
							<span>$ </span>
							<Typed 
								typedRef={(typed) => tRef1.current = typed}
								// autoInsertCss
								strings={[' cat names.txt | grep $MY_NAME | echo']}
								typeSpeed={50}
								onComplete={() => {
									setTimeout(() => {
										setTypeState(2)
										tRef1.current.cursor.hidden = true
									}, 2000)
									// setTypeState(2)
									console.log(tRef1)
								}}
								onStringTyped={() => console.log('here')}
							/>
						</Typography>
						<Typography variant='h1' sx={{ display: typeState < 2 ? 'none' : ''}}>Hello, my name is Justin</Typography>
						<Typography variant='h1' sx={{ display: typeState < 2 ? 'none' : ''}}>
							<span>$ </span>
							<Typed 
								typedRef={(typed) => tRef2.current = typed}
								strings={['echo $MY_GREETING']}
								stopped
								startDelay={1000}
								typeSpeed={50}
								onStringTyped={() => {
									setTimeout(() => {
										tRef2.current.cursor.hidden = true
										setTypeState(3)
										setFade(true)
									}, 2000)
								}}
							/>
						</Typography>
						<Typography variant='h1' sx={{ display: typeState < 3 ? 'none' : ''}}>Welcome to my Resume</Typography>
					</Box>
					<Box sx={{ mt: 100 }}>
						<Fade in={fade} timeout={ {enter: 1000} }><Typography id='test'>Test</Typography></Fade>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Home
