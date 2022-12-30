import colors from "../base/colors";

const { blue } = colors

const appbar = {
    styleOverrides: {
		root: {
			backgroundColor: blue[500],
			position: "sticky",
			maxWidth: "100%",
			height: "72px",
			display: 'flex',
			alignItems: "center",
			justifyContent: "center",
		}
	},
};

export default appbar;