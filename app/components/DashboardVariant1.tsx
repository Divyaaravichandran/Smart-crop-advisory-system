'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../providers'
import WeatherCard from './cards/WeatherCard'
import SoilHealthCard from './cards/SoilHealthCard'
import YieldDataCard from './cards/YieldDataCard'
import PestAlertsCard from './cards/PestAlertsCard'
import RecommendationsCard from './cards/RecommendationsCard'
import WeatherChart from './charts/WeatherChart'
import YieldChart from './charts/YieldChart'
import SoilGauge from './charts/SoilGauge'

export default function DashboardVariant1() {
  const { t } = useLanguage()
  const [weatherData, setWeatherData] = useState(null)
  const [soilData, setSoilData] = useState(null)
  const [yieldData, setYieldData] = useState([])
  const [pestData, setPestData] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])


  const fetchDashboardData = async () => {
    try {
      const [weatherRes, soilRes, yieldRes, pestRes, advisoryRes] = await Promise.all([
        fetch('http://localhost:3001/api/weather/current'),
        fetch('http://localhost:3001/api/soil/health'),
        fetch('http://localhost:3001/api/crops/yield?limit=5'),
        fetch('http://localhost:3001/api/pests-diseases'),
        fetch('http://localhost:3001/api/advisory/recommendations')
      ])

      const weather = await weatherRes.json()
      const soil = await soilRes.json()
      const yieldData = await yieldRes.json()
      const pests = await pestRes.json()
      const advisory = await advisoryRes.json()

      setWeatherData(weather)
      setSoilData(soil)
      setYieldData(yieldData)
      setPestData(pests)
      setRecommendations(advisory)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WeatherCard data={weatherData} />
        <SoilHealthCard data={soilData} />
        <YieldDataCard data={yieldData} />
        <PestAlertsCard data={pestData} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('weather')} Forecast</h3>
          </div>
          <WeatherChart />
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('yield')} Trends</h3>
          </div>
          <YieldChart data={yieldData} />
        </div>
      </div>

      {/* Soil Health Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('ph_level')}</h3>
          </div>
          <SoilGauge 
            value={soilData?.ph_level || 0} 
            min={4} 
            max={10} 
            optimalMin={6} 
            optimalMax={7.5}
            unit="pH"
          />
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('nitrogen')} Level</h3>
          </div>
          <SoilGauge 
            value={soilData?.nitrogen_level || 0} 
            min={0} 
            max={50} 
            optimalMin={20} 
            optimalMax={40}
            unit="ppm"
          />
        </div>
        
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">{t('phosphorus')} Level</h3>
          </div>
          <SoilGauge 
            value={soilData?.phosphorus_level || 0} 
            min={0} 
            max={30} 
            optimalMin={15} 
            optimalMax={25}
            unit="ppm"
          />
        </div>
      </div>

      {/* Recommendations */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{t('recommendations')}</h3>
        </div>
        <RecommendationsCard data={recommendations} />
      </div>
    </div>
  )
}
