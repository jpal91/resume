import { useState } from "react";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";

import ModalBase from "./ModalBase";

const ProjModal = (props) => {
	const { project } = props;
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	return (
		<>
			<Paper
				sx={{
					backgroundColor: "inherit",
					border: "1px solid",
					borderColor: "white.main",
					my: 1,
					"&:hover": {
						filter: "brightness(1.1)",
						backgroundColor: "primary.main",
					},
					transition: "background-color 0.5s ease-out",
				}}
			>
				<ButtonBase
					onClick={handleOpen}
					sx={{
						p: 1.5,
						"&:active": { color: "white.main" },
						"&:focus": { color: "white.main" },
					}}
				>
					<Typography variant="cardBody">Learn More</Typography>
				</ButtonBase>
			</Paper>
			<ModalBase
				handleClose={handleClose}
				open={open}
				project={project}
			/>
		</>
	);
};

export default ProjModal;
