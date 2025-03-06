import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const LinePlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);  // State to hold the fetched data
  const [selectedStatus, setSelectedStatus] = useState('status_1');
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

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
        setData(arrayData);  // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Dataload
  const transformData = (rawData) => {
    const statusData = {};

    for (let statusIndex = 0; statusIndex < 24; statusIndex++) {
      const statusKey = `status_${statusIndex + 1}`;
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

  if (data) {
    transformedData = transformData(data);
  }

  const statusOptions = Object.keys(transformedData);

  // render chart
  const renderLineChart = () => {
    if (!transformedData[selectedStatus]) return;
    const statusData = transformedData[selectedStatus];

    // chart size
    const width = windowSize.width * 0.8;
    const height = windowSize.height * 0.8;
    const margin = { top: 200, right: 100, bottom: 40, left: 100 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // x-axis
    const x = d3.scaleLinear()
      .domain([1, 28])
      .range([margin.left, width - margin.right]);

    // y-axis
    const yMin = d3.min(statusData, (d) => d.value);
    const yMax = d3.max(statusData, (d) => d.value);
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
      .text(`Change over Time Sequence at Status = ${selectedStatus.split('_')[1]}`);

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

    // X axis
    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .style("font-size", "18px");

    // y axis
    svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y))
      .style("font-size", "18px");
    
  };

  useEffect(() => {
    if (data) {
      renderLineChart();
    }
  }, [selectedStatus, data]);

  return (
    <div>
      <select onChange={(e) => setSelectedStatus(e.target.value)} value={selectedStatus} style={{ fontSize: '16px', padding: '5px', width: '120px', fontWeight: 'bold' }}>
        {statusOptions.map((status, index) => (
          <option key={index} value={status}>
            {`Status ${index + 1}`}
          </option>
        ))}
      </select>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LinePlot;


