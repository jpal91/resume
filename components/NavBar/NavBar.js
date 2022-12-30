import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import { keyframes } from "@emotion/react";

const hide = keyframes`
    0% {
        transform: translateY(0%);
        opacity: 1;
    }

    100% {
        transform: translateY(-50%);
        opacity: 0;
    }
`

const show = keyframes`
    0% {
        transform: translateY(-50%);
        opacity: 0;
    }

    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`

const NavBar = (props) => {
	return (
		<AppBar
			sx={{
				mt: 1,
				mb: 2,
				p: 1,
				borderRadius: "8px",
                animation: `${hide} 1s ease 1s 1 forwards`,
				"&:hover": { opacity: 1, animation: `${show} ease 1s 1 forwards` },
			}}
		>
			<Grid container>
				<Grid item xs={3}>
					A
				</Grid>
				<Grid item xs={6}>
					B
				</Grid>
				<Grid item xs={3}>
					C
				</Grid>
			</Grid>
		</AppBar>
	);
};

export default NavBar;
