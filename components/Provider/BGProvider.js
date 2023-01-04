import { connect } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";

const BGProvider = (props) => {
	const { bgColor } = props;

	const theme = useTheme();
	const { background } = theme.palette;
	const bgMap = {
		default: background.default,
		"blueGrey.400": background.blueGrey[400],
	};
	const globalStyles = (
		<GlobalStyles
			styles={{
				body: { 
                    backgroundColor: `${bgMap[bgColor]} !important`,
                    // backgroundImage: 'radial-gradient(farthest-corner at bottom 400px right 400px, #546e7a 0%, #2196f3 100%)' 
                },
			}}
		/>
	);

	return <>{globalStyles}</>;
};

const mapStateToProps = (state) => {
	return {
		bgColor: state.bgColor,
	};
};

export default connect(mapStateToProps)(BGProvider);
