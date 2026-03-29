import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CryptoChartProps {
  symbol: string;
  height?: number;
}

const CryptoChart: React.FC<CryptoChartProps> = ({ symbol, height = 300 }) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Generate mock chart data
  const generateData = (): number[] => {
    const data: number[] = [];
    let value = 100;
    for (let i = 0; i < 30; i++) {
      value += (Math.random() - 0.48) * 10;
      data.push(value);
    }
    return data;
  };

  const chartData = generateData();
  const maxValue = Math.max(...chartData);
  const minValue = Math.min(...chartData);
  const range = maxValue - minValue;
  const change = ((chartData[chartData.length - 1] - chartData[0]) / chartData[0]) * 100;

  const getX = (index: number) => (index / (chartData.length - 1)) * 100;
  const getY = (value: number) => 100 - ((value - minValue) / range) * 80 - 10;

  return (
    <div className="relative" style={{ height }}>
      <svg 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className="w-full h-full"
        onMouseLeave={() => setHoveredPoint(null)}
      >
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((y, i) => (
          <line
            key={i}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="0.3"
          />
        ))}

        {/* Gradient fill */}
        <defs>
          <linearGradient id={`gradient-${symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="0%"
              stopColor={change >= 0 ? '#10B981' : '#EF4444'}
              stopOpacity="0.3"
            />
            <stop
              offset="100%"
              stopColor={change >= 0 ? '#10B981' : '#EF4444'}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Area fill */}
        <path
          d={`M 0 ${getY(chartData[0])} ${chartData.map((d, i) => `L ${getX(i)} ${getY(d)}`).join(' ')} L 100 100 L 0 100 Z`}
          fill={`url(#gradient-${symbol})`}
        />

        {/* Line */}
        <path
          d={`M 0 ${getY(chartData[0])} ${chartData.map((d, i) => `L ${getX(i)} ${getY(d)}`).join(' ')}`}
          fill="none"
          stroke={change >= 0 ? '#10B981' : '#EF4444'}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Hover points */}
        {hoveredPoint !== null && (
          <>
            <circle
              cx={getX(hoveredPoint)}
              cy={getY(chartData[hoveredPoint])}
              r="2"
              fill="white"
              stroke={change >= 0 ? '#10B981' : '#EF4444'}
              strokeWidth="0.5"
            />
          </>
        )}

        {/* Interactive invisible points */}
        {chartData.map((d, i) => (
          <circle
            key={i}
            cx={getX(i)}
            cy={getY(d)}
            r="2"
            fill="transparent"
            onMouseEnter={() => setHoveredPoint(i)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>

      {/* Tooltip */}
      {hoveredPoint !== null && (
        <div className="absolute bg-slate-900 border border-slate-700 rounded-lg p-2 shadow-xl pointer-events-none"
          style={{
            left: `${getX(hoveredPoint)}%`,
            top: `${getY(chartData[hoveredPoint]) - 20}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <p className="text-white text-sm font-semibold">${chartData[hoveredPoint].toFixed(2)}</p>
          <p className="text-slate-400 text-xs">Day {hoveredPoint + 1}</p>
        </div>
      )}
    </div>
  );
};

export default CryptoChart;