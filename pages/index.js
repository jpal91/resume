import React, { useEffect } from 'react'
import { promises as fs } from "fs";
import path from "path";
import { connect } from 'react-redux';
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';

import { setSplash } from '../actions'

const Home = (props) => {
	const { splash, skills, icons } = props

	useEffect(() => {
		console.log(icons)
	}, [icons])

	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
					<Terminal 
						outputs={[["Hello, my name is Justin"], ["Welcome to my Resume"]]}
						cmds={[[" cat names.txt | grep $MY_NAME | echo"], ["echo $MY_GREETING"]]}
						contType={'splash'}
						contState={splash}
						fWidth={true}
						title={'~:bash'}
					/>

				</Grid>
				<Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 20}}>
					<Skills icons={icons}/>
				</Grid>
			</Container>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		splash: state.splash,
		skills: state.skills
	}
}

export const getStaticProps = async () => {
	const dirPath = path.join(process.cwd(), 'public', 'svg-icons')

	const icons = await fs.readdir(dirPath)

	return {
		props: {
			icons: icons
		}
	}
}

export default connect(mapStateToProps, { setSplash } )(Home)
