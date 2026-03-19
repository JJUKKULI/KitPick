'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface PriceTrendChartProps {
  data: { date: string; price: number }[];
  className?: string;
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-overlay border border-surface-border p-3 rounded-lg shadow-xl">
        <p className="text-zinc-400 text-xs mb-1">{label}</p>
        <p className="text-white font-medium">₩{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
}

export function PriceTrendChart({ data, className = '' }: PriceTrendChartProps) {
  const minPrice = Math.min(...data.map((d) => d.price)) * 0.9;
  const maxPrice = Math.max(...data.map((d) => d.price)) * 1.1;

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              {/* brand-500 = #BE1F35 */}
              <stop offset="5%" stopColor="#BE1F35" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#BE1F35" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} dy={10} />
          <YAxis
            stroke="#71717a" fontSize={12} tickLine={false} axisLine={false}
            tickFormatter={(v) => `$${v}`}
            domain={[minPrice, maxPrice]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone" dataKey="price"
            stroke="#BE1F35" strokeWidth={2}
            fillOpacity={1} fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
