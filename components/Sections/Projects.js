import { useState, useEffect } from "react";
import Image from "next/image";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { InView, useInView } from "react-intersection-observer";
import { keyframes } from "@emotion/react";

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
    const [projRef, projInView] = useInView()

    useEffect(() => {
        if (!projInView) return
        setBGColor('blueGrey.400')
    }, [projInView])

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
						rowGap={7}
						sx={{ p: 2, mt: 4 }}
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
								bulletPoints,
							} = e;
							const mod = i % 2 == 0;

							return (
								<InView key={name} triggerOnce={true}>
									{({ ref, inView }) => (
										<Grid
											item
											xs={12}
											ref={ref}
											sx={{
												display: "flex",
												animation:
													inView &&
													`${slideIn} 0.5s ease-in 0.5s forwards`,
												opacity: 0,
												flexDirection: mod
													? "row-reverse"
													: "row",
												alignItems: "center",
                                                boxShadow: boxShadows.xl,
                                                p: 2,
                                                backgroundColor: 'grey.400',
                                                borderRadius: '5px'
											}}
										>
											<Grid
												item
												xs={12}
												sm={3}
												sx={{
													display: "flex",
													mx: 2,
													p: 1,
													minWidth: "325px",
												}}
											>
												{/* <Card raised sx={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}> */}
												<Image
													width={300}
													height={200}
													src={
														image
															? `/proj-pics/${image}`
															: "/svg-icons/next-js.svg"
													}
													alt="picture"
												/>
												{/* </Card> */}
											</Grid>
											<Grid
												container
												item
												xs={12}
												sm={9}
												sx={{
													display: "flex",
													flexDirection: "column",
													alignContent:
														!mod && "flex-end",
												}}
											>
												<Typography variant="h4">
													{name}
												</Typography>
												<Typography variant="h5">
													{description}
												</Typography>
												<Typography variant="body">{`${startDate} - ${
													endDate
														? endDate
														: "Current"
												}`}</Typography>
												{website && (
													<Typography variant="body">
														{website}
													</Typography>
												)}
												<Typography variant="body">
													{github}
												</Typography>
												<List
													dense
													sx={{ lineSpacing: "2px" }}
												>
													{bulletPoints.map(
														(el, idx) => (
															<ListItem
																key={`${name}${idx}`}
															>
																<ListItemIcon>
																	<DoubleArrowIcon
																		sx={{
																			fontSize:
																				"20px",
																			color: "primary.dark",
																		}}
																	/>
																</ListItemIcon>
																<ListItemText
																	primaryTypographyProps={{
																		variant:
																			"body",
																		fontSize:
																			"12px",
																	}}
																>
																	{el}
																</ListItemText>
															</ListItem>
														)
													)}
												</List>
											</Grid>
										</Grid>
									)}
								</InView>
							);
						})}
					</Grid>
				</>
			)}
		</InView>
	);
};

export default connect(null, { setBGColor })(Projects)
