"use client";

import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from 'next/image';
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import WorldMap from "../components/WorldMap";
import { ThemeProvider } from "@emotion/react";
import { theme } from '/theme.js';
import Bubble from '../components/Bubble';
import LinePlot from '../components/LinePlot';
import AreaPlot from '../components/Area';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'; 


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

const TeamMemberCard = ({ name, school, linkedin, imageSrc }) => (
  <Box sx={{
    textAlign: "center",
    width: "200px",
    padding: "1rem",
    backgroundColor: "#f4f4f4", 
    borderRadius: "8px", // Rounded corners
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)", 
    },
  }}>
    <Image
      src={imageSrc} 
      alt={name}
      width={150}
      height={150}
      style={{ borderRadius: "50%" }} 
    />
    <Typography variant="h6" sx={{ mt: 2, color: "black" }}>{name}</Typography>
    <Typography variant="body1" sx={{ color: "gray" }}>{school}</Typography>

    {/* Social Links */}
    <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", mt: 1 }}>
    
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <Typography variant="body2" sx={{ color: "black" }}>LinkedIn</Typography>
        </a>
      )}
    </Box>
  </Box>
);

const TeamMentorCard = ({ name, department, imageSrc }) => (
  <Box sx={{
    textAlign: "center",
    width: "200px",
    padding: "1rem",
    backgroundColor: "#f4f4f4", 
    borderRadius: "8px", 
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)", 
    },
  }}>
    <Image
      src={imageSrc} 
      alt={name}
      width={150}
      height={150}
      style={{ borderRadius: "50%" }} 
    />
    <Typography variant="h6" sx={{ mt: 2, color: "black" }}>{name}</Typography>
    <Typography variant="body1" sx={{ color: "gray" }}>{department}</Typography>

 
  </Box>
);

const teamMembers = [
  {
    name: "Alaa Fadhlallah",
    school: "University of California San Diego",
    linkedin: "https://www.linkedin.com/in/alaa-fadhlallah/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Anirudh Indraganti",
    school: "University of California San Diego",
    linkedin: "https://linkedin.com/in/person",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Ethan Cao",
    school: "University of California San Diego",
    linkedin: "https://www.linkedin.com/in/ethan-cao1/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Liam Manatt",
    school: "University of California San Diego",
    linkedin: "https://www.linkedin.com/in/liam-manatt/",
    imageSrc: "/liam.jpg",
  },
  {
    name: "Manav Jairam",
    school: "University of California San Diego",
    linkedin: "https://www.linkedin.com/in/manav-jairam-0a881a1aa/",
    imageSrc: "/1hdsi.png",
  },
  {
    name: "Kyla (Dawon) Park",
    school: "University of California San Diego",
    linkedin: "https://www.linkedin.com/in/kyla-dawon-park/",
    imageSrc: "/kyla.png",
  },
];

const teamMentors = [
  {
    name: "Rose Yu",
    department: "University of California San Diego",
    imageSrc: "/rose.jpg",
  },
  {
    name: "Yian Ma",
    department: "University of California San Diego",
    imageSrc: "/yian.jpg",
  },
  {
    name: "Matteo Chinazzi",
    department: "Northeastern University",
    imageSrc: "/matteo.jpg",
  },
  {
    name: "Allen Wu",
    department: "University of California San Diego",
    imageSrc: "/allen.png",
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
  const [overview2Content, setOverview2Content] = useState("");
  const [methodsContent, setMethodsContent] = useState("");
  const [resultsContent, setResultsContent] = useState("");
  const [architectureContent, setArchitectureContent] = useState("");
  useEffect(() => {
    fetch('/intro.md')
      .then(response => response.text())
      .then(data => setOverviewContent(data));
    
    fetch('/intro2.md')
      .then(response => response.text())
      .then(data => setOverview2Content(data));
    
    fetch('/architecture.md')
      .then(response => response.text())
      .then(data => setArchitectureContent(data));
      
    fetch('/methods.md')
    .then(response => response.text())
    .then(data => setMethodsContent(data));

    fetch('/results.md')
    .then(response => response.text())
    .then(data => setResultsContent(data));

      
  }, []);


  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}  
          language={match[1]}
          PreTag="div"
          customStyle={{
            maxWidth: '1000px',   
            width: '1000px',      
            margin: '0 auto',    
            borderRadius: '8px', 
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
            overflowX: 'auto'   
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Intro Section */}
      <Box
        sx={(theme) => ({
          ...getSectionStyles(theme),
          position: "relative", 
          overflow: "hidden",   
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
          zIndex: 0, 
          opacity: 0.2, 
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
      
        {/* Buttons Section */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.open('/Capstone_Report_2024.pdf', '_blank')}
          >
            Report
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.open('https://github.com/Rose-STL-Lab/GLEAM-API', '_blank')}
          >
            GitHub
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => window.open('capstone-a11-1-poster.pdf', '_blank')}
          >
            Poster
          </Button>
        </Box>
        </Box>
      </Box>

      {/* Overview Section */}
      <Box id="overview" sx={getSectionStyles}>
        <Typography variant="h3">Introduction</Typography>
        <ReactMarkdown components={renderers}children={overviewContent} remarkPlugins={[remarkGfm]} />

        <Box
          sx={{
            maxWidth: "120vh", 
            margin: "2rem auto", 
            padding: "2rem",
            background: "linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%)", 
            borderRadius: "16px", 
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", 
            color: "#333", 
            fontSize: "1.1rem",
            lineHeight: "1.8", 
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #eaeaea", 
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)", 
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
            },
            textAlign: 'center'
          }}
        >
          <Image
              src={'/intro.png'} 
              alt={'intro'}
              width={3000}
              height={2000}
              style={{ width: "auto", height: "auto", maxWidth: "30%" }}
            />
        </Box>
        <ReactMarkdown components={renderers} children={overview2Content} remarkPlugins={[remarkGfm]} />
      </Box>

      {/* Architecture Section */}
      <Box id="architecture" sx={getSectionStyles}>
        <Typography variant="h3">Architecture</Typography>
        <Box sx={{
            maxWidth: "120vh", 
            margin: "2rem auto", 
            padding: "2rem",
            background: "linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%)", 
            borderRadius: "16px", 
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", 
            color: "#333", 
            fontSize: "1.1rem",
            lineHeight: "1.8", 
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #eaeaea", 
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)", 
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
            },
            textAlign: 'center'
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
        <Typography variant="h4">API Endpoints</Typography>
        <Box sx={{
            maxWidth: "120vh", 
            margin: "2rem auto", 
            padding: "2rem",
            background: "linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%)", 
            borderRadius: "16px", 
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", 
            color: "#333", 
            fontSize: "1.1rem",
            lineHeight: "1.8", 
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #eaeaea", 
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)", 
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
            },
          }}
          >
            <ReactMarkdown components={renderers} children={architectureContent} remarkPlugins={[remarkGfm]} />
        </Box>
        
      </Box>

      {/* Methods Section */}
      <Box id="methods" sx={getSectionStyles}>
        <Typography variant="h3">Methods</Typography>
        <ReactMarkdown components={renderers} children={methodsContent} remarkPlugins={[remarkGfm]} />
      </Box>

      {/* Results Section */}
      <Box id="results" sx={getSectionStyles}>
        <Typography variant="h3">Results</Typography>
        <ReactMarkdown children={resultsContent} remarkPlugins={[remarkGfm]} />
        <Box
          sx={{
            maxWidth: "120vh", 
            margin: "2rem auto", 
            padding: "2rem",
            background: "linear-gradient(135deg, #ffffff 0%, #f7f8fc 100%)", 
            borderRadius: "16px", 
            boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", 
            color: "#333", 
            fontSize: "1.1rem",
            lineHeight: "1.8", 
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #eaeaea", 
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.02)", 
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)", 
            },
            textAlign: 'center'
          }}
        >
            <figure style={{ textAlign: "center" }}>
              <Image
                src={'/result1.png'} 
                alt={'result one'}
                width={3000}
                height={2000}
                style={{ width: "auto", height: "auto", maxWidth: "80%" }}
              />
              <figcaption style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
                The figure shows the test MAE losses across different batch sizes of 1, 3, and 5. This shows
                batch active learning with a greedy approach to point selection. The general goal is to train
                on more data even if the data is generally of lower quality, to gain performance improvements.              
              </figcaption>
            </figure>
            <figure style={{ textAlign: "center" }}>
              <Image
                src={'/result2.png'} 
                alt={'result one'}
                width={3000}
                height={2000}
                style={{ width: "auto", height: "auto", maxWidth: "80%" }}
              />
              <figcaption style={{ marginTop: "10px", fontSize: "14px", color: "#333" }}>
                The figure shows a comparison of the log-scaled test MAE between our Leam-US model and the offline performance of a baseline model.
              </figcaption>
            </figure>
        </Box>
      </Box>

      {/* Demo Section */}
      <Box id="demo" sx={getSectionStyles}>
        <Typography variant="h3">Epidemic Progression</Typography>
        {/* <Bubble /> */}
        {/* <Typography variant="h4">Change Over Time Sequence for Each Status</Typography> */}
        <LinePlot /> 
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
            <TeamMentorCard key={index} {...member} />
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
