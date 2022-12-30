import { useRef, useEffect } from "react";
import Typed from "react-typed";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { controller } from '../../actions'

const Bash = (props) => {
	const { strings, contType, contState, output, order, controller } = props;
	const tRef = useRef();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
		// console.log(tState);
        // if (setState == 'skills') {
        //     console.log(tState, order, output)
        // }
		if (order != contState) {
			return;
		}
		// console.log(tRef.current);
		tRef.current.cursorBlinking = true;
		setTimeout(() => tRef.current.start(), 1000);
	}, [contState]);

	return (
		<>
			<Typography
				variant="h1"
				sx={{
					display: contState < order ? "none" : "",
					fontSize: matches ? "16px" : "32px",
					my: 1,
				}}
			>
				<span style={{ color: "#76ff03" }}>$ </span>
				<Typed
					typedRef={(typed) => (tRef.current = typed)}
					strings={strings}
					typeSpeed={50}
					stopped
					onStringTyped={() => {
						setTimeout(() => {
							// secontState(contState + 1);
                            controller(contType, contState + 1)
							tRef.current.cursor.hidden = true;
						}, 2000);
					}}
				/>
			</Typography>
			<Typography
				variant="h1"
				sx={{
					display: contState <= order ? "none" : "",
					color: "lightBlue.200",
					fontSize: matches ? "16px" : "32px",
                    whiteSpace: 'pre'
				}}
			>
				{output.map((e) => e)}
			</Typography>
		</>
	);
};

export default connect(null, { controller })(Bash);
