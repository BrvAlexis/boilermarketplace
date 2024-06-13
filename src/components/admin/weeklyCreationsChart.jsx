import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const WeeklyCreationsChart = ({ data }) => {
    const ref = useRef();

    useEffect(() => {
        if (data) {
            const parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
            const adsByWeek = d3.rollups(
                data,
                v => v.length,
                d => d3.timeWeek(parseDate(d.created_at))
            );

            const svg = d3.select(ref.current);
            svg.selectAll("*").remove(); // Clear previous elements
            const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const width = +svg.attr("width") - margin.left - margin.right;
            const height = +svg.attr("height") - margin.top - margin.bottom;
            const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleTime()
                .domain(d3.extent(adsByWeek, d => d[0]))
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(adsByWeek, d => d[1])])
                .range([height, 0]);

            g.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y));

            const line = d3.line()
                .x(d => x(d[0]))
                .y(d => y(d[1]));

            const path = g.append("path")
                .datum(adsByWeek)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", line);

            // Get the total length of the path
            const totalLength = path.node().getTotalLength();

            // Set up the initial attributes for the path
            path
                .attr("stroke-dasharray", `${totalLength} ${totalLength}`)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .duration(2000) // Duration of the animation
                .ease(d3.easeLinear) // Easing function
                .attr("stroke-dashoffset", 0);
        }
    }, [data]);

    return (
        <svg ref={ref} width="1000" height="400"></svg>
    );
};

export default WeeklyCreationsChart;
