import Image from "next/image";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link'
import { keyframes } from "@emotion/react";
import { InView } from "react-intersection-observer";

import ProjModal from "./ProjModal";

const slideIn = keyframes`
    from {
        transform: translateY(100px);
        opacity: 0;
    }
    
    to {
        transform: translateY(0px);
        opacity: 1;
    }
`;

const ProjCard = (props) => {
	const { project, index } = props;
	const { name, image, website, github } = project;

	return (
		<InView triggerOnce={true}>
			{({ ref, inView }) => (
				<Card
					ref={ref}
					sx={{
						backgroundColor: "#11111111",
						overflow: "visible",
						backgroundColor: "inherit",
						boxShadow: "none",
						animation:
							inView &&
							`${slideIn} 1s ease-in ${0.25 * index}s forwards`,
						opacity: 0,
					}}
				>
					<Box
						sx={{
							position: "relative",
							width: { xs: '350px', sm: '400px' },
							minHeight: "200px",
							backgroundImage:
								"radial-gradient(farthest-corner at bottom 20px right 40px, #546e7a -40%, #2196f3 60%)",
							mt: 4,
							borderRadius: "3px",
							boxShadow: "4px 4px 5px 2px rgb(0 0 0 / 20%)",
						}}
					>
						<Box
							sx={{
								position: "absolute",
								top: 0,
								left: "5%",
								mt: -4,
								width: "90%",
							}}
						>
							<Paper
								sx={{
									display: "flex",
									p: 0.5,
									justifyContent: "center",
									backgroundColor: "grey.300",
									width: "100%",
									height: "100%",
									overflow: "hidden",
									'&:hover': {
										backgroundColor: 'lightGreen.A100'
									},
									transition: 'background-color 0.5s linear'
								}}
							>
								<Link
										color="inherit"
										href={website ? website : github}
										target="_blank"
										rel="noopener noreferrer"
										sx={{ display: 'flex' }}
									>
								<Image
									src={`/proj-pics/${image}`}
									height="200"
									width="350"
									alt={name}
								/>
								</Link>
							</Paper>
						</Box>
						<Grid
							item
							xs={12}
							sx={{
								pt: "200px",
								pb: 1,
								px: 3,
								display: "flex",
								alignItems: "center",
								flexDirection: "column",
								justifyContent: "center",
								overflow: "hidden",
							}}
						>
							<Typography variant="cardHeader">{name}</Typography>

							<ProjModal key={index} project={project} />
						</Grid>
					</Box>
				</Card>
			)}
		</InView>
	);
};

export default ProjCard;
