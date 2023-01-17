import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Typograhpy from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import BuildIcon from "@mui/icons-material/Build";
import { InView, useInView } from "react-intersection-observer";

import Terminal from "../Terminal/Terminal";

import {
	controller,
	setSkillsInfo,
	setSkillsDisplay,
	setLockTransitions,
	setSection,
} from "../../actions";

const payload = [
    {
        type: 'cmd',
        values: ['curl -s -o nice-things-to-have.txt', 'curl -s -o superpow', 'curl -s -o skills.txt https://myskills.com'],
        stage: 0
    },
    {
        type: 'output',
        values: [],
        stage: 0
    },
    {
        type: 'cmd',
        values: ['cat skills.txt'],
        stage: 1
    },
    {
        type: 'output',
        values: ['git\tDocker\tbash\tAWS\tPostgreSQL\n', 'MySQL\tmongoDB\tLinux\tMaterial UI\n', 'GitHub\tUbuntu\tReact\tTerraform\n', 'Python\tNode.js\tNext.js\tJupyter Notebooks\n', 'JavaScript\n', 'And many more!'],
        stage: 1
    }
]

const Skills = (props) => {
	const [inView, setInView] = useState(false);
	const [curName, setName] = useState("main");
	const [skillsRef, skillsInView] = useInView({ threshold: 0.55 });

	/**
	 * skills Int - Initial controller for skills terminal, controls what is being displayed and icons appearing (updated by controller)
	 * controller Func - Redux action handler to control all display types for terminals
	 * icons Array - List of file names for icons in public folder to display
	 * skillsInfo Obj - Comprises of the information in section below, used to render new info when icon is clicked
	 * setSkillsInfo Func - Redux action handler to update skillsInfo
	 * altSkills Int - Initial controller for alt_skills terminal - used when icon is clicked for specific skill to re-render terminal
	 * skillsDisplay Int - Controller to show whether to display initial skills term, alt_skills term, or alt_skills info display (updated by controller)
	 * setSkillsDisplay Func - Redux action handler to update skillsDisplay
	 * lockTransitions Bool - Prevents user from clicking on icons while terminal is still rendering causing render issues
	 * setLockTransitions Func - Redux action handler to update lockTransitions preventing or allowing user to click new skill icon
	 *
	 * cmds Array[Array] - [["This is a command", "This is the same command retyped"], ["This is the next command"]]
	 * outputs Array[Array] - [["This is the output to the first command"], ["Second command", "New line"]]
	 * contType String - "skills" / "alt_skills"
	 * title String - Name to show on terminal - '~:bash' 'skills:bash'
	 * fWidth Bool - Show terminal half screen (sections) or in splash mode (full)
	 */
	const {
		skills,
		controller,
		icons,
		skillsInfo,
		// skillsObj,
		setSkillsInfo,
		altSkills,
		skillsDisplay,
		setSkillsDisplay,
		lockTransitions,
		setLockTransitions,
		setSection,
	} = props;
	const { contType, fWidth, title } = skillsInfo;

	const startSeq = (e) => {
		if (!e) return;

		setInView(true);
		controller("skills", 0);
	};

	const updateSkills = (name) => {
		if (name == curName || lockTransitions) return;

		setLockTransitions(true);
		setName(name);
		setSkillsDisplay(1);
		controller("alt_skills", 0);
		setSkillsInfo(skillsObj[name]);
	};

	useEffect(() => {
		if (!skillsInView) return;
		setSection("skills");
	}, [skillsInView]);

	return (
		<>
			<InView onChange={(e) => startSeq(e)} triggerOnce={true}>
				{({ ref }) => (
					<>
						<Fade
							in={inView && skillsDisplay < 2}
							timeout={{ enter: 1000, exit: 100 }}
						>
							<Grid
								item
								xs={12}
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									mb: { xs: 0, sm: 4 },
								}}
							>
								<Typograhpy variant="h3" sx={{ py: 2, px: 2 }}>
									skills
								</Typograhpy>
								<Box
									sx={{
										display: "flex",
										borderRadius: "100%",
										border: `${3 / 16}rem solid`,
										borderColor: "primary.main",
										p: 1,
									}}
								>
									<BuildIcon
										sx={{
											color: "primary.main",
											fontSize: "40px",
										}}
									/>
								</Box>
							</Grid>
						</Fade>

						<Grid
							item
							xs={12}
							sx={{
								display: "flex",
								mt: { xs: 1, md: 0, lg: 2 },
								flexDirection: { xs: "column", lg: "row" },
							}}
						>
							<Fade
								in={inView && skillsDisplay < 2}
								ref={ref}
								timeout={{ enter: 1000, exit: 100 }}
							>
								<Grid
									item
									id="skills-terminal"
									xs={12}
									lg={6}
									sx={{
										width: "100%",
										display:
											skillsDisplay >= 2
												? "none"
												: "flex",
										justifyContent: "center",

										alignItems: "center",

										borderRight: {
											xs: "none",
											lg: `${3 / 16}rem solid`,
										},
										borderColor: {
											sm: "primary.main",
											lg: "primary.main",
										},
										height: "500px",
										pb: { xs: 3, lg: 0 },
									}}
								>
									<Terminal
										name={curName}
										contType={contType}
										contState={
											skillsDisplay == 0
												? skills
												: altSkills
										}
										fWdith={fWidth}
										title={title}
										hidden={skillsDisplay >= 2}
										payload={payload}
									/>
								</Grid>
							</Fade>

							{/* Future section for skills info */}

							<Grid
								item
								xs={12}
								lg={6}
								sx={{
									width: "100%",
									display: { xs: "none", sm: "flex" },
									justifyContent: "space-evenly",
									alignItems: "center",
									flexWrap: "wrap",
									flexDirection: "column-reverse",
									height: "500px",
									p: { sm: 5, lg: 0 },
								}}
							>
								{icons.map((e, i) => {
									const name = e.replace(".svg", "");

									return (
										<Box
											key={name}
											sx={{
												transition:
													"transform 0.5s ease-in-out",
												"&:hover": {
													transform: "scale(1.2)",
												},
												m: 2,
											}}
										>
											<Fade
												in={inView && skills >= 1}
												timeout={{
													enter: 1000 + i * 500,
												}}
											>
												<ButtonBase
													onClick={() =>
														updateSkills(name)
													}
													sx={{
														borderRadius: "10px",
													}}
													disabled
												>
													<Image
														src={`/svg-icons/${e}`}
														height="60"
														width="60"
														alt={name}
													/>
												</ButtonBase>
											</Fade>
										</Box>
									);
								})}
							</Grid>
						</Grid>
					</>
				)}
			</InView>
			<Box
				ref={skillsRef}
				sx={{
					position: "absolute",
					height: "100%",
					width: "100%",
					visibility: "hidden",
					top: 0,
					left: 0,
				}}
			>
				Center
			</Box>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		skills: state.skills,
		skillsInfo: state.skillsInfo,
		altSkills: state.altSkills,
		skillsDisplay: state.skillsDisplay,
		lockTransitions: state.lockTransitions,
	};
};

export default connect(mapStateToProps, {
	controller,
	setSkillsInfo,
	setSkillsDisplay,
	setLockTransitions,
	setSection,
})(Skills);
