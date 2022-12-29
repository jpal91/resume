import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Home = () => {
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<Grid xs={12} sx={{ display: 'flex' }}>
					<Typography variant='h1'>$ cat names.txt | grep $MY_NAME | echo</Typography>
				</Grid>
			</Container>
		</>
	);
};

export default Home
