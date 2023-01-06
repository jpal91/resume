import React from "react"
import { connect } from "react-redux"
import Box from '@mui/material/Box'
import SvgIcon from '@mui/material/SvgIcon'

import Logo from './Logo'


const Nav = (props) => {
    const { bgColor } = props
    const bgMap = {
		default: 'primary.main',
		"blueGrey.400": 'lightBlue.200',
        project: 'white.main'
	};
    return (
        <>
        <Box sx={{ position: 'sticky', top: '5%', left: '3%', width: '200px'}}>
            <SvgIcon  component={Logo} sx={{ width: '100px', height: '100px', color: bgMap[bgColor], boxShadow: "4px 4px 5px 2px rgb(0 0 0 / 20%)", transition: 'color 1s linear'}} viewBox='0 0 20 20'/>
        </Box>
        
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        bgColor: state.bgColor
    }
}

export default connect(mapStateToProps)(Nav)