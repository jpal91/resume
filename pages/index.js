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
	const { splash, skills, icons, skillsObj } = props

	useEffect(() => {
		console.log(skillsObj)
	}, [skillsObj])

	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid container sx={{height: '100vh'}}>
					<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<Terminal 
							outputs={[["Hello, my name is Justin"], ["Welcome to my Resume"]]}
							cmds={[[" cat names.txt | grep $MY_NAME | echo"], ["echo $MY_GREETING"]]}
							contType={'splash'}
							contState={splash}
							fWidth={true}
							title={'~:bash'}
						/>

					</Grid>
					<Grid item xs={12} sx={{ display: 'flex'}}>
						Hello
					</Grid>
				</Grid>
				<Grid container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 20}}>
					<Skills icons={icons} skillsObj={skillsObj}/>
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
	const jsonPath = path.join(process.cwd(), 'helpers', 'skills.json')

	const icons = await fs.readdir(dirPath)
	const jsonFile = await fs.readFile(jsonPath).then((res) => res)
	const jsonParsed = JSON.parse(jsonFile)

	return {
		props: {
			icons: icons,
			skillsObj: jsonParsed
		}
	}
}

export default connect(mapStateToProps, { setSplash } )(Home)
