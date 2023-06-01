import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ChartDataItem {
  date: string;
  [key: string]: string | number | undefined;
}

interface ChartProps {
  data: ChartDataItem[];
}

export function Chart({ data }: ChartProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const selectedTags = useSelector(
    (state: RootState) => state.data.selectedTags
  );
  const valueType = useSelector((state: RootState) => state.data.valueType);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 600;
    const margin = {
      top: 0.1 * height,
      right: 0.1 * width,
      bottom: 0.1 * height,
      left: 0.1 * width,
    };

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => new Date(d.date)))
      .range([margin.left, width - margin.right]);

    selectedTags.forEach((tag) => {
      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d[tag]?.value ?? 0)])
        .range([height - margin.bottom, margin.top]);

      valueType.forEach((type) => {
        const color = data[0][tag]?.color || "#000";

        if (type === "mean") {
          const line = d3
            .line<ChartDataItem>()
            .defined((d) => !isNaN(d[tag]?.value))
            .x((d) => xScale(new Date(d.date)))
            .y((d) => yScale(d[tag]?.value ?? 0))
            .curve(d3.curveMonotoneX);

          svg
            .append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", color)
            .attr("stroke-width", 1.5)
            .attr("d", line);
        }

        if (type === "original") {
          svg
            .selectAll(`circle.${tag}`)
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => xScale(new Date(d.date)))
            .attr("cy", (d) => yScale(d[tag]?.value ?? 0))
            .attr("r", 3)
            .attr("fill", color);
        }
      });
    });
  }, [data, selectedTags, valueType]);

  return <svg ref={ref} width={800} height={600} fill="transparent"></svg>;
}
