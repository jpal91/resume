import React from "react";

import { CssBaseline } from "@mui/material";

import ProviderContainer from '../components/Provider/ProviderContainer'

export default function App({ Component, pageProps }) {
	return (
		<React.Fragment>
			<ProviderContainer>
				<CssBaseline />
				<Component {...pageProps} />
			</ProviderContainer>
		</React.Fragment>
	);
}
