import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box'

const Home = () => {
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<Grid xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					<Box>
						<Typography variant='h1'>$ cat names.txt | grep $MY_NAME | echo</Typography>
						<Typography variant='h1'>Hello, my name is Justin Pallansch</Typography>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Home
