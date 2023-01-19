import { connect } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

const movingClouds = keyframes`
	0% {
		background-position-x: center;
	}

	50% {
		background-position-x: 200vw;
	}

	100% {
		background-position-x: center;
	}
`

const BGProvider = (props) => {
	const { section } = props;

	const theme = useTheme();
	const { background, lightBlue } = theme.palette;

	const sectMap = {
		// home: background.blueGrey[200],
		home: lightBlue[100],
		certs: background.default
	}

	const globalStyles = (
		<GlobalStyles
			styles={{
				body: { 
                    backgroundColor: `${sectMap[section] && sectMap[section]} !important`,
					backgroundImage: 'url("proj-pics/bg-cloud2.svg")',
					backgroundRepeat: 'repeat',
					backgroundAttachment: 'fixed',
					backgroundSize: '70%',
					// backgroundPosition: 'center',
					backgroundPositionX: 'center',
					backgroundPositionY: 'center',
					
					// backgroundBlendMode: 'difference'
					// backgroundBlendMode: 'overlay',
					// backgroundBlendMode: 'exclusion'
					// animation: `${movingClouds} 100s linear forwards infinite`,
					// animationPlayState: section == 'home' ? 'running' : 'paused',
					
                },
			}}
		/>
	);

	return <>{globalStyles}</>;
};

const mapStateToProps = (state) => {
	return {
		section: state.section
	};
};

export default connect(mapStateToProps)(BGProvider);
