'use client'

import { useLanguage } from '../../providers'
import { TrendingUp, Package, AlertTriangle } from 'lucide-react'

interface YieldDataCardProps {
  data: any[]
}

export default function YieldDataCard({ data }: YieldDataCardProps) {
  const { t } = useLanguage()

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <Package className="h-6 w-6 text-purple-500" />
          <h3 className="card-title">{t('yield')}</h3>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    )
  }

  const latestYield = data[0]
  const averageYield = data.reduce((sum, item) => sum + item.yield_kg_per_plot, 0) / data.length
  const diseaseCount = data.filter(item => item.crop_disease_status !== 'None').length

  return (
    <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="card-header">
        <Package className="h-6 w-6 text-purple-500" />
        <h3 className="card-title">{t('yield')}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Latest Yield</span>
          </div>
          <span className="metric-value text-lg">
            {latestYield.yield_kg_per_plot.toFixed(1)} kg
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Average Yield</span>
          </div>
          <span className="metric-value text-lg">
            {averageYield.toFixed(1)} kg
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Disease Cases</span>
          </div>
          <span className="metric-value text-lg">
            {diseaseCount}/{data.length}
          </span>
        </div>
      </div>
    </div>
  )
}
