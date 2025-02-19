"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // primary: { main: "#" }, // Salmon
    // secondary: { main: "#" },
    // background: { default: "#" },
    // text: { primary: "#", secondary: "#" },
  },
  typography: {
    fontFamily: "Outfit",
    h1: { fontFamily: "Poppins", fontWeight: 600 },
    h2: { fontFamily: "Poppins", fontWeight: 600 },
    h3: { fontFamily: "Poppins", fontWeight: 600 },
    h4: { fontFamily: "Poppins", fontWeight: 600 },
    h5: { fontFamily: "Poppins", fontWeight: 600 },
    h6: { fontFamily: "Poppins", fontWeight: 600 },
  },
  cssVariables: true,
});

export default theme;
