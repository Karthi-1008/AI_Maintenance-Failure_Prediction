
import React, { useState, useMemo } from 'react';
import type { Equipment } from '../types.ts';
import Card from './Card.tsx';

// A more sophisticated color function for a smooth gradient
const getThermalColor = (temp: number, minTemp: number, maxTemp: number): string => {
    if (maxTemp === minTemp) return 'hsl(240, 80%, 60%)'; // Default to blue if no range
    // Normalize temperature to a 0-1 range
    const percentage = (temp - minTemp) / (maxTemp - minTemp);
    // Interpolate hue from blue (240) to red (0)
    const hue = 240 - (percentage * 240);
    return `hsl(${hue}, 80%, 60%)`;
};

const ThermalImageClassifier: React.FC<{ equipment: Equipment }> = ({ equipment }) => {
    const { temperature } = equipment;
    const [hoveredCell, setHoveredCell] = useState<{ temp: number; index: number } | null>(null);

    const { minTemp, maxTemp } = useMemo(() => {
        const flatTemps = temperature.flat();
        return {
            minTemp: Math.min(...flatTemps),
            maxTemp: Math.max(...flatTemps),
        };
    }, [temperature]);

    return (
        <Card title="Thermal Image Classifier" className="h-full">
            <div className="flex flex-col sm:flex-row gap-6 h-full items-center justify-center p-2">
                
                {/* Heatmap Grid */}
                <div 
                    className="relative grid grid-cols-10 gap-0.5 w-full max-w-[300px] aspect-square"
                    onMouseLeave={() => setHoveredCell(null)}
                >
                    {temperature.flat().map((temp, index) => {
                        const isHotspot = temp > minTemp + (maxTemp - minTemp) * 0.9;
                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setHoveredCell({ temp, index })}
                                className="w-full h-full rounded-sm transition-transform duration-150 hover:scale-110 hover:z-10"
                                style={{ 
                                    backgroundColor: getThermalColor(temp, minTemp, maxTemp),
                                    boxShadow: isHotspot ? `0 0 8px 1px ${getThermalColor(temp, minTemp, maxTemp)}` : 'none'
                                }}
                            >
                                <div className="aspect-square"></div>
                            </div>
                        );
                    })}
                    
                    {/* Tooltip */}
                    {hoveredCell && (
                        <div 
                            className="absolute bg-slate-900/80 text-white text-xs font-bold px-2 py-1 rounded-md pointer-events-none transition-opacity"
                            style={{
                                top: `${Math.floor(hoveredCell.index / 10) * 10}%`,
                                left: `${(hoveredCell.index % 10) * 10}%`,
                                transform: 'translate(10px, -30px)', // Offset from the cell
                                opacity: 1,
                            }}
                        >
                            {hoveredCell.temp.toFixed(1)}°C
                        </div>
                    )}
                </div>

                {/* Color Scale Legend */}
                <div className="flex sm:flex-col items-center justify-between w-full sm:w-16 h-full max-h-[300px]">
                    <span className="font-bold text-red-500 text-sm">{maxTemp}°C</span>
                    <div 
                        className="flex-1 w-full sm:w-4 h-4 sm:h-full mx-2 sm:my-2 rounded-full"
                        style={{
                            background: `linear-gradient(to top, 
                                ${getThermalColor(minTemp, minTemp, maxTemp)},
                                ${getThermalColor(minTemp + (maxTemp-minTemp)*0.25, minTemp, maxTemp)},
                                ${getThermalColor(minTemp + (maxTemp-minTemp)*0.5, minTemp, maxTemp)},
                                ${getThermalColor(minTemp + (maxTemp-minTemp)*0.75, minTemp, maxTemp)},
                                ${getThermalColor(maxTemp, minTemp, maxTemp)}
                            )`
                        }}
                    ></div>
                    <span className="font-bold text-blue-500 text-sm">{minTemp}°C</span>
                </div>
            </div>
        </Card>
    );
};

export default ThermalImageClassifier;
