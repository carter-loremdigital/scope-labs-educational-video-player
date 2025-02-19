"use client";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#64b5f6", // A lighter blue than the default (#1976d2)
      light: "#a6c8ff", // Lighter variant for backgrounds or hover
      dark: "#2286c3", // Darker variant to ensure good contrast with white text
      contrastText: "#ffffff", // White text on primary backgrounds
    },
    secondary: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    background: {
      default: "#f1f8ff", // A very light blue background
      paper: "#ffffff",
    },
    text: {
      primary: "#333333", // Dark gray for primary text
      secondary: "#555555", // Medium gray for secondary text
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
  },

  typography: {
    fontFamily: "Outfit",
    h1: { fontFamily: "Poppins" },
    h2: { fontFamily: "Poppins" },
    h3: { fontFamily: "Poppins" },
    h4: { fontFamily: "Poppins" },
    h5: { fontFamily: "Poppins" },
    h6: { fontFamily: "Poppins" },
  },
  cssVariables: true,
});

theme = responsiveFontSizes(theme);

export default theme;
