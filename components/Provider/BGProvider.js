import { connect } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";

const BGProvider = (props) => {
	const { section } = props;

	const theme = useTheme();
	const { background, lightBlue } = theme.palette;

	const sectMap = {
		home: lightBlue[200],
		certs: background.default,
	};

	const globalStyles = (
		<GlobalStyles
			styles={{
				body: {
					backgroundColor: `${
						sectMap[section] && sectMap[section]
					} !important`,
					backgroundImage: 'url("proj-pics/bg-cloud2.svg")',
					backgroundRepeat: "repeat",
					backgroundAttachment: "fixed",
					backgroundSize: "70%",
					backgroundPositionX: "center",
					backgroundPositionY: "center",
				},
			}}
		/>
	);

	return <>{globalStyles}</>;
};

const mapStateToProps = (state) => {
	return {
		section: state.section,
	};
};

export default connect(mapStateToProps)(BGProvider);
