'use client'

interface SoilGaugeProps {
  value: number
  min: number
  max: number
  optimalMin: number
  optimalMax: number
  unit: string
}

export default function SoilGauge({ value, min, max, optimalMin, optimalMax, unit }: SoilGaugeProps) {
  const percentage = ((value - min) / (max - min)) * 100
  const optimalPercentage = ((optimalMax - optimalMin) / (max - min)) * 100
  const optimalStartPercentage = ((optimalMin - min) / (max - min)) * 100

  const getStatusColor = () => {
    if (value < optimalMin) return '#ef4444' // red
    if (value > optimalMax) return '#f59e0b' // yellow
    return '#10b981' // green
  }

  const getStatusText = () => {
    if (value < optimalMin) return 'Low'
    if (value > optimalMax) return 'High'
    return 'Optimal'
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Circular Gauge */}
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Optimal range */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="#10b981"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${optimalPercentage * 2.51} ${(100 - optimalPercentage) * 2.51}`}
            strokeDashoffset={`${(100 - optimalStartPercentage) * 2.51}`}
            opacity="0.3"
          />
          
          {/* Value arc */}
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke={getStatusColor()}
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${percentage * 2.51} ${(100 - percentage) * 2.51}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">
            {value.toFixed(1)}
          </span>
          <span className="text-xs text-gray-600">{unit}</span>
        </div>
      </div>
      
      {/* Status */}
      <div className="text-center">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          value < optimalMin ? 'bg-red-100 text-red-800' :
          value > optimalMax ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {getStatusText()}
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Optimal: {optimalMin}-{optimalMax} {unit}
        </p>
      </div>
    </div>
  )
}
