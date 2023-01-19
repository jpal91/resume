import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import { keyframes } from "@emotion/react";
import { useMediaQuery } from "@mui/material";

import Logo from "./Logo";
import Logo2 from "./Logo2";

const hide = keyframes`
    0% {
        transform: translateY(0%);
        opacity: 1;
    }

    100% {
        transform: translateY(-20%);
        opacity: 0;
    }
`;

const show = keyframes`
    0% {
        transform: translateY(-20%);
        opacity: 0;
    }

    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`;

const getIds = (arr) => {
	const ids = {};
	arr.forEach((sect) => {
		let noWhite = sect.replaceAll(/\s/g, "");
		ids[sect] = document.getElementById(`${noWhite}-sec`);
	});

	return ids;
};

const sections = [
	"home",
	"certs",
	"skills",
	"work history",
	"education",
	"projects",
	"contact",
];

const Nav = (props) => {
	const [scrollIds, setScrollIds] = useState({});
	const [scroll, setScroll] = useState(false);
	const [lastSection, setLastSection] = useState("home");
	const timeRef = useRef();
	const { section } = props;
	const mediaQuery = useMediaQuery("(pointer: fine)");
	const width = 90;

	useEffect(() => {
		if (typeof window != undefined) {
			const ids = getIds(sections);
			setScrollIds(ids);
		}
	}, []);

	useEffect(() => {
		if (section != lastSection && !scroll) {
			setScroll(true);
		}

		if (scroll) {
			timeRef.current = setTimeout(() => {
				setScroll(false);
				setLastSection(section);
			}, 3000);
		}

		return () => {
			clearTimeout(timeRef.current);
		};
	}, [section, lastSection, scroll]);

	return (
		<>
			<AppBar
				sx={{
					mt: { xs: 0, md: 1 },
					width: "max-content",
					minWidth: { xs: "100%", md: "95%", lg: "75%", xl: "57%" },
					maxWidth: "100%",
					display: { xs: "none", sm: "flex" },
					mx: "auto",
					borderRadius: { xs: 0, md: "10px" },
					backgroundColor: "lightBlue.200",
					animation: !mediaQuery
						? "none"
						: scroll
						? `${show} 1s ease-in forwards`
						: `${hide} 1s ease-in forwards`,
					"&:hover": {
						opacity: 1,
						animation: `${show} 1s ease-in forwards`,
					},
				}}
			>
				<Toolbar
					disableGutters={true}
					sx={{ width: "100%", height: "100%" }}
				>
					<Grid container sx={{ height: "100%" }}>
						<Grid
							item
							xs={2}
							sx={{
								display: "flex",
								backgroundColor: "lightBlue.200",
								width: "100%",
								height: "100%",
								borderRadius: "10px",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<SvgIcon
								component={Logo2}
								alt="Website Logo"
								sx={{
									width: `${width}px`,
									height: `${width * 0.6}px`,
									color: "grey.200",
									transition: "color 1s linear",
									filter: "drop-shadow(2px 2px 1px rgb(0 0 0 / 0.4))",
								}}
								viewBox="0 0 20 12.12"
							/>
						</Grid>
						<Grid
							item
							xs={10}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-evenly",
								// columnGap: { sm: 2, md: 4, lg: 3 },
								backgroundColor: "grey.700",
								borderTopLeftRadius: { xs: "10px"},
								borderBottomLeftRadius: { xs: "10px"},
								borderTopRightRadius: { xs: '0px', md: '10px' },
								borderBottomRightRadius: { xs: '0px', md: '10px' },
								pr: 2,
								height: '100%'
							}}
						>
							{sections.map((e, i) => (
								<React.Fragment key={`${e}${i}`}>
									<ButtonBase
										disableRipple
										onClick={() =>
											scrollIds[e].scrollIntoView({
												block: "start",
												behavior: "smooth",
											})
										}
									>
										<Typography
											variant="navItem"
											sx={{
												color:
													section == e
														? "lightGreen.A400"
														: "lightBlue.200",
												textDecoration:
													section == e && "underline",
												textDecorationThickness: "5px",
												textUnderlineOffset: "7px",
												"&:hover": {
													color:
														mediaQuery &&
														"lightGreen.A400",
												},
												transition:
													"color 0.5s ease-out",
											}}
										>
											<Typography
												variant="navItem"
												component={"span"}
												sx={{
													visibility:
														section != e &&
														"hidden",
													color: "lightGreen.A400",
												}}
											>{`> `}</Typography>
											{e}
										</Typography>
									</ButtonBase>
								</React.Fragment>
							))}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		section: state.section,
	};
};

export default connect(mapStateToProps)(Nav);
