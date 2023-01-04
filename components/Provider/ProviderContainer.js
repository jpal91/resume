import { ThemeProvider } from "@mui/material/styles";

import BGProvider from "./BGProvider";
import theme from "../../styles/theme";

//Planning on adding in support for light/dark mode later
const ProviderContainer = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <BGProvider />
            {props.children}
        </ThemeProvider>
    )
}

export default ProviderContainer