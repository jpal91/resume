import colors from "../base/colors";

const { primary } = colors

const appbar = {
    styleOverrides: {
		root: {
			backgroundColor: primary.main,
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