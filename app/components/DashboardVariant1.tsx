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

  // Mock data for when API is not available
  const getMockData = () => {
    return {
      weather: {
        location: 'Default Location',
        date: new Date().toISOString().split('T')[0],
        temperature_min: 22.5,
        temperature_max: 32.8,
        humidity: 65.2,
        rainfall: 12.4,
        wind_speed: 8.3,
        pressure: 1013.2
      },
      soil: {
        location: 'Default Location',
        ph_level: 6.8,
        nitrogen_level: 25.5,
        phosphorus_level: 18.2,
        potassium_level: 32.1,
        organic_matter: 3.2,
        moisture_content: 45.8,
        test_date: '2024-01-15'
      },
      yield: [
        {
          sensor_id: 'SENS0001',
          sunlight_hours: 7.27,
          irrigation_type: 'None',
          fertilizer_type: 'Organic',
          pesticide_amount: 6.34,
          sowing_date: '2024-01-15',
          harvest_date: '2024-05-15',
          total_days: 122,
          yield_kg_per_plot: 4408.07,
          latitude: 14.97094,
          longitude: 82.99769,
          ndvi_index: 0.63,
          crop_disease_status: 'Mild'
        },
        {
          sensor_id: 'SENS0002',
          sunlight_hours: 5.67,
          irrigation_type: 'Sprinkler',
          fertilizer_type: 'Inorganic',
          pesticide_amount: 9.6,
          sowing_date: '2024-02-01',
          harvest_date: '2024-05-23',
          total_days: 112,
          yield_kg_per_plot: 5389.98,
          latitude: 16.61302,
          longitude: 70.86901,
          ndvi_index: 0.58,
          crop_disease_status: 'None'
        },
        {
          sensor_id: 'SENS0003',
          sunlight_hours: 8.23,
          irrigation_type: 'Drip',
          fertilizer_type: 'Mixed',
          pesticide_amount: 15.26,
          sowing_date: '2024-01-20',
          harvest_date: '2024-06-12',
          total_days: 144,
          yield_kg_per_plot: 2931.16,
          latitude: 19.50316,
          longitude: 79.06821,
          ndvi_index: 0.8,
          crop_disease_status: 'Severe'
        },
        {
          sensor_id: 'SENS0004',
          sunlight_hours: 6.45,
          irrigation_type: 'Manual',
          fertilizer_type: 'Organic',
          pesticide_amount: 8.12,
          sowing_date: '2024-02-10',
          harvest_date: '2024-06-05',
          total_days: 115,
          yield_kg_per_plot: 4125.33,
          latitude: 18.5204,
          longitude: 73.8567,
          ndvi_index: 0.72,
          crop_disease_status: 'Moderate'
        },
        {
          sensor_id: 'SENS0005',
          sunlight_hours: 7.89,
          irrigation_type: 'Sprinkler',
          fertilizer_type: 'Inorganic',
          pesticide_amount: 12.45,
          sowing_date: '2024-01-25',
          harvest_date: '2024-05-30',
          total_days: 125,
          yield_kg_per_plot: 3654.78,
          latitude: 17.3850,
          longitude: 78.4867,
          ndvi_index: 0.65,
          crop_disease_status: 'None'
        }
      ],
      pests: [
        {
          crop_type: 'Rice',
          pest_name: 'Brown Plant Hopper',
          disease_name: null,
          severity: 'Moderate',
          affected_area: 15.5,
          treatment_recommended: 'Apply neem oil spray and maintain proper water level',
          date_reported: '2024-01-20',
          location: 'Default Location'
        },
        {
          crop_type: 'Wheat',
          pest_name: null,
          disease_name: 'Rust',
          severity: 'High',
          affected_area: 25.8,
          treatment_recommended: 'Apply fungicide and improve air circulation',
          date_reported: '2024-01-18',
          location: 'Mumbai'
        },
        {
          crop_type: 'Maize',
          pest_name: 'Fall Armyworm',
          disease_name: null,
          severity: 'Severe',
          affected_area: 35.2,
          treatment_recommended: 'Use biological control agents and crop rotation',
          date_reported: '2024-01-22',
          location: 'Delhi'
        }
      ],
      advisory: [
        {
          farmer_id: 'FARMER001',
          crop_type: 'Rice',
          recommendation_type: 'fertilizer',
          title: 'Nitrogen Application Recommended',
          description: 'Based on soil test results, apply 50kg of urea per acre',
          priority: 'high',
          status: 'pending'
        },
        {
          farmer_id: 'FARMER002',
          crop_type: 'Wheat',
          recommendation_type: 'pest_control',
          title: 'Pest Alert - Aphids Detected',
          description: 'Monitor crops for aphid infestation and apply appropriate treatment',
          priority: 'medium',
          status: 'pending'
        },
        {
          farmer_id: 'FARMER003',
          crop_type: 'Maize',
          recommendation_type: 'irrigation',
          title: 'Increase Irrigation Frequency',
          description: 'Due to low rainfall forecast, increase irrigation to twice daily',
          priority: 'high',
          status: 'completed'
        },
        {
          farmer_id: 'FARMER004',
          crop_type: 'Soybean',
          recommendation_type: 'soil_management',
          title: 'Soil pH Adjustment Needed',
          description: 'Apply lime to increase soil pH for better nutrient availability',
          priority: 'medium',
          status: 'pending'
        }
      ]
    }
  }

  const fetchDashboardData = async () => {
    try {
      const [weatherRes, soilRes, yieldRes, pestRes, advisoryRes] = await Promise.all([
        fetch('http://localhost:3001/api/weather/current').catch(() => null),
        fetch('http://localhost:3001/api/soil/health').catch(() => null),
        fetch('http://localhost:3001/api/crops/yield?limit=5').catch(() => null),
        fetch('http://localhost:3001/api/pests-diseases').catch(() => null),
        fetch('http://localhost:3001/api/advisory/recommendations').catch(() => null)
      ])

      let weather, soil, yieldData, pests, advisory

      if (weatherRes && weatherRes.ok) {
        weather = await weatherRes.json()
      }
      if (soilRes && soilRes.ok) {
        soil = await soilRes.json()
      }
      if (yieldRes && yieldRes.ok) {
        yieldData = await yieldRes.json()
      }
      if (pestRes && pestRes.ok) {
        pests = await pestRes.json()
      }
      if (advisoryRes && advisoryRes.ok) {
        advisory = await advisoryRes.json()
      }

      // Use mock data if API calls failed or returned empty data
      const mockData = getMockData()
      
      setWeatherData(weather || mockData.weather)
      setSoilData(soil || mockData.soil)
      setYieldData(yieldData && yieldData.length > 0 ? yieldData : mockData.yield)
      setPestData(pests && pests.length > 0 ? pests : mockData.pests)
      setRecommendations(advisory && advisory.length > 0 ? advisory : mockData.advisory)
    } catch (error) {
      console.error('Error fetching dashboard data, using mock data:', error)
      // Use mock data as fallback
      const mockData = getMockData()
      setWeatherData(mockData.weather)
      setSoilData(mockData.soil)
      setYieldData(mockData.yield)
      setPestData(mockData.pests)
      setRecommendations(mockData.advisory)
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
