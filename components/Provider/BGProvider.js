import { connect } from "react-redux";
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";

import BGPhoto from '../../public/proj-pics/bg-logo.png'

const BGProvider = (props) => {
	const { section } = props;

	const theme = useTheme();
	const { background } = theme.palette;

	const sectMap = {
		home: background.blueGrey[500],
		skills: background.default
	}

	const globalStyles = (
		<GlobalStyles
			styles={{
				body: { 
                    backgroundColor: `${sectMap[section] && sectMap[section]} !important`,
					backgroundImage: 'url("proj-pics/bg-cloud.svg")',
					backgroundRepeat: 'repeat',
					backgroundAttachment: 'fixed',
					// backgroundPosition: 'top center',
					backgroundSize: '70%',
					// backgroundBlendMode: 'difference'
					// backgroundBlendMode: 'overlay',
					// backgroundBlendMode: 'exclusion'
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
