import React, { useState, useRef, useEffect } from 'react'
import Typed from 'react-typed'
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade';
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Bash from '../components/Splash/Bash'
import NavBar from '../components/NavBar/NavBar'

const Home = () => {
	const [typeState, setTypeState] = useState(0)
	const [fade, setFade] = useState(false)
	let [tRef1, tRef2] = [useRef(), useRef()]
	const cb = () => setFade(true)
	
	useEffect(() => {
		setTypeState(1)
	}, [])
	
	// useEffect(() => {
		
	// 	if (typeState <= 1) {
	// 		return
	// 	}
		
	// 	const conductor = (ts) => {
	// 		switch(ts) {
	// 			case 1:
	// 				tRef1.current.toggle()
	// 				break;
	// 			case 2:
	// 				tRef2.current.toggleBlinking()
	// 				setTimeout(() => tRef2.current.start(), 1000)
	// 				break;
	// 		}
	// 	}
	// 	conductor(typeState)
	// }, [typeState])
	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Card 
						raised={true}
						sx={{ 
							width: { xs: '100%', xl: '75%'}, 
							display: 'flex', 
							flexDirection: 'column',
							backgroundColor: 'primary.dgrey',
							minHeight: '225px',
							mt: 2,
							borderRadius: '4px'
						}}
						>
						<CardHeader sx={{ backgroundColor: 'primary.lgrey' }}>
							
						</CardHeader>
						<CardContent>
						<Bash 
							strings={[' cat names.txt | grep $MY_NAME | echo']}
							setState={setTypeState}
							tState={typeState}
							output={'Hello, my name is Justin'}
							order={1}
						/>
						{/* <Typography variant='h1'>
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
						</Typography> */}
						{/* <Typography variant='h1' sx={{ display: typeState < 2 ? 'none' : ''}}>Hello, my name is Justin</Typography> */}
						<Bash 
							strings={['echo $MY_GREETING']}
							setState={setTypeState}
							tState={typeState}
							output={'Welcome to my Resume'}
							order={2}
						/>
						{/* <Typography variant='h1' sx={{ display: typeState < 2 ? 'none' : ''}}>
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
						<Typography variant='h1' sx={{ display: typeState < 3 ? 'none' : ''}}>Welcome to my Resume</Typography> */}
						</CardContent>
					</Card>
					<Box sx={{ mt: 100 }}>
						<Fade in={fade} timeout={ {enter: 1000} }><Typography id='test'>Test</Typography></Fade>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Home
