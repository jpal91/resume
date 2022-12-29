import React, { useState, useRef } from 'react'
import Typed from 'react-typed'
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'

const Home = () => {
	const [typeState, setTypeState] = useState(1)
	let tRef = useRef()
	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<Grid xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Box sx={{ width: '100%' }}>
						<Typography variant='h1'>
							<span>$ </span>
							<Typed 
								// typedRef={(typed) => tRef = typed}
								ref={tRef}
								strings={[' cat names.txt | grep $MY_NAME | echo']}
								typeSpeed={50}
								onComplete={() => {
									tRef.current.typed.showCursor = false
									console.log(tRef)
								}}
							/>
						</Typography>
						<Typography variant='h1' sx={{ display: typeState < 2 ? 'none' : ''}}>$</Typography>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Home
