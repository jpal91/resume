import React from 'react'
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme } from "@mui/material/styles";

const BGProvider = () => {
    const theme = useTheme()
    const { background } = theme.palette
    const globalStyles = <GlobalStyles styles={{ body: { backgroundColor: `${background.secondary} !important` }}} />

    return <>{globalStyles}</>
}

export default BGProvider