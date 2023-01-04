import colors from "./colors";

const { black, white, blueGrey, lightBlue, primary, secondary } = colors;

const baseProperties = {
	fontWeightBold: 700,
	fontWeightMedium: 600,
	fontWeightRegular: 400,
	fontWeightLight: 300,
	color: black.main,
};

const roboto = {
	regular: "'Roboto', san-serif;",
	mono: "'Roboto mono', monospace;",
	slab: "'Roboto Slab', serif;",
}

const ubuntu = {
	regular: "'Ubuntu Mono', monospace;"
}

const poppins = {
	regular: "'Poppins', sans-serif;"
}

const typography = {
	h1: {
		fontWeight: baseProperties.fontWeightBold,
        fontFamily: ubuntu.regular,
        color: white.main,
        fontSize: "32px"
	},
	h3: {
		fontWeight: baseProperties.fontWeightBold,
		fontFamily: poppins.regular,
		color: primary.main,
	},
	h4: {
		fontWeight: baseProperties.fontWeightBold,
		fontFamily: poppins.regular,
		color: primary.main
	},
	body: {
		fontWeight: baseProperties.fontWeightRegular,
		fontFamily: poppins.regular
	},
	bodyBold: {
		fontWeight: baseProperties.fontWeightBold,
		fontFamily: poppins.regular
	}
};

export default typography