'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../providers'
import { 
  Home, 
  Cloud, 
  Leaf, 
  Package, 
  Bug, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react'
import WeatherChart from './charts/WeatherChart'
import YieldChart from './charts/YieldChart'
import SoilGauge from './charts/SoilGauge'

export default function DashboardVariant2() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

  const sidebarItems = [
    { id: 'overview', label: t('dashboard'), icon: Home },
    { id: 'weather', label: t('weather'), icon: Cloud },
    { id: 'soil', label: t('soil'), icon: Leaf },
    { id: 'yield', label: t('yield'), icon: Package },
    { id: 'pests', label: t('pests'), icon: Bug },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('temperature')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {weatherData?.temperature_max || '--'}°C
                    </p>
                  </div>
                  <Cloud className="h-8 w-8 text-blue-500" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-green-50 to-green-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('ph_level')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {soilData?.ph_level || '--'}
                    </p>
                  </div>
                  <Leaf className="h-8 w-8 text-green-500" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('crop_yield')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {yieldData[0]?.yield_kg_per_plot?.toFixed(0) || '--'} kg
                    </p>
                  </div>
                  <Package className="h-8 w-8 text-purple-500" />
                </div>
              </div>
              
              <div className="card bg-gradient-to-br from-red-50 to-red-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{t('pests')}</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {pestData.filter(p => p.severity === 'Severe').length}
                    </p>
                  </div>
                  <Bug className="h-8 w-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="card-title mb-4">{t('weather')} Forecast</h3>
                <WeatherChart />
              </div>
              
              <div className="card">
                <h3 className="card-title mb-4">{t('yield')} Trends</h3>
                <YieldChart data={yieldData} />
              </div>
            </div>
          </div>
        )

      case 'weather':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="card-title mb-4">{t('weather')} Details</h3>
              {weatherData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('temperature')}</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {weatherData.temperature_max}°C
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('humidity')}</p>
                    <p className="text-3xl font-bold text-green-600">
                      {weatherData.humidity}%
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('rainfall')}</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {weatherData.rainfall}mm
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No weather data available</p>
              )}
            </div>
            
            <div className="card">
              <h3 className="card-title mb-4">{t('weather')} Forecast</h3>
              <WeatherChart />
            </div>
          </div>
        )

      case 'soil':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="card-title mb-4">{t('soil')} Health</h3>
              {soilData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('ph_level')}</p>
                    <p className="text-3xl font-bold text-green-600">
                      {soilData.ph_level}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('nitrogen')}</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {soilData.nitrogen_level} ppm
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{t('phosphorus')}</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {soilData.phosphorus_level} ppm
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No soil data available</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="card-title mb-4">{t('ph_level')}</h3>
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
                <h3 className="card-title mb-4">{t('nitrogen')}</h3>
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
                <h3 className="card-title mb-4">{t('phosphorus')}</h3>
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
          </div>
        )

      case 'yield':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="card-title mb-4">{t('yield')} Data</h3>
              <YieldChart data={yieldData} />
            </div>
            
            <div className="card">
              <h3 className="card-title mb-4">Recent Yield Records</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sensor ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Yield (kg)
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('disease_status')}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Days
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {yieldData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.sensor_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.yield_kg_per_plot.toFixed(1)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`status-badge ${
                            item.crop_disease_status === 'None' ? 'status-success' :
                            item.crop_disease_status === 'Mild' ? 'status-warning' :
                            item.crop_disease_status === 'Moderate' ? 'status-warning' :
                            'status-danger'
                          }`}>
                            {item.crop_disease_status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.total_days}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'pests':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="card-title mb-4">{t('pests')} & Diseases</h3>
              <div className="space-y-4">
                {pestData.map((pest, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {pest.pest_name || pest.disease_name}
                      </h4>
                      <span className={`status-badge ${
                        pest.severity === 'Severe' ? 'status-danger' :
                        pest.severity === 'Moderate' ? 'status-warning' :
                        'status-info'
                      }`}>
                        {pest.severity}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      Crop: {pest.crop_type} | Affected Area: {pest.affected_area} acres
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>Treatment:</strong> {pest.treatment_recommended}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="card-title mb-4">{t('weather')} Trends</h3>
                <WeatherChart />
              </div>
              
              <div className="card">
                <h3 className="card-title mb-4">{t('yield')} Analysis</h3>
                <YieldChart data={yieldData} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <h3 className="card-title mb-4">{t('ph_level')}</h3>
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
                <h3 className="card-title mb-4">{t('nitrogen')}</h3>
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
                <h3 className="card-title mb-4">{t('phosphorus')}</h3>
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
          </div>
        )

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="card">
              <h3 className="card-title mb-4">Settings</h3>
              <p className="text-gray-500">Settings panel coming soon...</p>
            </div>
          </div>
        )

      default:
        return <div>Content not found</div>
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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">{t('advisory_system')}</h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            
            <h1 className="text-xl font-semibold text-gray-900">
              {sidebarItems.find(item => item.id === activeTab)?.label}
            </h1>
            
            <div className="text-sm text-gray-500">
              {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
