import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import CircleIcon from "@mui/icons-material/Circle";

import TerminalCmd from "./TerminalCmd";

const base = {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "grey.800",
	borderRadius: "8px",
	border: `${1 / 16}rem solid rgba(0, 0, 0, 0.125)`,
};

const fullWidth = {
	...base,
	width: {
		xs: "100%",
		sm: "75%",
		md: "75%",
		lg: "75%",
		xl: "75%",
	},
};

const halfWidth = {
	...base,
	width: {
		xs: "100%",
		sm: "80%",
		md: "80%",
		lg: "80%",
		xl: "80%",
	},
};

const Terminal = (props) => {
	/**
	 * cmds Array[Array] - [["This is a command", "This is the same command retyped"], ["This is the next command"]]
	 * outputs Array[Array] - [["This is the output to the first command"], ["Second command", "New line"]]
	 * contType String - "skills" / "alt_skills"
	 * contState Int - Starts at 0 and controls what is rendered in order
	 * title String - Name to show on terminal - '~:bash' 'skills:bash'
	 * hidden Bool
	 * name String - Name of skill displayed if applicable - "git", "docker"
	 */
	const {
		fWidth,
		contType,
		contState,
		title,
		payload,
	} = props;

	const [settings, setSettings] = useState(fullWidth);
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));


	useEffect(() => {
		if (fWidth) {
			setSettings(fullWidth);
		} else {
			setSettings(halfWidth);
		}
	}, [fWidth]);

	return (
		<Card
			raised={true}
			sx={{
				...settings,
				height: {
					xs: `300px`,
					sm: `300px`,
					md: `300px`,
					lg: `300px`,
					xl: `300px`,
				},
			}}
		>
			<CardHeader
				sx={{
					backgroundColor: "blueGrey.300",
					p: 0.5,
					flexDirection: "row-reverse",
				}}
				title={title}
				avatar={
					<>
						<CircleIcon
							sx={{ fontSize: "16px", color: "success.focus" }}
						/>
						<CircleIcon color="warning" sx={{ fontSize: "16px" }} />
						<CircleIcon color="error" sx={{ fontSize: "16px" }} />
					</>
				}
				titleTypographyProps={{
					variant: "body1",
					sx: { display: "flex", justifyContent: "center", ml: 5 },
				}}
			></CardHeader>
			<CardContent>
				{payload &&
					payload.map((el, i) => {
						const { type, values, stage } = el;

						switch (type) {
							case "cmd":
								return (
									<TerminalCmd
										key={`cmd-${i}`}
										values={values}
										stage={stage}
										contState={contState}
										contType={contType}
										fWidth={fWidth}
										matches={matches}
									/>
								);
							case "output":
								return (
									<Typography
										key={`output-${i}`}
										variant="h1"
										sx={{
											display:
												contState <= stage
													? "none"
													: "",
											color: "lightBlue.200",
											fontSize:
												matches || !fWidth
													? "16px"
													: "32px",
											whiteSpace: "pre-wrap",
										}}
									>
										{values.map((e) => {
											return e;
										})}
									</Typography>
								);

						}
					})}
			</CardContent>
		</Card>
	);
};

export default Terminal;

// case 'ml':
// 	return (
		
// 		<MLCommand 
// 			key={`ml-${i}`}
// 			values={values}
// 			stage={stage}
// 			contState={contState}
// 			contType={contType}
// 			fWidth={fWidth}
// 			matches={matches}
// 		/>
		
// 	)