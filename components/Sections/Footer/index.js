import { useEffect, useState } from 'react'
import { useSWRConfig } from 'swr'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

const Footer = (props) => {
    const { data } = props
    const { mutate } = useSWRConfig()
    const [homeScrollId, setHomeScrollId] = useState();
    const [visCount, setVisCount] = useState(0)
    const [visitor, setVisitor] = useState(false)

    useEffect(() => {
		if (typeof window != undefined) {
			setHomeScrollId(document.getElementById("home-sec"));
		}

		const ls = localStorage.getItem('visitor')

		if (!ls || ls != 'false') {
			localStorage.setItem('visitor', 'false')
			setVisitor(true)
		}
		

	}, []);

    useEffect(() => {
		if (visitor) {
			setVisitor(false)
			axios.post('/api/add_visitors').then(() => {
				
				mutate('/api/get-visitors')
				
			})
		} else {
			return
		}
	}, [visitor])

	useEffect(() => {
		if (Number.isInteger(data)) {
			setVisCount(data)
		}
	}, [data])

    return (
        <Grid
				id="footer-sec"
				container
				sx={{
					backgroundColor: "grey.900",
					minHeight: "20vh",
					display: "flex",
					alignContent: "center",
					position: "relative",
					justifyContent: "space-between",
					flexDirection: 'column'
				}}
			>
				<Box
					id="footer"
					sx={{
						position: "absolute",
						height: "100%",
						width: "100%",
						visibility: "hidden",
					}}
				>
					Center
				</Box>
				<Grid item xs={12} sx={{
					display: "flex",
					position: "relative",
					justifyContent: "center",
					alignItems: 'flex-start'
					
				}}>
				<ButtonBase
					disableRipple
					onClick={() =>
						homeScrollId.scrollIntoView({
							block: "start",
							behavior: "smooth",
						})
					}
					aria-label="Scroll to top"
					title="Scroll to top"
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							position: "relative",
						}}
					>
						<Box
							sx={{
								backgroundColor: "primary.main",
								position: "absolute",
								top: 0,
								left: "",
								mt: { xs: 4, sm: -4 },
								"&:hover": { filter: "brightness(1.1)" },
								transition: "filter 0.5s linear",
							}}
						>
							<KeyboardDoubleArrowUpIcon
								sx={{ color: "white.main", fontSize: "64px" }}
							/>
						</Box>
					</Box>
				</ButtonBase>
				</Grid>
				<Grid item xs={12} sx={{ display: 'flex', p: 1 }}>
					<Typography variant='h5' sx={{ fontSize: '16px', color: 'white.main'}}>{`Visitors: ${visCount}`}</Typography>
				</Grid>
			</Grid>
    )
}

export default Footer