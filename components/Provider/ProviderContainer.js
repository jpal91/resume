import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme";

//Planning on adding in support for light/dark mode later
const ProviderContainer = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default ProviderContainer