'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface YieldChartProps {
  data: any[]
}

export default function YieldChart({ data }: YieldChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No yield data available</p>
      </div>
    )
  }

  // Transform data for chart
  const chartData = data.map((item, index) => ({
    sensor: `S${index + 1}`,
    yield: item.yield_kg_per_plot,
    disease: item.crop_disease_status === 'None' ? 0 : 
             item.crop_disease_status === 'Mild' ? 1 :
             item.crop_disease_status === 'Moderate' ? 2 : 3
  }))

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sensor" />
          <YAxis />
          <Tooltip 
            formatter={(value, name) => [
              name === 'yield' ? `${value.toFixed(1)} kg` : value,
              name === 'yield' ? 'Yield' : 'Disease Level'
            ]}
          />
          <Bar dataKey="yield" fill="#8b5cf6" name="Yield (kg)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
