import React, { useEffect, useState } from 'react'
import { promises as fs } from "fs";
import path from "path";
import { connect } from 'react-redux';
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { keyframes } from '@emotion/react';
import { InView, useInView } from "react-intersection-observer";

import NavBar from '../components/NavBar/NavBar'
import Nav  from '../components/NavBar/Nav';
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';
import WorkHistory from '../components/Sections/WorkHistory'
import Education from '../components/Sections/Education';
import Projects from '../components/Sections/Projects';
import Contact from '../components/Sections/Contact';

import { setSplash, setBGColor, setSection } from '../actions'

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
	const { splash, skills, icons, skillsObj, workObj, setBGColor, projObj, setSection } = props
	const [scrollId, setScrollId] = useState()
	const [homeScrollId, setHomeScrollId] = useState()
	const { ref, inView } = useInView()
	const [footRef, footInView] = useInView({ threshold: 0.8 })

	useEffect(() => {
		if (typeof window != undefined) {
			setScrollId(document.getElementById('skills-terminal'))
			setHomeScrollId(document.getElementById('home-sec'))
		}
	}, [])

	useEffect(() => {
		if (footInView) {
			setSection('footer')
		} else if (inView) {
			setSection('home', inView)
			setBGColor('blueGrey.400')
		}
	}, [inView, footInView])

	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			{/* <Container sx={{ width: '100% !important', height: '100% !important', maxWidth: '100% !important', maxHeight: '100% !important', p: '0px !important', m: '0px !important', backgroundColor: bgColor, transition: 'background-color 1s linear', }}> */}
			{/* <Container sx={{ maxWidth: '100%', maxHeight: '100%' }}> */}
				{/* <NavBar /> */}
				<Nav />
				<Grid id='home-sec' container sx={{height: '100vh'}}>
					<Container sx={{ display: 'flex', width: '100%', height: '100%', flexDirection: 'column'}}>
					<Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: {xs: 'center', sm: 'center'}, position: 'relative'}}>
						<div id='splash'></div>
						<Terminal 
							outputs={[["Hello, my name is Justin"], ["Welcome to my Resume"]]}
							cmds={[[" echo Hello, my name is $(grep '^J.*n$' names.txt)"], ["echo $MY_GREETING"]]}
							contType={'splash'}
							contState={splash}
							fWidth={true}
							title={'~:bash'}
						/>
						<Box ref={ref} sx={{ position: 'absolute', top: '50%', left: '50%', visibility: 'hidden'}}>Center</Box>
					</Grid>
					<Grid item xs={12} sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'center', opacity: splash >= 2 ? 1 : 0, transition: 'opacity 1s linear 1s' }}>
						<ButtonBase disableRipple onClick={() => scrollId.scrollIntoView({ block: 'center', behavior: 'smooth', })} >
							<KeyboardDoubleArrowDownIcon sx={{ fontSize: '84px', color: inView ? 'white.main' : 'blueGrey.400', animation: splash >= 2 && `${downArrow} 2s ease-in alternate infinite`, transition: 'color 1s linear', }}/>
						</ButtonBase>
					</Grid>
					</Container>
				</Grid>
				<Grid id='skills-sec' container sx={{ display: 'flex', minHeight: '100vh', alignContent: 'flex-start', alignItems: 'center'}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3, position: 'relative'}}>
					<Skills icons={icons} skillsObj={skillsObj}/>
					</Container>
				</Grid>
				<Grid id='workhistory-sec' container sx={{ minHeight: '100vh', backgroundColor: 'white.main', alignContent: 'flex-start'}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3, position: 'relative'}}>
						<WorkHistory workInfo={workObj}/>
					</Container>
				</Grid>
				<Grid id='education-sec' container sx={{ backgroundColor: 'grey.400', minHeight: '50vh', display: 'flex', alignContent: 'flex-start' }}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3, position: 'relative'}}>
						<Education />
					</Container>
				</Grid>
				
				<Grid id='projects-sec' container sx={{  backgroundColor: 'grey.600', minHeight: '100vh', backgroundImage: 'linear-gradient(to bottom right, transparent 49.9%, #03a9f4 50%), linear-gradient(to top left, transparent 49.9%, #78909c 0)',}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 5, position: 'relative'}}>
						<Projects projects={projObj}/>
					</Container>
				</Grid>
				<Grid id='contact-sec' container sx={{ backgroundColor: 'grey.700', minHeight: '80vh', display: 'flex', alignContent: 'flex-start'}}>
					<Container sx={{ maxWidth: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', alignContent: 'flex-start', p: 3, position: 'relative'}}>
						<Contact />
					</Container>
				</Grid>
				<Grid id='footer-sec' container sx={{ backgroundColor: 'grey.900', minHeight: '20vh', display: 'flex', alignContent: 'flex-start', position: 'relative'}}>
					<Box id='footer' ref={footRef} sx={{ position: 'absolute', height: '100%', width: '100%', visibility: 'hidden'}}>Center</Box>
					<ButtonBase disableRipple onClick={() => homeScrollId.scrollIntoView({ block: 'start', behavior: 'smooth'})}>
					<Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', }}>
						<Box sx={{ backgroundColor: 'primary.main', position: 'absolute', top: 0, left: '', mt: -4, '&:hover': { filter: 'brightness(1.1)'}, transition: 'filter 0.5s linear'  }}>
							<KeyboardDoubleArrowUpIcon sx={{ color: 'white.main', fontSize: '64px',}} />
						</Box>
					</Box>
					</ButtonBase>
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

export default connect(mapStateToProps, { setSplash, setBGColor, setSection } )(Home)
