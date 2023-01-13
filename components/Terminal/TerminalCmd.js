import { useRef, useEffect, useState } from "react";
import Typed from "react-typed";
import { connect } from "react-redux";
import Typography from "@mui/material/Typography";

import { controller } from "../../actions";

const TerminalCmd = (props) => {
	const { contState, fWidth, contType, controller, values, stage, matches } = props;
	const tRef = useRef();

    useEffect(() => {
        if (contState != stage) return

        tRef.current.cursorBlinking = true;
		setTimeout(() => tRef.current.start(), 1000);
    }, [contState])

	return (
		<Typography
			variant="h1"
			sx={{
				display: contState < stage ? "none" : "",
				fontSize: matches || !fWidth ? "16px" : "32px",
				my: 1,
			}}
		>
			<span style={{ color: "#76ff03" }}>$ </span>
			<Typed
				typedRef={(typed) => (tRef.current = typed)}
				strings={values}
				typeSpeed={50}
				backSpeed={50}
				backDelay={20}
				stopped
				smartBackspace
				onComplete={() => {
					setTimeout(() => {
						controller(contType, contState + 1);
						tRef.current.cursor.hidden = true;
					}, 2000);
				}}
			/>
		</Typography>
	);
};


export default connect(null, { controller })(TerminalCmd);
