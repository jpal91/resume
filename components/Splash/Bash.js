import { useRef, useEffect } from "react";
import Typed from "react-typed";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { controller } from '../../actions'

const Bash = (props) => {
	
    /**
     * strings Array[String] - Comes from cmds in terminal - Commands to display
     * contType String - "skills" / "alt_skills"
     * contState Int - Starts at 0 and controls what is rendered in order
     * output Array[String] - Comes from outputs - Outputs to display for the command
     * order Int - Comes from cmds, given by map in Terminal - order in which to render
     * controller Func - Redux action handler to control all display types for terminals
     * fWidth Bool - Show terminal half screen (sections) or in splash mode (full)
     */
    const { strings, contType, contState, output, order, controller, fWidth } = props;
	
    const tRef = useRef();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down("md"));

	useEffect(() => {
        console.log(strings, contState, order, output)
        if (order != contState) {
			return;
		}
		tRef.current.cursorBlinking = true;
		setTimeout(() => tRef.current.start(), 1000);
	}, [contState]);

	return (
		<>
			<Typography
				variant="h1"
				sx={{
					display: contState < order ? "none" : "",
					fontSize: matches || !fWidth ? "16px" : "32px",
					my: 1,
				}}
			>
				<span style={{ color: "#76ff03" }}>$ </span>
				<Typed
					typedRef={(typed) => (tRef.current = typed)}
					strings={strings}
					typeSpeed={50}
                    backSpeed={50}
                    backDelay={20}
					stopped
                    smartBackspace
					onComplete={ () => {
						setTimeout(() => {
                            controller(contType, contState + 1)
							tRef.current.cursor.hidden = true;
						}, 2000);
					}}
				/>
			</Typography>
			{output &&
            <Typography
				variant="h1"
				sx={{
					display: contState <= order ? "none" : "",
					color: "lightBlue.200",
					fontSize: matches || !fWidth ? "16px" : "32px",
                    whiteSpace: 'pre-wrap'
				}}
			>
				{output.map((e) => e)}
			</Typography>
            }
		</>
	);
};

export default connect(null, { controller })(Bash);
