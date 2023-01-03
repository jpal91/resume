import { createTheme } from "@mui/material/styles";

import globals from "./base/globals";
import typography from "./base/typography";
import colors from "./base/colors";
import borders from "./base/borders";
import breakpoints from "./base/breakpoints";
// import grid from "./components/grid";
// import container from "./components/container";
import appbar from "./components/appbar";
import paper from "./components/paper";
// import alert from "./components/alert";
// import listItemText from "./components/listitemtext";
// import fab from "./components/fab";
// import card from "./components/card";
// import drawer from "./components/drawer";
import boxShadows from "./base/boxShadows";

export default createTheme({
	typography: { ...typography },
	palette: { ...colors },
	borders: { ...borders },
	breakpoints: { ...breakpoints },
    boxShadows: { ...boxShadows },
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				...globals,
			},
		},
	// 	MuiGrid: { ...grid },
	// 	MuiContainer: { ...container },
	// 	MuiAlert: { ...alert },
	// 	MuiListItemText: { ...listItemText },
	// 	MuiFab: { ...fab },
	// 	MuiCard: { ...card },
	// 	MuiDrawer: { ...drawer },
		MuiAppBar: { ...appbar },
		MuiPaper: { ...paper },
	},
});
