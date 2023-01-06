import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Slide from "@mui/material/Slide";
import ButtonBase from "@mui/material/ButtonBase";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { keyframes } from "@emotion/react";

import Logo from "./Logo";

const hide = keyframes`
    0% {
        transform: translateY(0%);
        opacity: 1;
    }

    100% {
        transform: translateY(-20%);
        opacity: 0;
    }
`

const show = keyframes`
    0% {
        transform: translateY(-20%);
        opacity: 0;
    }

    100% {
        transform: translateY(0%);
        opacity: 1;
    }
`

const getIds = (arr) => {
    const ids = {}
    arr.forEach((sect) => {
        let noWhite = sect.replaceAll(/\s/g, "");
        ids[sect] = document.getElementById(`${noWhite}-sec`);
    })

    return ids
} 

const sections = [
    "home",
    "skills",
    "work history",
    "education",
    "projects",
    "contact",
];

const Nav = (props) => {
	const [scrollIds, setScrollIds] = useState({});
	const [scroll, setScroll] = useState(false);
    const timeRef = useRef()
	const trigger = useScrollTrigger();
	const { section } = props;

    

	useEffect(() => {
		if (typeof window != undefined) {
			const ids = getIds(sections)
			setScrollIds(ids);
		}
	}, []);

    useEffect(() => {
        

        if (!scroll) {
            document.addEventListener('scroll', (event) => {
                
                    setScroll(true)


            })
            

            
        }

        if (scroll) {

        timeRef.current = setTimeout(() => {

            setScroll(false)
        }, 3000)
        }

        return () => {
            clearTimeout(timeRef.current)
        }
        
    })

    // useEffect(() => {
    //     if (trigger && !scroll) {
    //         setScroll(true)

    //         setTimeout(() => {
    //             setScroll(false)
    //         }, 2000)

    //     }

    // }, [trigger])



	//() => scrollIds[e].scrollIntoView({ block: 'center', behavior: 'smooth' })
	return (
		<>
			{/* <Slide appear={false} direction='down' in={!trigger && section != 'footer' && section != 'home'} addEndListener={() => console.log('Done')}> */}
			<AppBar
				sx={{
					mt: 1,
					width: "min-content",
					minWidth: "60%",
					display: "center",
					mx: "auto",
					borderRadius: "10px",
					backgroundColor: "primary.main",
                    animation: scroll ? `${show} 1s ease-in forwards`: `${hide} 1s ease-in forwards`,
                    '&:hover': {
                        opacity: 1,
                        animation: `${show} 1s ease-in forwards`
                    },
				}}

			>
				<Toolbar sx={{ width: "100%" }}>
					<Grid container>
						<Grid item xs={1}>
							<SvgIcon
								component={Logo}
								sx={{
									width: "50px",
									height: "50px",
									color: "white.main",
									boxShadow:
										"4px 4px 5px 2px rgb(0 0 0 / 20%)",
									transition: "color 1s linear",
								}}
								viewBox="0 0 20 20"
							/>
						</Grid>
						<Grid
							item
							xs={11}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								columnGap: 5.5,
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
													section == e &&
													"lightGreen.A400",
												textDecoration:
													section == e && "underline",
												textDecorationThickness: "5px",
												textUnderlineOffset: "7px",
                                                '&:hover': {
                                                    color: 'lightGreen.A400',
                                                },
                                                transition: 'color 0.5s ease-out'
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
											>{`>> `}</Typography>
											{e}
										</Typography>
									</ButtonBase>
								</React.Fragment>
							))}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			{/* </Slide> */}
		</>
	);
};

const mapStateToProps = (state) => {
	return {
		section: state.section,
	};
};

export default connect(mapStateToProps)(Nav);
