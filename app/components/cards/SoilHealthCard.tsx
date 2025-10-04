'use client'

import { useLanguage } from '../../providers'
import { Leaf, Activity, Zap } from 'lucide-react'

interface SoilHealthCardProps {
  data: any
}

export default function SoilHealthCard({ data }: SoilHealthCardProps) {
  const { t } = useLanguage()

  if (!data) {
    return (
      <div className="card">
        <div className="card-header">
          <Leaf className="h-6 w-6 text-green-500" />
          <h3 className="card-title">{t('soil')}</h3>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    )
  }

  const getPhStatus = (ph: number) => {
    if (ph < 6.0) return { status: 'warning', text: 'Low' }
    if (ph > 7.5) return { status: 'warning', text: 'High' }
    return { status: 'success', text: 'Optimal' }
  }

  const phStatus = getPhStatus(data.ph_level)

  return (
    <div className="card bg-gradient-to-br from-green-50 to-green-100">
      <div className="card-header">
        <Leaf className="h-6 w-6 text-green-500" />
        <h3 className="card-title">{t('soil')}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('ph_level')}</span>
          </div>
          <div className="text-right">
            <span className="metric-value text-lg">{data.ph_level}</span>
            <span className={`status-badge status-${phStatus.status} ml-2`}>
              {phStatus.text}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('nitrogen')}</span>
          </div>
          <span className="metric-value text-lg">
            {data.nitrogen_level} ppm
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{t('phosphorus')}</span>
          </div>
          <span className="metric-value text-lg">
            {data.phosphorus_level} ppm
          </span>
        </div>
      </div>
    </div>
  )
}
