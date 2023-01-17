import React from "react";
import { promises as fs } from "fs";
import path from "path";
import { connect } from "react-redux";
import Head from "next/head";
import useSWR from "swr";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import Nav from "../components/NavBar/Nav";
import Skills from "../components/Sections/Skills";
import WorkHistory from "../components/Sections/WorkHistory";
import Education from "../components/Sections/Education";
import Projects from "../components/Sections/Projects";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer";
import Splash from '../components/Sections/Splash'

import { setSplash, setSection } from "../actions";

const Home = (props) => {
	const { icons, skillsObj, workObj, projObj } = props;
	const fetcher = (url) => axios.get(url).then((res) => res.data);
	const { data } = useSWR("/api/get-visitors", fetcher);
	
	return (
		<>
			<Head>
				<title>Resume</title>
			</Head>
			<Nav />
			<Grid id="home-sec" container sx={{ height: "100vh" }}>
				<Splash />
			</Grid>
			<Grid
				id="skills-sec"
				container
				sx={{
					display: "flex",
					minHeight: "100vh",
					alignContent: "flex-start",
					alignItems: "center",
				}}
			>
				<Container
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						display: "flex",
						flexDirection: "column",
						alignContent: "flex-start",
						p: 3,
						position: "relative",
					}}
				>
					<Skills icons={icons} skillsObj={skillsObj} />
				</Container>
			</Grid>
			<Grid
				id="workhistory-sec"
				container
				sx={{
					minHeight: "100vh",
					backgroundColor: "white.main",
					alignContent: "flex-start",
				}}
			>
				<Container
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						display: "flex",
						flexDirection: "column",
						alignContent: "flex-start",
						p: 3,
						position: "relative",
					}}
				>
					<WorkHistory workInfo={workObj} />
				</Container>
			</Grid>
			<Grid
				id="education-sec"
				container
				sx={{
					backgroundColor: "grey.400",
					minHeight: "50vh",
					display: "flex",
					alignContent: "flex-start",
				}}
			>
				<Container
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						display: "flex",
						flexDirection: "column",
						alignContent: "flex-start",
						p: 3,
						position: "relative",
					}}
				>
					<Education />
				</Container>
			</Grid>

			<Grid
				id="projects-sec"
				container
				sx={{
					backgroundColor: "grey.600",
					minHeight: "100vh",
					backgroundImage:
						"linear-gradient(to bottom right, transparent 49.9%, #03a9f4 50%), linear-gradient(to top left, transparent 49.9%, #78909c 0)",
				}}
			>
				<Container
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						display: "flex",
						flexDirection: "column",
						alignContent: "flex-start",
						p: 5,
						position: "relative",
					}}
				>
					<Projects projects={projObj} />
				</Container>
			</Grid>
			<Grid
				id="contact-sec"
				container
				sx={{
					backgroundColor: "grey.700",
					minHeight: "80vh",
					display: "flex",
					alignContent: "flex-start",
				}}
			>
				<Container
					sx={{
						maxWidth: "100%",
						maxHeight: "100%",
						display: "flex",
						flexDirection: "column",
						alignContent: "flex-start",
						p: 3,
						position: "relative",
					}}
				>
					<Contact />
				</Container>
			</Grid>

			<Footer data={data} />
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		splash: state.splash,
		skills: state.skills,
	};
};

export const getStaticProps = async () => {
	const dirPath = path.join(process.cwd(), "public", "svg-icons");
	const skillsJson = path.join(process.cwd(), "helpers", "skills.json");
	const workJson = path.join(process.cwd(), "helpers", "work-history.json");
	const projectsJson = path.join(process.cwd(), "helpers", "projects.json");

	const icons = await fs.readdir(dirPath);
	const skillsJsonFile = await fs.readFile(skillsJson).then((res) => res);
	const workJsonFile = await fs.readFile(workJson).then((res) => res);
	const projectJsonFile = await fs.readFile(projectsJson).then((res) => res);

	const skillsJsonParsed = JSON.parse(skillsJsonFile);
	const workJsonParsed = JSON.parse(workJsonFile);
	const projectJsonParsed = JSON.parse(projectJsonFile);

	return {
		props: {
			icons: icons,
			skillsObj: skillsJsonParsed,
			workObj: workJsonParsed,
			projObj: projectJsonParsed,
		},
	};
};

export default connect(mapStateToProps, { setSplash, setSection })(Home);
