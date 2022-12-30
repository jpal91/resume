import colors from "./colors";

const { black, white } = colors;

const baseProperties = {
	fontWeightBold: 700,
	fontWeightMedium: 600,
	fontWeightRegular: 400,
	fontWeightLight: 300,
	color: black.main,
};

const fontFam = {
	regular: "'Roboto', san-serif;",
	mono: "'Roboto mono', monospace;",
	slab: "'Roboto Slab', serif;",
}

const ubuntu = {
	regular: "'Ubuntu Mono', monospace;"
}

const typography = {
	h1: {
		fontWeight: baseProperties.fontWeightBold,
        fontFamily: ubuntu.regular,
        color: white.main,
        fontSize: "32px"
	},
};

export default typography