import React from "react";
import Navigations from "../../components/navigations";
import { Box, Divider, ThemeProvider } from "@mui/material";
import { theme } from "../../theme";

export const metadata = {
  title: "Gleam API Project",
  description: "DSC Capstone 24-25 A11",
};

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "white" }}>
        <Navigations />
        <Divider />
        {children}
      </Box>
    </ThemeProvider>
  );
}