import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PriceChart = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        if (data) {
            const svg = d3.select(ref.current);
            svg.selectAll("*").remove(); // Clear previous elements
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const width = +svg.attr("width") - margin.left - margin.right;
            const height = +svg.attr("height") - margin.top - margin.bottom;
            const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleLinear()
                .domain(d3.extent(data, d => parseFloat(d.price)))
                .range([0, width]);

            const histogram = d3.histogram()
                .value(d => parseFloat(d.price))
                .domain(x.domain())
                .thresholds(x.ticks(20));

            const bins = histogram(data);

            const y = d3.scaleLinear()
                .domain([0, d3.max(bins, d => d.length)])
                .range([height, 0]);

            g.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y));

            const bars = g.selectAll("rect")
                .data(bins)
                .enter().append("rect")
                .attr("x", 1)
                .attr("transform", d => `translate(${x(d.x0)},${height})`) // Start from bottom
                .attr("width", d => Math.max(0, x(d.x1) - x(d.x0) - 1))
                .attr("height", 0) // Initial height is 0
                .attr("fill", "steelblue");

            // Animate the bars to their actual height
            bars.transition()
                .duration(1000) // Duration of the animation
                .attr("transform", d => `translate(${x(d.x0)},${y(d.length)})`)
                .attr("height", d => height - y(d.length));
        }
    }, [data]);

    return (
        <svg ref={ref} width="1000" height="400"></svg>
    );
};

export default PriceChart;
