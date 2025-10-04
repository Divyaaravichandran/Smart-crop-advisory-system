'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../providers'
import { 
  Cloud, 
  Leaf, 
  Package, 
  Bug, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  ChevronDown,
  Smartphone
} from 'lucide-react'

export default function DashboardVariant3() {
  const { t } = useLanguage()
  const [expandedSections, setExpandedSections] = useState<string[]>(['weather'])
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

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'low':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getDiseaseStatusColor = (status: string) => {
    switch (status) {
      case 'None':
        return 'bg-green-100 text-green-800'
      case 'Mild':
        return 'bg-yellow-100 text-yellow-800'
      case 'Moderate':
        return 'bg-orange-100 text-orange-800'
      case 'Severe':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
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
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-6 w-6 text-primary-600" />
            <h1 className="text-lg font-bold text-gray-900">{t('advisory_system')}</h1>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <Cloud className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">{t('temperature')}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {weatherData?.temperature_max || '--'}°C
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">{t('ph_level')}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {soilData?.ph_level || '--'}
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-500" />
              <span className="text-sm text-gray-600">{t('crop_yield')}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {yieldData[0]?.yield_kg_per_plot?.toFixed(0) || '--'} kg
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="flex items-center space-x-2">
              <Bug className="h-5 w-5 text-red-500" />
              <span className="text-sm text-gray-600">{t('pests')}</span>
            </div>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {pestData.filter(p => p.severity === 'Severe').length}
            </p>
          </div>
        </div>

        {/* Weather Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection('weather')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <Cloud className="h-6 w-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">{t('weather')}</h3>
            </div>
            {expandedSections.includes('weather') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('weather') && (
            <div className="px-4 pb-4 space-y-3">
              {weatherData ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('temperature')}</span>
                    <span className="font-semibold">{weatherData.temperature_max}°C</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('humidity')}</span>
                    <span className="font-semibold">{weatherData.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('rainfall')}</span>
                    <span className="font-semibold">{weatherData.rainfall}mm</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No weather data available</p>
              )}
            </div>
          )}
        </div>

        {/* Soil Health Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection('soil')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <Leaf className="h-6 w-6 text-green-500" />
              <h3 className="font-semibold text-gray-900">{t('soil')}</h3>
            </div>
            {expandedSections.includes('soil') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('soil') && (
            <div className="px-4 pb-4 space-y-3">
              {soilData ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('ph_level')}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{soilData.ph_level}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        soilData.ph_level < 6.0 || soilData.ph_level > 7.5 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {soilData.ph_level < 6.0 || soilData.ph_level > 7.5 ? 'Check' : 'Good'}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('nitrogen')}</span>
                    <span className="font-semibold">{soilData.nitrogen_level} ppm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('phosphorus')}</span>
                    <span className="font-semibold">{soilData.phosphorus_level} ppm</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{t('potassium')}</span>
                    <span className="font-semibold">{soilData.potassium_level} ppm</span>
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No soil data available</p>
              )}
            </div>
          )}
        </div>

        {/* Yield Data Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection('yield')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-purple-500" />
              <h3 className="font-semibold text-gray-900">{t('yield')}</h3>
            </div>
            {expandedSections.includes('yield') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('yield') && (
            <div className="px-4 pb-4 space-y-3">
              {yieldData.length > 0 ? (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Latest Yield</span>
                    <span className="font-semibold">{yieldData[0].yield_kg_per_plot.toFixed(1)} kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Yield</span>
                    <span className="font-semibold">
                      {(yieldData.reduce((sum, item) => sum + item.yield_kg_per_plot, 0) / yieldData.length).toFixed(1)} kg
                    </span>
                  </div>
                  <div className="space-y-2">
                    <span className="text-sm text-gray-600">Recent Records:</span>
                    {yieldData.slice(0, 3).map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <span className="text-sm">{item.sensor_id}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium">{item.yield_kg_per_plot.toFixed(0)} kg</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getDiseaseStatusColor(item.crop_disease_status)}`}>
                            {item.crop_disease_status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-gray-500 text-sm">No yield data available</p>
              )}
            </div>
          )}
        </div>

        {/* Pest Alerts Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection('pests')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <Bug className="h-6 w-6 text-red-500" />
              <h3 className="font-semibold text-gray-900">{t('pests')}</h3>
              {pestData.filter(p => p.severity === 'Severe').length > 0 && (
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                  {pestData.filter(p => p.severity === 'Severe').length}
                </span>
              )}
            </div>
            {expandedSections.includes('pests') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('pests') && (
            <div className="px-4 pb-4 space-y-3">
              {pestData.length > 0 ? (
                pestData.map((pest, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {pest.pest_name || pest.disease_name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pest.severity === 'Severe' ? 'bg-red-100 text-red-800' :
                        pest.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {pest.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {pest.crop_type} • {pest.affected_area} acres
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Treatment:</strong> {pest.treatment_recommended}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No pest alerts</p>
              )}
            </div>
          )}
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-lg shadow-sm">
          <button
            onClick={() => toggleSection('recommendations')}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-blue-500" />
              <h3 className="font-semibold text-gray-900">{t('recommendations')}</h3>
            </div>
            {expandedSections.includes('recommendations') ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>
          
          {expandedSections.includes('recommendations') && (
            <div className="px-4 pb-4 space-y-3">
              {recommendations.length > 0 ? (
                recommendations.map((rec, index) => (
                  <div key={index} className={`border rounded-lg p-3 ${getPriorityColor(rec.priority)}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium">{rec.title}</h4>
                      <div className="flex items-center space-x-1">
                        {rec.status === 'completed' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>{rec.crop_type} • {rec.recommendation_type}</span>
                      <span className={`px-2 py-1 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {rec.priority === 'high' ? t('high_priority') : 
                         rec.priority === 'medium' ? t('medium_priority') : t('low_priority')}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recommendations available</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="bg-white border-t p-4 mt-8">
        <div className="text-center text-sm text-gray-500">
          <p>{t('mobile_responsive')} • {t('farmer_friendly')}</p>
          <p className="mt-1">Smart Crop Advisory System v1.0</p>
        </div>
      </div>
    </div>
  )
}
