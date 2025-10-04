const fs = require('fs');
const path = require('path');

class CSVDataService {
  constructor() {
    this.csvPath = path.join(process.cwd(), 'Smart_Farming_Crop_Yield_2024.csv');
    this.data = null;
    this.loadData();
  }

  loadData() {
    try {
      const csvContent = fs.readFileSync(this.csvPath, 'utf8');
      const lines = csvContent.trim().split('\n');
      const headers = lines[0].split(',');
      
      this.data = lines.slice(1).map(line => {
        const values = line.split(',');
        const row = {};
        headers.forEach((header, index) => {
          let value = values[index];
          
          // Convert numeric fields
          if (['soil_moisture_%', 'soil_pH', 'temperature_C', 'rainfall_mm', 'humidity_%', 
               'sunlight_hours', 'pesticide_usage_ml', 'total_days', 'yield_kg_per_hectare', 
               'latitude', 'longitude', 'NDVI_index'].includes(header)) {
            value = parseFloat(value);
          }
          
          row[header] = value;
        });
        return row;
      });
      
      console.log(`Loaded ${this.data.length} records from CSV`);
    } catch (error) {
      console.error('Error loading CSV data:', error);
      this.data = [];
    }
  }

  // Get weather data (aggregated from recent records)
  getWeatherData(location = 'Default Location') {
    if (!this.data || this.data.length === 0) return null;
    
    // Get recent records (last 30 days simulation)
    const recentData = this.data.slice(0, 10);
    const avgTemp = recentData.reduce((sum, row) => sum + row['temperature_C'], 0) / recentData.length;
    const avgHumidity = recentData.reduce((sum, row) => sum + row['humidity_%'], 0) / recentData.length;
    const avgRainfall = recentData.reduce((sum, row) => sum + row['rainfall_mm'], 0) / recentData.length;
    
    return {
      location: location,
      date: new Date().toISOString().split('T')[0],
      temperature_min: Math.round((avgTemp - 5) * 10) / 10,
      temperature_max: Math.round((avgTemp + 5) * 10) / 10,
      humidity: Math.round(avgHumidity * 10) / 10,
      rainfall: Math.round(avgRainfall * 10) / 10,
      wind_speed: Math.round((Math.random() * 10 + 5) * 10) / 10,
      pressure: Math.round((Math.random() * 50 + 1000) * 10) / 10
    };
  }

  // Get soil health data (aggregated from recent records)
  getSoilData(location = 'Default Location') {
    if (!this.data || this.data.length === 0) return null;
    
    const recentData = this.data.slice(0, 10);
    const avgPH = recentData.reduce((sum, row) => sum + row['soil_pH'], 0) / recentData.length;
    const avgMoisture = recentData.reduce((sum, row) => sum + row['soil_moisture_%'], 0) / recentData.length;
    
    return {
      location: location,
      ph_level: Math.round(avgPH * 100) / 100,
      nitrogen_level: Math.round((Math.random() * 20 + 15) * 10) / 10, // Simulated
      phosphorus_level: Math.round((Math.random() * 15 + 10) * 10) / 10, // Simulated
      potassium_level: Math.round((Math.random() * 20 + 20) * 10) / 10, // Simulated
      organic_matter: Math.round((Math.random() * 2 + 2) * 10) / 10, // Simulated
      moisture_content: Math.round(avgMoisture * 10) / 10,
      test_date: new Date().toISOString().split('T')[0]
    };
  }

  // Get yield data (recent records)
  getYieldData(limit = 10) {
    if (!this.data || this.data.length === 0) return [];
    
    return this.data.slice(0, limit).map(row => ({
      sensor_id: row.sensor_id,
      sunlight_hours: row.sunlight_hours,
      irrigation_type: row.irrigation_type,
      fertilizer_type: row.fertilizer_type,
      pesticide_amount: row.pesticide_usage_ml,
      sowing_date: row.sowing_date,
      harvest_date: row.harvest_date,
      total_days: row.total_days,
      yield_kg_per_plot: row.yield_kg_per_hectare,
      latitude: row.latitude,
      longitude: row.longitude,
      ndvi_index: row.NDVI_index,
      crop_disease_status: row.crop_disease_status
    }));
  }

  // Get pest and disease data (from records with disease status)
  getPestData() {
    if (!this.data || this.data.length === 0) return [];
    
    const pestData = this.data
      .filter(row => row.crop_disease_status !== 'None')
      .slice(0, 10)
      .map(row => ({
        crop_type: row.crop_type,
        pest_name: row.crop_disease_status === 'Severe' ? 'Fall Armyworm' : 
                  row.crop_disease_status === 'Moderate' ? 'Aphids' : 'Mild Infection',
        disease_name: row.crop_disease_status === 'Severe' ? 'Rust' : 
                     row.crop_disease_status === 'Moderate' ? 'Blight' : null,
        severity: row.crop_disease_status === 'Severe' ? 'Severe' : 
                 row.crop_disease_status === 'Moderate' ? 'Moderate' : 'Low',
        affected_area: Math.round((Math.random() * 30 + 10) * 10) / 10,
        treatment_recommended: this.getTreatmentRecommendation(row.crop_disease_status, row.crop_type),
        date_reported: row.timestamp,
        location: row.region
      }));
    
    return pestData;
  }

  // Get advisory recommendations based on data analysis
  getAdvisoryData() {
    if (!this.data || this.data.length === 0) return [];
    
    const recommendations = [];
    const recentData = this.data.slice(0, 20);
    
    // Analyze soil pH issues
    const lowPHCount = recentData.filter(row => row['soil_pH'] < 6.0).length;
    if (lowPHCount > 0) {
      recommendations.push({
        farmer_id: 'FARMER001',
        crop_type: 'Mixed Crops',
        recommendation_type: 'soil_management',
        title: 'Soil pH Adjustment Needed',
        description: `${lowPHCount} farms have low soil pH. Apply lime to increase soil pH for better nutrient availability.`,
        priority: 'high',
        status: 'pending'
      });
    }
    
    // Analyze low yield issues
    const lowYieldCount = recentData.filter(row => row.yield_kg_per_hectare < 3000).length;
    if (lowYieldCount > 0) {
      recommendations.push({
        farmer_id: 'FARMER002',
        crop_type: 'Mixed Crops',
        recommendation_type: 'fertilizer',
        title: 'Low Yield Alert',
        description: `${lowYieldCount} farms showing low yield. Consider increasing fertilizer application and improving irrigation.`,
        priority: 'medium',
        status: 'pending'
      });
    }
    
    // Analyze disease issues
    const diseaseCount = recentData.filter(row => row.crop_disease_status !== 'None').length;
    if (diseaseCount > 0) {
      recommendations.push({
        farmer_id: 'FARMER003',
        crop_type: 'Mixed Crops',
        recommendation_type: 'pest_control',
        title: 'Disease Management Required',
        description: `${diseaseCount} farms affected by diseases. Implement proper pest control measures and crop rotation.`,
        priority: 'high',
        status: 'pending'
      });
    }
    
    // Analyze irrigation needs
    const lowMoistureCount = recentData.filter(row => row['soil_moisture_%'] < 20).length;
    if (lowMoistureCount > 0) {
      recommendations.push({
        farmer_id: 'FARMER004',
        crop_type: 'Mixed Crops',
        recommendation_type: 'irrigation',
        title: 'Irrigation Optimization',
        description: `${lowMoistureCount} farms have low soil moisture. Increase irrigation frequency and improve water management.`,
        priority: 'medium',
        status: 'completed'
      });
    }
    
    return recommendations;
  }

  getTreatmentRecommendation(diseaseStatus, cropType) {
    const treatments = {
      'Severe': 'Apply fungicide immediately and consider crop rotation. Monitor closely for spread.',
      'Moderate': 'Apply appropriate treatment and improve air circulation. Monitor for improvement.',
      'Mild': 'Apply preventive measures and maintain proper field hygiene.'
    };
    
    return treatments[diseaseStatus] || 'Monitor crop health and apply preventive measures.';
  }

  // Get all data for analysis
  getAllData() {
    return this.data;
  }

  // Get data by crop type
  getDataByCropType(cropType) {
    if (!this.data) return [];
    return this.data.filter(row => row.crop_type === cropType);
  }

  // Get data by region
  getDataByRegion(region) {
    if (!this.data) return [];
    return this.data.filter(row => row.region === region);
  }
}

module.exports = new CSVDataService();
