'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function WeatherChart() {
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    fetchWeatherForecast()
  }, [])

  const fetchWeatherForecast = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/weather/forecast?days=7')
      const data = await response.json()
      
      // Transform data for chart
      const chartData = data.map((item: any) => ({
        date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        temperature: item.temperature_max,
        humidity: item.humidity,
        rainfall: item.rainfall
      }))
      
      setWeatherData(chartData)
    } catch (error) {
      console.error('Error fetching weather forecast:', error)
    }
  }

  if (weatherData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weatherData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="temperature" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Temperature (°C)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="humidity" 
            stroke="#10b981" 
            strokeWidth={2}
            name="Humidity (%)"
          />
          <Line 
            yAxisId="right"
            type="monotone" 
            dataKey="rainfall" 
            stroke="#06b6d4" 
            strokeWidth={2}
            name="Rainfall (mm)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
