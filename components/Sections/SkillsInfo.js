import { connect } from 'react-redux';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from "@mui/material/Typography";
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'

const SkillsInfo = (props) => {
	const { name, hidden, lockTransitions } = props;

	return (
		<div>

            <Box
				sx={{
                    width: "100%",
					height: "100%",
					// opacity: hidden ? 0 : 1,
                    // maxWidth: hidden ? '0%' : '100%',
					// transition: "opacity 1s ease-out",
                    p: 1.5,
                    // display: lockTransitions && 'none'
				}}
			>
				
                <Grid xs={12}><Typography variant="h3">{!lockTransitions && name}</Typography></Grid>
			</Box>

		</div>
	);
};

const mapStateToProps = (state) => {
    return {
        lockTransitions: state.lockTransitions
    }
}

export default connect(mapStateToProps)(SkillsInfo);
