import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  isPositive: boolean;
  dataPoints?: number;
  className?: string;
}

const StockChart: React.FC<StockChartProps> = ({ isPositive, dataPoints = 20, className = "h-48" }) => {
  const data = useMemo(() => {
    const points = [];
    let currentVal = 100;
    for (let i = 0; i < dataPoints; i++) {
      const change = (Math.random() - 0.5) * 5;
      currentVal += change;
      // Bias the trend based on isPositive
      if (isPositive) currentVal += 0.5;
      else currentVal -= 0.5;
      
      points.push({
        time: `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '00' : '30'}`,
        value: currentVal
      });
    }
    return points;
  }, [isPositive, dataPoints]);

  const color = isPositive ? '#eb4e3d' : '#249e6b';

  return (
    <div className={`w-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`colorValue-${isPositive}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            hide 
            domain={['auto', 'auto']}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', fontSize: '12px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            itemStyle={{ color: '#333' }}
            formatter={(value: number) => [value.toFixed(2), '价格']}
          />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={2}
            fillOpacity={1} 
            fill={`url(#colorValue-${isPositive})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;