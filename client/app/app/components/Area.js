import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const AreaPlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);
  const [currentObservation, setCurrentObservation] = useState(0);
  const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
  });

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/comp4_t.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Update window size on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw the chart
  useEffect(() => {
    if (data) {
      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();  // Clear previous content

      const width = windowSize.width * 0.8;
      const height = windowSize.height * 0.8;
      const margin = { top: 40, right: 30, bottom: 70, left: 70 };

      // Set up scales
      const x = d3.scaleLinear()
        .domain([0, data[0].length - 1])
        .range([margin.left, width - margin.right]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data[currentObservation])*1.1])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Create area generator
      const area = d3.area()
        .x((d, i) => x(i))
        .y0(y(0))
        .y1(d => y(d));

      // Add background rectangle
      svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "white");
    

      // Add area
      svg.append("path")
        .datum(data[currentObservation])
        .attr("fill", "#17e1b3ff")
        .attr("d", area);
        

      // Add X axis
      svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data[0].length))
      .selectAll("path, line")  // Select axis lines
      .style("stroke", "black")  // Set line color
      .style("stroke-width", "1px");  // Make axis lines thinner

      svg.selectAll(".tick text")  // Select axis text
      .style("font-size", "14px")  // Adjust font size
      .style("fill", "black");  // Set text color

      // X-axis label
      svg.append("text")
      .attr("class", "x-label")
      .attr("text-anchor", "middle")
      .attr("x", width / 2)
      .attr("y", height - margin.bottom + 40)
      .style("font-size", "18px")  // Adjust label size
      .style("fill", "black")
      .text("Time Sequence");

      // Add Y axis
      svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .selectAll("path, line")  // Select axis lines
      .style("stroke", "black")
      .style("stroke-width", "1px");  // Make axis lines thinner

      svg.selectAll(".tick text")  // Select Y-axis text
      .style("font-size", "14px")  
      .style("fill", "black");  

      // Y-axis label
      svg.append("text")
      .attr("class", "y-label")
      .attr("text-anchor", "middle")
      .attr("x", -height / 2)
      .attr("y", margin.left - 40)
      .attr("transform", "rotate(-90)")
      .style("font-size", "18px")  
      .style("fill", "black")
      .text("Value");

      // title
      svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", margin.top)
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
        // .style("fill", "white")
        .text(`Compartment 4`);
        //Epidemic Progression: Individuals in Compartment 1 Over Time
    
      // Add points to the chart
      // svg.append('g')
      //   .selectAll('circle')
      //   .data(data)
      //   .enter()
      //   .append('circle')
      //   .attr('cx', (d) => x(d.time))
      //   .attr('cy', (d) => y(d.value))
      //   .attr('r', 4)
        // .attr("fill", "black");
        // .attr('fill', '#01b98fff');
  
    }
  }, [data, currentObservation, windowSize]);

  return (
    <div>
      <svg ref={svgRef} width={windowSize.width * 0.8} height={windowSize.height * 0.8}></svg>
      {data && (
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' , width: '95%'}}>
            <label htmlFor="observation-slider" style={{ marginRight: '10px' }}>
              Select Observation:
            </label>
            <input
              id="observation-slider"
              type="range"
              min="0"
              max={data.length - 1}
              value={currentObservation}
              onChange={(e) => setCurrentObservation(Number(e.target.value))}
              style={{ width: '100%' , marginTop:'20px'}}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            Current Observation: {currentObservation}
          </div>
        </>
      )}
    </div>
  );
};

export default AreaPlot;

