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
import { InView, useInView } from "react-intersection-observer";

import NavBar from '../components/NavBar/NavBar'
import Terminal from '../components/Splash/Terminal'
import Skills from '../components/Sections/Skills';
import WorkHistory from '../components/Sections/WorkHistory'

import { setSplash, setBGColor } from '../actions'

const downButton = keyframes`
	from {
		transform: translateY(0px)
	}
	to {
		transform: translateY(25px)
	}
`

const Home = (props) => {
	const { splash, skills, icons, skillsObj, workObj, setBGColor } = props
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
			<Container sx={{ maxWidth: '100%', maxHeight: '100%' }}>
				{/* <NavBar /> */}
				<Grid container sx={{height: '100vh'}}>
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
					<Grid item xs={12} sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'center'}}>
						<Paper variant='downButton' sx={{ animation: `${downButton} 1s linear infinite alternate`, boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), inset 0px 3px 14px 2px rgb(0 0 0 / 12%)'}}>
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
				<Grid container sx={{ display: 'flex', pb: 40, flexDirection: 'column' }}>
					<WorkHistory workInfo={workObj}/>
				</Grid>
			</Container>
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

	const icons = await fs.readdir(dirPath)
	const skillsJsonFile = await fs.readFile(skillsJson).then((res) => res)
	const workJsonFile = await fs.readFile(workJson).then((res) => res)
	const skillsJsonParsed = JSON.parse(skillsJsonFile)
	const workJsonParsed = JSON.parse(workJsonFile)

	return {
		props: {
			icons: icons,
			skillsObj: skillsJsonParsed,
			workObj: workJsonParsed
		}
	}
}

export default connect(mapStateToProps, { setSplash, setBGColor } )(Home)
