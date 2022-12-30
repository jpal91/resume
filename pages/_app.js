import React from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import reduxThunk from 'redux-thunk'

import { CssBaseline } from "@mui/material";

import ProviderContainer from '../components/Provider/ProviderContainer'
import reducers from '../reducers'

const composeEnhancers = composeWithDevTools({ trace: false })
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

export default function App({ Component, pageProps }) {
	return (
		<React.Fragment>
			<Provider store={store}>
				<ProviderContainer>
					<CssBaseline />
					<Component {...pageProps} />
				</ProviderContainer>
			</Provider>
		</React.Fragment>
	);
}
