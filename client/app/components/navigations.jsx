"use client";

import React from "react";
import { Box, Typography, styled} from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const MenuBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  paddingTop: "0.25rem",
  paddingBottom: "0.25rem",
  borderRadius: "0.5rem",
  cursor: "pointer",
  ":hover": {
    color: theme.palette.primary.green,
    transition: "all 0.3s ease-in-out",
  },
}));

export default function Navigations() {
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Box
      sx={{
        position: "fixed", // Fix the navbar to the top
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, // Make sure the navbar is on top of other content
        backgroundColor: "white", 
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.7rem",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Optional: Add a shadow for better visibility
      }}
    >
      <Link href="/" style={{ textDecoration: "none", color: "black" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Image
            src='/1gleam_logo.png'
            alt="GLEAM Logo"
            width={80}
            height={50}
            // layout="intrinsic"
          />
          <Typography variant="h4" sx={{ cursor: "pointer", color: "black" }}>
            GLEAM API Project
          </Typography>
        </Box>
      </Link>
      <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        <MenuBox onClick={() => handleScroll("overview")}>
          <Typography variant="h6">Overview</Typography>
        </MenuBox>

        <MenuBox onClick={() => handleScroll("methods")}>
          <Typography variant="h6">Methods</Typography>
        </MenuBox>

        <MenuBox onClick={() => handleScroll("architecture")}>
          <Typography variant="h6">Architecture</Typography>
        </MenuBox>

        <MenuBox onClick={() => handleScroll("results")}>
          <Typography variant="h6">Results</Typography>
        </MenuBox>

        <MenuBox onClick={() => handleScroll("team")}>
          <Typography variant="h6">Team</Typography>
        </MenuBox>
      </Box>
    </Box>
  );
}