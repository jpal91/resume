import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import CircleIcon from "@mui/icons-material/Circle";

import Bash from "./Bash";

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
    const { fWidth, contType, contState, cmds, outputs, title, hidden, name } = props
    
    const [len, setLen] = useState(0)
    const [settings, setSettings] = useState(fullWidth)

    useEffect(() => {
        setLen((outputs.length + cmds.length) * 50)
    }, [outputs, cmds])

    useEffect(() => {
        if (fWidth) {
            setSettings(fullWidth)
        } else {
            setSettings(halfWidth)
        }
    }, [fWidth])

	return (
		<Card
			raised={true}
			sx={{
				...settings,
                height: {
					xs: `260px`,
					sm: `260px`,
					md: `300px`,
					lg: `300px`,
					xl: `300px`,
				},
                opacity: hidden && 0,
                visibility: hidden && 'hidden',
                transform: hidden && 'translateX(-500px)',
                maxWidth: hidden ? '0px' : '100%',
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.5s, 0.5s',
                transitionTimingFunction: 'ease-in'
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
                {cmds.map((el, i) => {
                    return (
                        <Bash 
                            key={`${name}${i}`}
                            strings={el}
                            contType={contType}
                            contState={contState}
                            output={outputs[i]}
                            numOutputs={outputs.length}
                            order={i}
                            fWidth={fWidth}
                        />
                    )
                })}
			</CardContent>
		</Card>
	);
};

export default Terminal;
