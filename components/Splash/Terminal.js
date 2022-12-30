import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
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
		sm: "50%",
		md: "50%",
		lg: "50%",
		xl: "50%",
	},
};

const Terminal = (props) => {
	const [typeState, setTypeState] = useState(0);
    const { fWidth, contType, contState, cmds, outputs } = props
    const [len, setLen] = useState(200)
    const [settings, setSettings] = useState(fullWidth)
    const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))

	useEffect(() => {
		setTypeState(1);
        // if (controller == 'skills') {
        //     console.log(contState)
        // }
	}, []);

    useEffect(() => {
        setLen((outputs.length + cmds.length) * 50)
    }, [outputs, cmds])

    useEffect(() => {
        if (!matches) {
            setSettings(halfWidth)
        } else {
            setSettings(fullWidth)
        }
        
        
    }, [matches])

	return (
		<Card
			raised={true}
			sx={{
				...settings,
                // width: {
				// 	xs: "100%",
				// 	sm: "75%",
				// 	md: "75%",
				// 	lg: "75%",
				// 	xl: "75%",
				// },
				// display: "flex",
				// flexDirection: "column",
				// backgroundColor: "grey.800",
				minHeight: {
					xs: `${len}px`,
					sm: `${len}px`,
					md: `${len + 60}px`,
					lg: `${len + 60}px`,
					xl: `${len + 60}px`,
				},
				// mt: 2,
				// borderRadius: "8px",
				// border: `${1 / 16}rem solid rgba(0, 0, 0, 0.125)`,
			}}
		>
			<CardHeader
				sx={{
					backgroundColor: "blueGrey.300",
					p: 0.5,
					flexDirection: "row-reverse",
				}}
				title="~:bash"
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
				{/* <Bash
					strings={[" cat names.txt | grep $MY_NAME | echo"]}
					setState={setTypeState}
					tState={typeState}
					output={["Hello, my name is Justin"]}
					order={1}
				/>
				<Bash
					strings={["echo $MY_GREETING"]}
					setState={setTypeState}
					tState={typeState}
					output={["Welcome to my Resume"]}
					order={2}
				/> */}
                {cmds.map((el, i) => {
                    return (
                        <Bash 
                            key={i}
                            strings={el}
                            contType={contType}
                            contState={contState}
                            output={outputs[i]}
                            order={i}
                        />
                    )
                })}
			</CardContent>
		</Card>
	);
};

export default Terminal;
