import React, { useState, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { InView, useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

import ProjModal from "../ProjModal";
import { setBGColor } from "../../actions";
import boxShadows from "../../styles/theme/base/boxShadows";

const slideIn = keyframes`
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    
    to {
        transform: translateY(0px);
        opacity: 1;
    }
`;

const Projects = (props) => {
	const { projects, setBGColor } = props;
	const [inView, setInView] = useState(false);
	const [projRef, projInView] = useInView();

	useEffect(() => {
		if (!projInView) return;
		setBGColor("default");
	}, [projInView]);

	return (
		<InView onChange={setInView} triggerOnce={true}>
			{({ ref }) => (
				<>
					<div ref={ref}></div>
					<div ref={projRef}></div>
					<Fade in={inView} timeout={{ enter: 1000 }}>
						<Grid
							item
							xs={12}
							sx={{
								display: "flex",
								justifyContent: "center",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Typography
								variant="h3"
								sx={{
									border: `${4 / 16}rem solid`,
									py: 2,
									px: 4,
								}}
							>
								Projects
							</Typography>
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
							const {
								name,
								description,
								startDate,
								endDate,
								website,
								github,
								image,
                                techUsed,
								subHeader
							} = e;

							return (
								<React.Fragment key={name}>
									<InView key={name} triggerOnce={true}>
										{({ ref, inView }) => (
											<Card
												key={name}
												ref={ref}
												sx={{
													backgroundColor:
														"#11111111",
													overflow: "visible",
													backgroundColor: "inherit",
													boxShadow: "none",
													animation:
														inView &&
														`${slideIn} 1s ease-in ${
															0.25 * i
														}s forwards`,
													opacity: 0,
												}}
											>
												<Box
													sx={{
														position: "relative",
														width: "400px",
														minHeight: "200px",
														backgroundImage:
															"radial-gradient(farthest-corner at bottom 20px right 40px, #546e7a -40%, #2196f3 60%)",
														mt: 4,
														borderRadius: "3px",
														boxShadow:
															"4px 4px 5px 2px rgb(0 0 0 / 20%)",
													}}
												>
													<Box
														sx={{
															position:
																"absolute",
															top: 0,
															left: "5%",
															mt: -4,
															width: "90%",
														}}
													>
														<Paper
															sx={{
																display: "flex",
																p: 0.5,
																justifyContent:
																	"center",
																backgroundColor:
																	"grey.300",
																width: "100%",
																height: "100%",
																overflow:
																	"hidden",
															}}
														>
															<Image
																src={`/proj-pics/${image}`}
																height="200"
																width="350"
																alt={name}
															/>
														</Paper>
													</Box>
													<Grid
														item
														xs={12}
														sx={{
															pt: "200px",
															pb: 1,
															px: 3,
															display: "flex",
															alignItems:
																"center",
															flexDirection:
																"column",
															justifyContent:
																"center",
															overflow: "hidden",
														}}
													>
														<Typography variant="cardHeader">
															{name}
														</Typography>

														<ProjModal
															key={i}
															id={i}
															name={name}
															description={
																description
															}
															startDate={
																startDate
															}
															endDate={endDate}
															website={website}
															github={github}
                                                            techUsed={techUsed && techUsed}
															subHeader={subHeader}
														/>
													</Grid>
												</Box>
											</Card>
										)}
									</InView>
								</React.Fragment>
							);
						})}
					</Grid>
				</>
			)}
		</InView>
	);
};

export default connect(null, { setBGColor })(Projects);
