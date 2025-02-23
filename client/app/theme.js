"use client";

import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      secondary: "#fff",
      background:"#323232ff",
      white: "#fff",
      green: "#17e1b3ff",
      yellow: "#FFC600",
    },
  },
  gradients: {
    primary: "linear-gradient(135deg, #012A4D, #034d89, #0562b8)",
  },
  typography: {
    fontFamily: "Arial, Helvetica, sans-serif", 
    fontWeightLight: 300,
    fontWeightRegular: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
  },
});