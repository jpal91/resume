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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@emotion/react';
import { InView, useInView } from "react-intersection-observer";

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';
import WorkHistory from '../components/Sections/WorkHistory'
import Education from '../components/Sections/Education';
import Projects from '../components/Sections/Projects';

import { setSplash, setBGColor } from '../actions'

const downButton = keyframes`
	from {
		transform: translateY(0px)
	}
	to {
		transform: translateY(25px)
	}
`

const downArrow = keyframes`
	from {
		opacity: 1;
		transform: translateY(0px);
	}

	to {
		opacity: 0.5;
		transform: translateY(25px);
	}
`


const Home = (props) => {
	const { splash, skills, icons, skillsObj, workObj, setBGColor, projObj } = props
	const [scrollId, setScrollId] = useState()
	const { ref, inView } = useInView()

	useEffect(() => {
		if (typeof window != undefined) {
			setScrollId(document.getElementById('skills-terminal'))
		}
	}, [])

	useEffect(() => {
		if (!inView) return
		setBGColor('blueGrey.400')
	}, [inView])

	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			{/* <Container sx={{ width: '100% !important', height: '100% !important', maxWidth: '100% !important', maxHeight: '100% !important', p: '0px !important', m: '0px !important', backgroundColor: bgColor, transition: 'background-color 1s linear', }}> */}
			{/* <Container sx={{ maxWidth: '100%', maxHeight: '100%' }}> */}
				{/* <NavBar /> */}
				<Grid container sx={{height: '100vh'}}>
					<Container sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
					<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
						<div id='splash' ref={ref}></div>
						<Terminal 
							outputs={[["Hello, my name is Justin"], ["Welcome to my Resume"]]}
							cmds={[[" cat names.txt | grep $MY_NAME | echo"], ["echo $MY_GREETING"]]}
							contType={'splash'}
							contState={splash}
							fWidth={true}
							title={'~:bash'}
						/>
						
					</Grid>
					<Grid item xs={12} sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', opacity: splash >= 2 ? 1 : 0, transition: 'opacity 1s linear 1s' }}>
						<ButtonBase disableRipple onClick={() => scrollId.scrollIntoView({ block: 'center', behavior: 'smooth', })} >
							<KeyboardDoubleArrowDownIcon sx={{ fontSize: '84px', color: inView ? 'white.main' : 'blueGrey.400', animation: splash >= 2 && `${downArrow} 2s ease-in alternate infinite`, transition: 'color 1s linear', }}/>
						</ButtonBase>
					</Grid>
					</Container>
				</Grid>
				<Grid container sx={{ display: 'flex', minHeight: '100vh', alignContent: 'flex-start', alignItems: 'center'}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3}}>
					<Skills icons={icons} skillsObj={skillsObj}/>
					</Container>
				</Grid>
				<Grid container sx={{ minHeight: '100vh', backgroundColor: 'white.main'}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3}}>
						<WorkHistory workInfo={workObj}/>
					</Container>
				</Grid>
				<Grid container sx={{ backgroundColor: 'grey.400', minHeight: '50vh' }}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3}}>
						<Education />
					</Container>
				</Grid>
				
				<Grid container sx={{  backgroundColor: 'grey.600', minHeight: '100vh', backgroundImage: 'linear-gradient(to bottom right, transparent 49.9%, #03a9f4 50%), linear-gradient(to top left, transparent 49.9%, #78909c 0)',}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 5,}}>
					<Projects projects={projObj}/>
					</Container>
				</Grid>
			{/* </Container> */}
			{/* </Container> */}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		splash: state.splash,
		skills: state.skills,
		bgColor: state.bgColor
	}
}

export const getStaticProps = async () => {
	const dirPath = path.join(process.cwd(), 'public', 'svg-icons')
	const skillsJson = path.join(process.cwd(), 'helpers', 'skills.json')
	const workJson = path.join(process.cwd(), 'helpers', 'work-history.json')
	const projectsJson = path.join(process.cwd(), 'helpers', 'projects.json')

	const icons = await fs.readdir(dirPath)
	const skillsJsonFile = await fs.readFile(skillsJson).then((res) => res)
	const workJsonFile = await fs.readFile(workJson).then((res) => res)
	const projectJsonFile = await fs.readFile(projectsJson).then((res) => res)
	
	const skillsJsonParsed = JSON.parse(skillsJsonFile)
	const workJsonParsed = JSON.parse(workJsonFile)
	const projectJsonParsed = JSON.parse(projectJsonFile)

	return {
		props: {
			icons: icons,
			skillsObj: skillsJsonParsed,
			workObj: workJsonParsed,
			projObj: projectJsonParsed
		}
	}
}

export default connect(mapStateToProps, { setSplash, setBGColor } )(Home)
