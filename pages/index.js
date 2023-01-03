import React, { useEffect, useState } from 'react'
import { promises as fs } from "fs";
import path from "path";
import { connect } from 'react-redux';
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { keyframes } from '@emotion/react';

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';
import WorkHistory from '../components/Sections/WorkHistory'

import { setSplash } from '../actions'

const downButton = keyframes`
	from {
		transform: translateY(0px)
	}
	to {
		transform: translateY(25px)
	}
`

const Home = (props) => {
	const { splash, skills, icons, skillsObj } = props
	const [scrollId, setScrollId] = useState()

	useEffect(() => {
		if (typeof window != undefined) {
			setScrollId(document.getElementById('skills-terminal'))
		}
	}, [])

	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Container sx={{ width: '100%' }}>
				<NavBar />
				<Grid container sx={{height: '100vh'}}>
					<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<Terminal 
							outputs={[["Hello, my name is Justin"], ["Welcome to my Resume"]]}
							cmds={[[" cat names.txt | grep $MY_NAME | echo"], ["echo $MY_GREETING"]]}
							contType={'splash'}
							contState={splash}
							fWidth={true}
							title={'~:bash'}
						/>

					</Grid>
					<Grid item xs={12} sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'center'}}>
						<Paper variant='downButton' sx={{ animation: `${downButton} 1s linear infinite alternate`}}>
							<ButtonBase onClick={() => scrollId.scrollIntoView({ block: 'center', behavior: 'smooth' })} sx={{ height: '100%', width: '100%', borderRadius: '100%'}}>
								<KeyboardDoubleArrowDownIcon sx={{ fontSize: '64px', color: 'blueGrey.500' }}/>
							</ButtonBase>
						</Paper>
					</Grid>
				</Grid>
				<Grid container sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', 
				pb: 50
				}}>
					<Skills icons={icons} skillsObj={skillsObj}/>
				</Grid>
				<Grid container sx={{ display: 'flex', mb: 40 }}>
					<WorkHistory />
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
