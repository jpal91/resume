import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

import CircleIcon from '@mui/icons-material/Circle';

import Bash from "./Bash";

const Terminal = () => {
	const [typeState, setTypeState] = useState(0);

	useEffect(() => {
		setTypeState(1);
	}, []);

	return (
		<Card
			raised={true}
			sx={{
				width: {
					xs: "100%",
					sm: "75%",
					md: "75%",
					lg: "75%",
					xl: "75%",
				},
				display: "flex",
				flexDirection: "column",
				backgroundColor: "grey.800",
				minHeight: {
					xs: "200px",
					sm: "200px",
					md: "260px",
					lg: "260px",
					xl: "260px",
				},
				mt: 2,
				borderRadius: "8px",
				border: `${1 / 16}rem solid rgba(0, 0, 0, 0.125)`,
			}}
		>
			<CardHeader
				sx={{ backgroundColor: "blueGrey.300", p: 0.5, flexDirection: 'row-reverse' }}
				title="~:bash"
                avatar={
                    <>
                    <CircleIcon sx={{ fontSize: '16px', color: 'success.focus' }}/>
                    <CircleIcon color='warning' sx={{ fontSize: '16px' }}/>
                    <CircleIcon color='error' sx={{ fontSize: '16px' }}/>
                    </>
                }
				titleTypographyProps={{
					variant: "body1",
					sx: { display: "flex", justifyContent: "center", ml: 5 },
				}}
			></CardHeader>
			<CardContent>
				<Bash
					strings={[" cat names.txt | grep $MY_NAME | echo"]}
					setState={setTypeState}
					tState={typeState}
					output={"Hello, my name is Justin"}
					order={1}
				/>
				<Bash
					strings={["echo $MY_GREETING"]}
					setState={setTypeState}
					tState={typeState}
					output={"Welcome to my Resume"}
					order={2}
				/>
			</CardContent>
		</Card>
	);
};

export default Terminal;
