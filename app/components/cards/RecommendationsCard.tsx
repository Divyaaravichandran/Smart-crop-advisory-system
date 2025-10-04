'use client'

import { useLanguage } from '../../providers'
import { CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react'

interface RecommendationsCardProps {
  data: any[]
}

export default function RecommendationsCard({ data }: RecommendationsCardProps) {
  const { t } = useLanguage()

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No recommendations available</p>
      </div>
    )
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />
      case 'low':
        return <Info className="h-4 w-4 text-blue-500" />
      default:
        return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-blue-200 bg-blue-50'
      default:
        return 'border-gray-200 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      {data.map((recommendation, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg border ${getPriorityColor(recommendation.priority)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {getPriorityIcon(recommendation.priority)}
                <h4 className="font-semibold text-gray-900">
                  {recommendation.title}
                </h4>
                <span className={`status-badge status-${recommendation.priority === 'high' ? 'danger' : recommendation.priority === 'medium' ? 'warning' : 'info'}`}>
                  {recommendation.priority === 'high' ? t('high_priority') : 
                   recommendation.priority === 'medium' ? t('medium_priority') : t('low_priority')}
                </span>
              </div>
              
              <p className="text-gray-700 text-sm mb-2">
                {recommendation.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Crop: {recommendation.crop_type}</span>
                  <span>Type: {recommendation.recommendation_type}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(recommendation.status)}
                  <span className="text-xs text-gray-500">
                    {recommendation.status === 'completed' ? t('completed') : t('pending')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
