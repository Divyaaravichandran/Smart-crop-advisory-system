const db = require('./database');

function generateDummyData() {
  console.log('Generating dummy data...');
  
  // Generate crop data based on your dataset
  const cropData = [
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
  ];

  // Generate weather data
  const weatherData = [];
  const locations = ['Default Location', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai'];
  
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    locations.forEach(location => {
      weatherData.push({
        location: location,
        date: date.toISOString().split('T')[0],
        temperature_min: Math.round((Math.random() * 15 + 15) * 10) / 10,
        temperature_max: Math.round((Math.random() * 15 + 25) * 10) / 10,
        humidity: Math.round((Math.random() * 40 + 40) * 10) / 10,
        rainfall: Math.round((Math.random() * 20) * 10) / 10,
        wind_speed: Math.round((Math.random() * 15 + 5) * 10) / 10,
        pressure: Math.round((Math.random() * 50 + 1000) * 10) / 10
      });
    });
  }

  // Generate soil data
  const soilData = [
    {
      location: 'Default Location',
      ph_level: 6.8,
      nitrogen_level: 25.5,
      phosphorus_level: 18.2,
      potassium_level: 32.1,
      organic_matter: 3.2,
      moisture_content: 45.8,
      test_date: '2024-01-15'
    },
    {
      location: 'Mumbai',
      ph_level: 7.2,
      nitrogen_level: 22.1,
      phosphorus_level: 15.8,
      potassium_level: 28.9,
      organic_matter: 2.8,
      moisture_content: 52.3,
      test_date: '2024-01-20'
    },
    {
      location: 'Delhi',
      ph_level: 6.5,
      nitrogen_level: 28.7,
      phosphorus_level: 20.1,
      potassium_level: 35.4,
      organic_matter: 3.5,
      moisture_content: 38.2,
      test_date: '2024-01-18'
    }
  ];

  // Generate pest and disease data
  const pestDiseaseData = [
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
  ];

  // Generate advisory recommendations
  const advisoryData = [
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
    }
  ];

  // Insert data into database
  db.serialize(() => {
    // Clear existing data
    db.run('DELETE FROM crop_data');
    db.run('DELETE FROM weather_data');
    db.run('DELETE FROM soil_data');
    db.run('DELETE FROM pest_disease_data');
    db.run('DELETE FROM advisory_recommendations');

    // Insert crop data
    const cropStmt = db.prepare(`
      INSERT INTO crop_data (
        sensor_id, sunlight_hours, irrigation_type, fertilizer_type, 
        pesticide_amount, sowing_date, harvest_date, total_days, 
        yield_kg_per_plot, latitude, longitude, ndvi_index, crop_disease_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    cropData.forEach(data => {
      cropStmt.run([
        data.sensor_id, data.sunlight_hours, data.irrigation_type, data.fertilizer_type,
        data.pesticide_amount, data.sowing_date, data.harvest_date, data.total_days,
        data.yield_kg_per_plot, data.latitude, data.longitude, data.ndvi_index, data.crop_disease_status
      ]);
    });
    cropStmt.finalize();

    // Insert weather data
    const weatherStmt = db.prepare(`
      INSERT INTO weather_data (
        location, date, temperature_min, temperature_max, humidity, 
        rainfall, wind_speed, pressure
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    weatherData.forEach(data => {
      weatherStmt.run([
        data.location, data.date, data.temperature_min, data.temperature_max,
        data.humidity, data.rainfall, data.wind_speed, data.pressure
      ]);
    });
    weatherStmt.finalize();

    // Insert soil data
    const soilStmt = db.prepare(`
      INSERT INTO soil_data (
        location, ph_level, nitrogen_level, phosphorus_level, 
        potassium_level, organic_matter, moisture_content, test_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    soilData.forEach(data => {
      soilStmt.run([
        data.location, data.ph_level, data.nitrogen_level, data.phosphorus_level,
        data.potassium_level, data.organic_matter, data.moisture_content, data.test_date
      ]);
    });
    soilStmt.finalize();

    // Insert pest and disease data
    const pestStmt = db.prepare(`
      INSERT INTO pest_disease_data (
        crop_type, pest_name, disease_name, severity, affected_area,
        treatment_recommended, date_reported, location
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    pestDiseaseData.forEach(data => {
      pestStmt.run([
        data.crop_type, data.pest_name, data.disease_name, data.severity,
        data.affected_area, data.treatment_recommended, data.date_reported, data.location
      ]);
    });
    pestStmt.finalize();

    // Insert advisory data
    const advisoryStmt = db.prepare(`
      INSERT INTO advisory_recommendations (
        farmer_id, crop_type, recommendation_type, title, description, priority, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    
    advisoryData.forEach(data => {
      advisoryStmt.run([
        data.farmer_id, data.crop_type, data.recommendation_type,
        data.title, data.description, data.priority, data.status
      ]);
    });
    advisoryStmt.finalize();

    console.log('Dummy data generated successfully!');
  });
}

module.exports = { generateDummyData };
