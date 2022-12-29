import colors from "./colors";

const { primary } = colors;

const baseProperties = {
	fontWeightBold: 800,
	fontWeightMedium: 600,
	fontWeightRegular: 400,
	fontWeightLight: 300,
	color: primary.text,
};

const fontFam = {
	regular: "'Roboto', san-serif;",
	mono: "'Roboto mono', monospace;",
	slab: "'Roboto Slab', serif;",
};

const typography = {
	h1: {
		fontWeight: baseProperties.fontWeightBold,
        fontFamily: fontFam.regular,
        color: baseProperties.color,
        fontSize: "32px"
	},
};

export default typography