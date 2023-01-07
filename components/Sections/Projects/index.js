import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { InView, useInView } from "react-intersection-observer";

import ProjCard from "./ProjCard";
import { setSection } from "../../../actions";


const Projects = (props) => {
	const { projects, setSection } = props;
	const [inView, setInView] = useState(false);
	const [projRef, projInView] = useInView({ threshold: 0.55 });

	useEffect(() => {
		if (!projInView) return;
		setSection("projects");
	}, [projInView]);

	return (
		<>
			<InView onChange={setInView} triggerOnce={true}>
				{({ ref }) => (
					<>
						<Fade in={inView} timeout={{ enter: 1000 }}>
							<Grid
								item
								xs={12}
								ref={ref}
								sx={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Typography
									variant="h3"
									sx={{
										py: 2,
										px: 2,
										color: "white.main",
									}}
								>
									projects
								</Typography>
								<Box
									sx={{
										display: "flex",
										borderRadius: "100%",
										border: `${3 / 16}rem solid`,
										borderColor: "white.main",
										p: 1,
									}}
								>
									<AccountTreeIcon
										sx={{
											color: "white.main",
											fontSize: "40px",
										}}
									/>
								</Box>
							</Grid>
						</Fade>
						<Grid
							container
							item
							xs={12}
							gap={7}
							sx={{
								p: 2,
								mt: 4,
								display: "flex",
								justifyContent: "center",
							}}
						>
							{projects.projects.map((e, i) => {
								return (
									<ProjCard
										project={e}
										key={e.name}
										index={i}
									/>
								);
							})}
						</Grid>
					</>
				)}
			</InView>
			<Box
				id="projects"
				ref={projRef}
				sx={{
					position: "absolute",
					height: "100%",
					width: "100%",
					visibility: "hidden",
				}}
			>
				Center
			</Box>
		</>
	);
};

export default connect(null, { setSection })(Projects);
