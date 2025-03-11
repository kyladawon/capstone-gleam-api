import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const LinePlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);  // State to hold the fetched data
  const [pred, setPred] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('status_1');
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/output.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const predResponse = await fetch("/dummy_pred.json");
        if (!predResponse.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const arrayData = await response.json();
        const predData = await predResponse.json();
        console.log("Fetched Data:", arrayData);
        setData(arrayData);  // Set the fetched data to state
        setPred(predData)
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

      handleResize();
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  // Dataload
  const transformData = (rawData) => {
    const statusData = {};
    
  

    for (let statusIndex = 0; statusIndex < 24; statusIndex++) {
      const statusKey = `status_${statusIndex + 1}`;
      // const statusKey = statusNames[statusIndex + 1];
      const timeValuePairs = [];

      // Aggregate by mean
      for (let timeIndex = 0; timeIndex < 28; timeIndex++) {
        const meanValue = d3.mean(rawData, (d) => d[timeIndex][statusIndex]);
        timeValuePairs.push({
          time: timeIndex + 1,
          value: meanValue,
        });
      }

      statusData[statusKey] = timeValuePairs;
    }

    return statusData;
  };

  let transformedData = {};
  let transformedPred = {};

  if (data) {
    transformedData = transformData(data);
  }

  if (pred) {
    transformedPred = transformData(pred);
  }
  const statusNames = [
    'Total Latent Prevalence',
    'Total Infectious Symptomatic Prevalence',
    'Total Infectious Asymptomatic Prevalence',
    'Total Hospitalized Prevalence',
    'Total ICU Prevalence',
    'Total Removed Asymptomatic Prevalence',
    'Total Removed Symptomatic Prevalence',
    'Total Home Asymptomatic Prevalence',
    'Total Home Mild Prevalence',
    'Total Home Severe Prevalence',
    'Total Removed Hospitalized Prevalence',
    'Total Deaths Hospitalized Prevalence',
    'Total Latent Incidence',
    'Total Infectious Symptomatic Incidence',
    'Total Infectious Asymptomatic Incidence',
    'Total Hospitalized Incidence',
    'Total ICU Incidence',
    'Total Removed Asymptomatic Incidence',
    'Total Removed Symptomatic Incidence',
    'Total Home Asymptomatic Incidence',
    'Total Home Mild Incidence',
    'Total Home Severe Incidence',
    'Total Removed Hospitalized Incidence',
    'Total Deaths Hospitalized Incidence'
  ]

  const statusOptions = Object.keys(transformedData).map((key, index) => ({
    value: key,
    label: `Compartment ${index + 1}: ${statusNames[index]}`,
  }));

  
  // render chart
  const renderLineChart = () => {
    if (!transformedData[selectedStatus] || !transformedPred[selectedStatus]) return;
    const statusData = transformedData[selectedStatus];
    const statusPred = transformedPred[selectedStatus];

    // chart size
    const width = windowSize.width * 0.8;
    const height = windowSize.height * 0.8;
    const margin = { top: 200, right: 100, bottom: 100, left: 100 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // x-axis
    const x = d3.scaleLinear()
      .domain([1, 28])
      .range([margin.left, width - margin.right]);

    // y-axis
    const yMin = d3.min([d3.min(statusData, (d) => d.value),d3.min(statusPred, (d) => d.value)]);
    const yMax = d3.max([d3.max(statusData, (d) => d.value),d3.max(statusPred, (d) => d.value)]);
    if (yMin === undefined || yMax === undefined || isNaN(yMin) || isNaN(yMax)) return;

    const epsilon = 0.01;
    const yDomainMin = yMin === yMax ? yMin - epsilon : yMin;
    const yDomainMax = yMin === yMax ? yMax + epsilon : yMax;

    const y = d3.scaleLinear()
      .domain([yDomainMin*0.9, yDomainMax*1.1])
      .range([height - margin.bottom, margin.top]);
    const line = d3.line()
      .x((d) => x(d.time))
      .y((d) => y(d.value));

    svg.selectAll('*').remove();

    

    // title
    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")  
      .style("font-size", "40px") 
      .style("fill", "white")
      .text(`Individuals in Compartment ${selectedStatus.split('_')[1]} over Time`);


    // line
    svg.append('g')
      .selectAll('path')
      .data([statusData])
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    // Add points to the chart
    svg.append('g')
      .selectAll('circle')
      .data(statusData)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.time))
      .attr('cy', (d) => y(d.value))
      .attr('r', 4)
      .attr('fill', 'steelblue');

    // line
    svg.append('g')
      .selectAll('path')
      .data([statusPred])
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'yellow')
      .attr('stroke-width', 2);

    // Add points to the chart
    svg.append('g')
      .selectAll('circle')
      .data(statusPred)
      .enter()
      .append('circle')
      .attr('cx', (d) => x(d.time))
      .attr('cy', (d) => y(d.value))
      .attr('r', 4)
      .attr('fill', 'yellow');

    // X axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .style("font-size", "18px");

    // X axis label
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", (width /2))
      .attr("y", height - (margin.bottom / 2))
      .text("Days")
      .style("font-size", "20px") 
      .style("fill", "white");
    

    // y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .style("font-size", "18px");

    // y axis label
    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "middle")
      .attr("transform", `rotate(-90)`)
      .attr("x", -height / 2 - 30) // Center vertically
      .attr("y", margin.left / 2 - 35) // Adjust to move closer to the axis
      .text("Number of Individuals")
      .style("font-size", "20px")
      .style("fill", "white");
    
  };

  useEffect(() => {
    if (data) {
      renderLineChart();
    }
  }, [selectedStatus, data]);

  return (
    <div style = {{display: 'flex', flexDirection: 'column',  height:'100%'}}>
      <svg ref={svgRef}></svg>
      <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus} style={{ fontSize: '16px', padding: '5px', width: '500px', fontWeight: 'bold', marginTop:'10px'}}>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
    </div>
  );
};

export default LinePlot;


