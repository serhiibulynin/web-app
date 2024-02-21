import { createTheme } from "@mui/material";
import { palette } from "./foundations";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4054b2",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          background-color: ${palette.background};
        }
      `,
    },
  },
});
