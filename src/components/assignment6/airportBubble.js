import React from "react";
import { groupByCity } from "./utils";
import { forceSimulation, forceX, forceY, forceCollide, scaleLinear, min, max } from "d3";

function AirportBubble(props) {
    const { width, height, routes, selectedAirline } = props;
    
    if (selectedAirline) {
        // When a specific airline is selected
        let selectedRoutes = routes.filter(a => a.AirlineID === selectedAirline);
        let cities = groupByCity(selectedRoutes);

        cities.sort((a, b) => a.Count - b.Count); // Sort cities by route count

        let radius = scaleLinear()
            .domain([min(cities, d => d.Count), max(cities, d => d.Count)])
            .range([2, width * 0.15]);

        const simulation = forceSimulation(cities)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radius(d.Count)))
            .velocityDecay(0.2);

        for (let i = 0; i < 200; i++) {
            simulation.tick();
        }

        const simulationData = cities;

        return (
            <g>
                {simulationData.map((city, idx) => {
                    const isTop5 = idx >= simulationData.length - 5; // Top 5 hubs
                    return (
                        <g key={idx}>
                            {/* Circle */}
                            <circle
                                cx={city.x}
                                cy={city.y}
                                r={radius(city.Count)}
                                fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                                stroke="black"
                                strokeWidth="2"
                            />
                            {/* Text for Top 5 hubs */}
                            {isTop5 && (
                                <text
                                    x={city.x}
                                    y={city.y}
                                    style={{
                                        textAnchor: "middle",
                                        stroke: "pink",
                                        strokeWidth: "0.5em",
                                        fill: "#992a2a",
                                        fontSize: 16,
                                        fontFamily: "cursive",
                                        paintOrder: "stroke",
                                        strokeLinejoin: "round",
                                    }}
                                >
                                    {city.City}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        );
    } else {
        // When no airline is selected
        let cities = groupByCity(routes);

        cities.sort((a, b) => a.Count - b.Count); // Sort cities by route count

        let radius = scaleLinear()
            .domain([min(cities, d => d.Count), max(cities, d => d.Count)])
            .range([2, width * 0.15]);

        const simulation = forceSimulation(cities)
            .force("x", forceX(width / 2).strength(0.02))
            .force("y", forceY(height / 2).strength(0.02))
            .force("collide", forceCollide(d => radius(d.Count)))
            .velocityDecay(0.2);

        for (let i = 0; i < 200; i++) {
            simulation.tick();
        }

        const simulationData = cities;

        return (
            <g>
                {simulationData.map((city, idx) => {
                    const isTop5 = idx >= simulationData.length - 5; // Top 5 hubs
                    return (
                        <g key={idx}>
                            {/* Circle */}
                            <circle
                                cx={city.x}
                                cy={city.y}
                                r={radius(city.Count)}
                                fill={isTop5 ? "#ADD8E6" : "#2a5599"}
                                stroke="black"
                                strokeWidth="2"
                            />
                            {/* Text for Top 5 hubs */}
                            {isTop5 && (
                                <text
                                    x={city.x}
                                    y={city.y}
                                    style={{
                                        textAnchor: "middle",
                                        stroke: "pink",
                                        strokeWidth: "0.5em",
                                        fill: "#992a2a",
                                        fontSize: 16,
                                        fontFamily: "cursive",
                                        paintOrder: "stroke",
                                        strokeLinejoin: "round",
                                    }}
                                >
                                    {city.City}
                                </text>
                            )}
                        </g>
                    );
                })}
            </g>
        );
    }
}

export { AirportBubble };
