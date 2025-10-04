'use client'

import { useLanguage } from '../../providers'
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react'

interface WeatherCardProps {
  data: any
}

export default function WeatherCard({ data }: WeatherCardProps) {
  const { t } = useLanguage()

  if (!data) {
    return (
      <div className="card">
        <div className="card-header">
          <Cloud className="h-6 w-6 text-blue-500" />
          <h3 className="card-title">{t('weather')}</h3>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="card-header">
        <Cloud className="h-6 w-6 text-blue-500" />
        <h3 className="card-title">{t('weather')}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('temperature')}</span>
          </div>
          <span className="metric-value text-lg">
            {data.temperature_max}°C
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('humidity')}</span>
          </div>
          <span className="metric-value text-lg">
            {data.humidity}%
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('rainfall')}</span>
          </div>
          <span className="metric-value text-lg">
            {data.rainfall}mm
          </span>
        </div>
      </div>
    </div>
  )
}
