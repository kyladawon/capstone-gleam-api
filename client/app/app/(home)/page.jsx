"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Image from 'next/image';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import WorldMap from "../components/WorldMap";
import { ThemeProvider } from "@emotion/react";
import { theme } from '/theme.js';
import Bubble from '../components/Bubble';
import LinePlot from '../components/LinePlot';
import AreaPlot from '../components/Area';

const getSectionStyles = (theme) => ({
  display: "flex",
  alignItems: "center",
  padding:theme.spacing(1),
  // margin:"2rem 0",
  minHeight: '100vh',
  overflow: "auto",
  flexDirection: "column",
  justifyContent: "center",
  gap: "1rem",
  py: "2rem",
  px: "2rem",
  backgroundColor: theme.palette.primary.background,
  color: theme.palette.primary.white,
  fontFamily: theme.typography.fontFamily,
});

const TeamMemberCard = ({ name, school, github, linkedin, imageSrc }) => (
  <Box sx={{
    textAlign: "center",
    width: "200px",
    padding: "1rem",
    backgroundColor: "#f4f4f4", 
    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Light shadow for depth
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)", // Slight scale effect on hover
    },
  }}>
    <Image
      src={imageSrc} 
      alt={name}
      width={150}
      height={150}
      style={{ borderRadius: "50%" }} // Make the image round
    />
    <Typography variant="h6" sx={{ mt: 2, color: "black" }}>{name}</Typography>
    <Typography variant="body1" sx={{ color: "gray" }}>{school}</Typography>

    {/* Social Links */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", mt: 1 }}>
      {github && (
        <a href={github} target="_blank" rel="noopener noreferrer">
          <Typography variant="body2" sx={{ color: "black" }}>GitHub</Typography>
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Typography variant="body2" sx={{ color: "black" }}>LinkedIn</Typography>
        </a>
      )}
    </Box>
  </Box>
);

const teamMembers = [
  {
    name: "Alaa Fadhlallah",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://www.linkedin.com/in/alaa-fadhlallah/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Anirudh Indraganti",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://linkedin.com/in/person",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Ethan Cao",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://www.linkedin.com/in/ethan-cao1/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Liam Manatt",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://www.linkedin.com/in/liam-manatt/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Manav Jairam",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://www.linkedin.com/in/manav-jairam-0a881a1aa/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Kyla (Dawon) Park",
    school: "University of California San Diego",
    github: "https://github.com/person",
    linkedin: "https://www.linkedin.com/in/kyla-dawon-park/",
    imageSrc: "/1hdsi.png",
  },
];

const teamMentors = [
  {
    name: "Rose Yu",
    department: "University of California San Diego",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Yian Ma",
    department: "University of California San Diego",
    imageSrc: "/1hdsi.png",
  },
];

<Box id="team" sx={getSectionStyles}>
  <Typography variant="h2">Team</Typography>
  <Typography variant="h4">Researchers & Mentors</Typography>

  {/* Team Member Cards */}
  <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", mt: 3 }}>
    {teamMembers.map((member, index) => (
      <TeamMemberCard key={index} {...member} />
    ))}
  </Box>
</Box>


export default function Home() {
  const [overviewContent, setOverviewContent] = useState("");
  const [methodsContent, setMethodsContent] = useState("");
  const [resultsContent, setResultsContent] = useState("");
  useEffect(() => {
    fetch('/intro.md')
      .then(response => response.text())
      .then(data => setOverviewContent(data));

    fetch('/methods.md')
    .then(response => response.text())
    .then(data => setMethodsContent(data));

    fetch('/results.md')
    .then(response => response.text())
    .then(data => setResultsContent(data));

      
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* Intro Section */}
      <Box
        sx={(theme) => ({
          ...getSectionStyles(theme),
          position: "relative", // Ensure child elements can be positioned within
          overflow: "hidden",   // Prevents overflow of the map
        })}
          >
      {/* WorldMap as Background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: -50,
          width: "100%",
          height: "100%",
          zIndex: 0, // Push the map to the background
          opacity: 0.2, // Adjust opacity for visibility
        }}
      >
        <WorldMap />
      </Box>

      {/* Content on top */}
      <Box sx={{ position: "absolute", zIndex: 1, textAlign: "center" }}>
        <Typography variant="h1" fontWeight="bold" fontSize="3rem">
        Epidemic Engine Cloud-based API

        </Typography>
        <Typography variant="h2" fontWeight="bold" fontSize="2.5rem">
        Bridging Epidemic Simulators (GLEAM) with AI Algorithms
        </Typography>
      </Box>
    </Box>

      {/* Overview Section */}
      <Box id="overview" sx={getSectionStyles}>
        <Typography variant="h3">Introduction</Typography>
        <Box
          sx={{
            maxWidth: "150vh",
            margin: "0 auto",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.998)", // Semi-transparent background
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            color: "#333", // Dark gray text for readability
            fontSize: "1.2rem", // Adjust font size
            lineHeight: "1.6", // Improve text readability
            fontFamily: "Arial, sans-serif", // Ensure a clean font
            textAlign: "center",
    
          }}
        >
          <ReactMarkdown children={overviewContent} remarkPlugins={[remarkGfm]} />
          <Image
              src={'/intro.png'} 
              alt={'intro'}
              width={3000}
              height={2000}
              style={{ width: "auto", height: "auto", maxWidth: "30%" }}
            />
        </Box>
      </Box>

      {/* Methods Section */}
      <Box id="methods" sx={getSectionStyles}>
        <Typography variant="h3">Methods</Typography>
        <Box
          sx={{
            maxWidth: "150vh",
            margin: "0 auto",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.998)", // Semi-transparent background
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            color: "#333", // Dark gray text for readability
            fontSize: "1.2rem", // Adjust font size
            lineHeight: "1.6", // Improve text readability
            fontFamily: "Arial, sans-serif", // Ensure a clean font
            textAlign: "center",
          }}
        >
          <ReactMarkdown children={methodsContent} remarkPlugins={[remarkGfm]} />
        </Box>
      </Box>

      {/* Architecture Section */}
      <Box id="architecture" sx={getSectionStyles}>
        <Typography variant="h3">Architecture</Typography>
        <Box sx={{
            maxWidth: "150vh",
            margin: "0 auto",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.998)", // Semi-transparent background
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            color: "#333", // Dark gray text for readability
            fontSize: "1.2rem", // Adjust font size
            lineHeight: "1.6", // Improve text readability
            fontFamily: "Arial, sans-serif", // Ensure a clean font
            textAlign: "center",

          }}
          >
            <Image
              src={'/architecture.png'} 
              alt={'architecture'}
              width={3000}
              height={2000}
              style={{ width: "auto", height: "auto", maxWidth: "80%" }}
            />
          </Box>
      </Box>

      {/* Results Section */}
      <Box id="results" sx={getSectionStyles}>
        <Typography variant="h3">Results</Typography>
        <Box
          sx={{
            maxWidth: "150vh",
            margin: "0 auto",
            padding: "1.5rem",
            backgroundColor: "rgba(255, 255, 255, 0.998)", // Semi-transparent background
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
            color: "#333", // Dark gray text for readability
            fontSize: "1.2rem", // Adjust font size
            lineHeight: "1.6", // Improve text readability
            fontFamily: "Arial, sans-serif", // Ensure a clean font
            textAlign: "center",
          }}
        >
          <ReactMarkdown children={resultsContent} remarkPlugins={[remarkGfm]} />
        </Box>
      </Box>

      {/* Demo Section */}
      <Box id="demo" sx={getSectionStyles}>
        {/* <Typography variant="h4">Stages Over Time Seqeunce</Typography> */}
        {/* <Bubble /> */}
        {/* <Typography variant="h4">Change Over Time Sequence for Each Status</Typography> */}
        {/* <LinePlot />  */}
        {/* <AreaPlot /> */}
      </Box>

      {/* Team Section */}
      <Box id="team" sx={getSectionStyles}>
        <Typography variant="h2">Team</Typography>
        {/* Team Member Cards */}
        <Typography variant="h4">Researchers</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", mt: 3 }}>
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </Box>
        
        {/* Mentor Cards */}
        <Typography variant="h4">Mentors</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", mt: 3 }}>
          {teamMentors.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
