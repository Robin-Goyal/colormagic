import { createTheme } from "@mui/material/styles";
import { blue, red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: "#19857b",
    },
    divider: "#cccccc",
    error: {
      main: red.A400,
    },
  },
});

export default theme;
