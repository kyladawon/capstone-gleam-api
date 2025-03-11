import React, { useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

const LinePlot = () => {
  const svgRef = useRef();
  const [data, setData] = useState(null);  // State to hold the fetched data
  const [pred, setPred] = useState(null);
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

  // Dataload
  const transformData = (rawData) => {
    const statusData = {};
    const statusNames = [
      'total_Latent_prevalence',
      'total_Infectious_symptomatic_prevalence',
      'total_Infectious_asymptomatic_prevalence',
      'total_Hospitalized_prevalence',
      'total_ICU_prevalence',
      'total_Removed_asymptomatic_prevalence',
      'total_Removed_symptomatic_prevalence',
      'total_Home_asymptomatic_prevalence',
      'total_Home_mild_prevalence',
      'total_Home_severe_prevalence',
      'total_Removed_hospitalized_prevalence',
      'total_Deaths_hospitalized_prevalence',
      'total_Latent_incidence',
      'total_Infectious_symptomatic_incidence',
      'total_Infectious_asymptomatic_incidence',
      'total_Hospitalized_incidence',
      'total_ICU_incidence',
      'total_Removed_asymptomatic_incidence',
      'total_Removed_symptomatic_incidence',
      'total_Home_asymptomatic_incidence',
      'total_Home_mild_incidence',
      'total_Home_severe_incidence',
      'total_Removed_hospitalized_incidence',
      'total_Deaths_hospitalized_incidence'
    ]

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

  const statusOptions = Object.keys(transformedData);

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

       // X axis label
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", (width /2))
    .attr("y", height - (margin.bottom / 2))
    .text("Days")
    .style("font-size", "30px") 
    .style("fill", "white");

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


