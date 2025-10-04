'use client'

import { useLanguage } from '../../providers'
import { Bug, AlertCircle, Shield } from 'lucide-react'

interface PestAlertsCardProps {
  data: any[]
}

export default function PestAlertsCard({ data }: PestAlertsCardProps) {
  const { t } = useLanguage()

  if (!data || data.length === 0) {
    return (
      <div className="card">
        <div className="card-header">
          <Bug className="h-6 w-6 text-red-500" />
          <h3 className="card-title">{t('pests')}</h3>
        </div>
        <div className="text-center py-4">
          <p className="text-gray-500">No alerts</p>
        </div>
      </div>
    )
  }

  const highSeverity = data.filter(item => item.severity === 'Severe').length
  const moderateSeverity = data.filter(item => item.severity === 'Moderate').length
  const totalAffected = data.reduce((sum, item) => sum + item.affected_area, 0)

  return (
    <div className="card bg-gradient-to-br from-red-50 to-red-100">
      <div className="card-header">
        <Bug className="h-6 w-6 text-red-500" />
        <h3 className="card-title">{t('pests')}</h3>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span className="text-sm text-gray-600">High Severity</span>
          </div>
          <span className="metric-value text-lg text-red-600">
            {highSeverity}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-gray-600">Moderate</span>
          </div>
          <span className="metric-value text-lg text-yellow-600">
            {moderateSeverity}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Total Affected</span>
          </div>
          <span className="metric-value text-lg">
            {totalAffected.toFixed(1)} acres
          </span>
        </div>
      </div>
    </div>
  )
}
