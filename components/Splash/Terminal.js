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
    const { fWidth, contType, contState, cmds, outputs, title } = props
    const [len, setLen] = useState(200)
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
				minHeight: {
					xs: `${len}px`,
					sm: `${len}px`,
					md: `${len + 60}px`,
					lg: `${len + 60}px`,
					xl: `${len + 60}px`,
				},
                maxHeight: {
					xs: `${len + 100}px`,
					sm: `${len + 100}px`,
					md: `${len + 200}px`,
					lg: `${len + 100}px`,
					xl: `${len + 100}px`,
				},
                height: '100%'
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
                            key={i}
                            strings={el}
                            contType={contType}
                            contState={contState}
                            output={outputs[i]}
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
