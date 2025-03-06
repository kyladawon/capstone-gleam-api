import React, { useEffect, useState, useRef } from "react";
import * as Plot from "@observablehq/plot";

const processBubbleData = (data, currentTime, containerWidth, containerHeight) => {
    const bubbleData = [];
    const stages = data[0][0].length;

    // bubble location
    const columns = 6; 
    const rows = 4;
    const rowSpacing = containerHeight / 5 + 0.0001;
    const colSpacing = containerWidth / 7;
    const extraPaddingX = containerWidth * 0.05;
    
    // Normalize for sizing
    let minVal = Infinity;
    let maxVal = -Infinity;

    for (let stage = 0; stage < stages; stage++) {
        const value = data[0][currentTime][stage];
        if (value > 0) {
            minVal = Math.min(minVal, value);
            maxVal = Math.max(maxVal, value);
        }
    }

    // bubble size basic setup
    const MIN_BUBBLE_SIZE = 10;  
    const MAX_BUBBLE_SIZE = 200; 

    // scale for bubble size
    const scaleValue = (value) => {
        const scaledValue = Math.log(value + 1) / Math.log(maxVal + 1); 
        return scaledValue;
    };

    // changing bubble size 
    for (let stage = 0; stage < stages; stage++) {
        const value = data[0][currentTime][stage];
        // const scaledValue = scaleValue(value);

        let bubbleSize = 0;
        if (value > 0) {
            const scaledValue = scaleValue(value);
            bubbleSize = MIN_BUBBLE_SIZE / 100000000 + scaledValue * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE);
        } else {
            bubbleSize = MIN_BUBBLE_SIZE / 100000000; 
        }

        bubbleData.push({
        source: `Stage ${stage + 1}`,
        x: extraPaddingX + (stage % columns) * colSpacing,
        y: (Math.floor(stage / columns) * -rowSpacing) + (stages / columns) * rowSpacing,
        val: bubbleSize,
        color: `rgb(${value % 255}, ${(value + 100) % 255}, ${(value + 200) % 255})`,
        });
    }

    return bubbleData;
};

const Bubble = () => {
  const [data, setData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef(null);
  const plotRef = useRef(null);
  const sliderRef = useRef(null);

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/output.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const arrayData = await response.json();
        console.log("Fetched Data:", arrayData);
        setData(arrayData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  const renderPlot = (time) => {
    if (!plotRef.current || !data) return;

    plotRef.current.innerHTML = ""; 
    
    // plot size
    const containerWidth = plotRef.current.clientWidth;
    const containerHeight = plotRef.current.clientHeight;
    const PLOT_WIDTH = window.innerWidth * 0.9; 
    const PLOT_HEIGHT = window.innerHeight * 0.7; 

    // process data
    const bubbleData = processBubbleData(data, time, containerWidth, containerHeight);
    console.log("Processed Bubble Data:", bubbleData);

    
    const plot = Plot.plot({
        width: PLOT_WIDTH,
        height: PLOT_HEIGHT,
        marginLeft: 70,
        marginBottom: 70,
        marginRight: 70,
        marginTop: 70,
        axis: null,
        marks: [
          // title
          // Plot.text([{
          //   x: PLOT_WIDTH / 2,
          //   y: PLOT_HEIGHT - 50,
          //   text: `Stages Over Time Sequence = ${time}`,
          // }], {
          //   x: "x"
          //   y: "y",
          //   text: "text",
          //   fontSize: 24,
          //   fontWeight: "bold",
          //   textAnchor: "middle",
          // }),
            Plot.dot(bubbleData, {
            x: "x",
            y: "y",
            r: (d) => d.val, // Scale  bubble size 
            fill: "color",
            title: (d) => `${d.source}: ${d.val}`,
            }),
            Plot.text(bubbleData, {
            x: "x",
            y: "y",
            text: "source",
            dy: -10,
            fontSize: 16, // text size
            }),
        ],
        });

    plotRef.current.appendChild(plot);
  };

  // Adjust time changes
  useEffect(() => {
    renderPlot(currentTime);
  }, [currentTime, data]);

  // slider automate interval
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = setInterval(() => {
        setCurrentTime((prevTime) => (prevTime >= 27 ? 0 : prevTime + 1)); 
      }, 1500);
    } else {
      clearInterval(animationRef.current);
    }

    return () => clearInterval(animationRef.current); 
  }, [isPlaying]);


  // automate slider
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsPlaying(true); 
        } else {
          setIsPlaying(false); 
        }
      },
      { threshold: 0.5 } 
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  // slider click function
  const handleSliderChange = (e) => {
    setCurrentTime(e.target.value);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleStop = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div ref={plotRef} id="plot"></div>
      <div ref={sliderRef}>
      <label htmlFor="timeSlider" style={{ fontSize: "30px", fontWeight: "bold" }}>
        Time Sequence: {currentTime}
      </label>

        <input
          type="range"
          id="timeSlider"
          min="0"
          max="27"
          value={currentTime}
          onChange={handleSliderChange}
          style={{width: '100%'}}
        />
      </div>
      <div>
        <button onClick={handlePlay} disabled={isPlaying}>Play</button>
        <button onClick={handleStop} disabled={!isPlaying}>Stop</button>
     </div>
    </div>
  );
};

export default Bubble;

