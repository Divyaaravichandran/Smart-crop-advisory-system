const express = require('express');
const cors = require('cors');
const db = require('./database');
const { generateDummyData } = require('./dummyData');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Initialize dummy data
generateDummyData();

// Weather API endpoints
app.get('/api/weather/current', (req, res) => {
  const { location } = req.query;
  
  db.get(
    'SELECT * FROM weather_data WHERE location = ? ORDER BY date DESC LIMIT 1',
    [location || 'Default Location'],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row || {});
    }
  );
});

app.get('/api/weather/forecast', (req, res) => {
  const { location, days = 7 } = req.query;
  
  db.all(
    'SELECT * FROM weather_data WHERE location = ? ORDER BY date DESC LIMIT ?',
    [location || 'Default Location', parseInt(days)],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows || []);
    }
  );
});

// Soil health API endpoints
app.get('/api/soil/health', (req, res) => {
  const { location } = req.query;
  
  db.get(
    'SELECT * FROM soil_data WHERE location = ? ORDER BY test_date DESC LIMIT 1',
    [location || 'Default Location'],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(row || {});
    }
  );
});

// Crop yield API endpoints
app.get('/api/crops/yield', (req, res) => {
  const { sensor_id, limit = 10 } = req.query;
  
  let query = 'SELECT * FROM crop_data ORDER BY timestamp DESC';
  let params = [];
  
  if (sensor_id) {
    query = 'SELECT * FROM crop_data WHERE sensor_id = ? ORDER BY timestamp DESC';
    params = [sensor_id];
  }
  
  query += ` LIMIT ${parseInt(limit)}`;
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

// Pest and disease API endpoints
app.get('/api/pests-diseases', (req, res) => {
  const { crop_type, severity } = req.query;
  
  let query = 'SELECT * FROM pest_disease_data WHERE 1=1';
  let params = [];
  
  if (crop_type) {
    query += ' AND crop_type = ?';
    params.push(crop_type);
  }
  
  if (severity) {
    query += ' AND severity = ?';
    params.push(severity);
  }
  
  query += ' ORDER BY date_reported DESC LIMIT 20';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

// Advisory recommendations API endpoints
app.get('/api/advisory/recommendations', (req, res) => {
  const { farmer_id, status } = req.query;
  
  let query = 'SELECT * FROM advisory_recommendations WHERE 1=1';
  let params = [];
  
  if (farmer_id) {
    query += ' AND farmer_id = ?';
    params.push(farmer_id);
  }
  
  if (status) {
    query += ' AND status = ?';
    params.push(status);
  }
  
  query += ' ORDER BY created_at DESC';
  
  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows || []);
  });
});

app.post('/api/advisory/recommendations', (req, res) => {
  const { farmer_id, crop_type, recommendation_type, title, description, priority } = req.body;
  
  db.run(
    'INSERT INTO advisory_recommendations (farmer_id, crop_type, recommendation_type, title, description, priority) VALUES (?, ?, ?, ?, ?, ?)',
    [farmer_id, crop_type, recommendation_type, title, description, priority],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: this.lastID, message: 'Recommendation created successfully' });
    }
  );
});

// Crop advisory logic endpoint
app.get('/api/advisory/suggestions', (req, res) => {
  const { location, crop_type } = req.query;
  
  // Get current weather and soil data
  db.get(
    'SELECT * FROM weather_data WHERE location = ? ORDER BY date DESC LIMIT 1',
    [location || 'Default Location'],
    (err, weather) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      db.get(
        'SELECT * FROM soil_data WHERE location = ? ORDER BY test_date DESC LIMIT 1',
        [location || 'Default Location'],
        (err, soil) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          
          // Generate crop advisory suggestions
          const suggestions = generateCropAdvisory(weather, soil, crop_type);
          res.json(suggestions);
        }
      );
    }
  );
});

// Helper function to generate crop advisory suggestions
function generateCropAdvisory(weather, soil, cropType) {
  const suggestions = [];
  
  if (!weather || !soil) {
    return { error: 'Weather or soil data not available' };
  }
  
  // Temperature-based suggestions
  if (weather.temperature_max > 35) {
    suggestions.push({
      type: 'temperature',
      priority: 'high',
      title: 'High Temperature Alert',
      description: 'Temperatures are above 35°C. Consider providing shade or adjusting irrigation timing.',
      recommendation: 'Water crops early morning or late evening to reduce heat stress.'
    });
  }
  
  // Soil pH suggestions
  if (soil.ph_level < 6.0) {
    suggestions.push({
      type: 'soil',
      priority: 'medium',
      title: 'Low Soil pH',
      description: 'Soil pH is below optimal range (6.0-7.0).',
      recommendation: 'Apply lime to increase soil pH for better nutrient availability.'
    });
  } else if (soil.ph_level > 7.5) {
    suggestions.push({
      type: 'soil',
      priority: 'medium',
      title: 'High Soil pH',
      description: 'Soil pH is above optimal range.',
      recommendation: 'Apply sulfur or organic matter to lower soil pH.'
    });
  }
  
  // Nutrient suggestions
  if (soil.nitrogen_level < 20) {
    suggestions.push({
      type: 'fertilizer',
      priority: 'high',
      title: 'Low Nitrogen Level',
      description: 'Nitrogen levels are below recommended range.',
      recommendation: 'Apply nitrogen-rich fertilizer or organic compost.'
    });
  }
  
  if (soil.phosphorus_level < 15) {
    suggestions.push({
      type: 'fertilizer',
      priority: 'medium',
      title: 'Low Phosphorus Level',
      description: 'Phosphorus levels are below recommended range.',
      recommendation: 'Apply phosphorus-rich fertilizer for root development.'
    });
  }
  
  if (soil.potassium_level < 25) {
    suggestions.push({
      type: 'fertilizer',
      priority: 'medium',
      title: 'Low Potassium Level',
      description: 'Potassium levels are below recommended range.',
      recommendation: 'Apply potassium-rich fertilizer for plant health and disease resistance.'
    });
  }
  
  // Rainfall suggestions
  if (weather.rainfall > 50) {
    suggestions.push({
      type: 'irrigation',
      priority: 'low',
      title: 'Heavy Rainfall Expected',
      description: 'Heavy rainfall is forecasted.',
      recommendation: 'Ensure proper drainage and avoid over-irrigation.'
    });
  } else if (weather.rainfall < 5) {
    suggestions.push({
      type: 'irrigation',
      priority: 'high',
      title: 'Low Rainfall',
      description: 'Minimal rainfall expected.',
      recommendation: 'Increase irrigation frequency to maintain soil moisture.'
    });
  }
  
  return {
    weather: weather,
    soil: soil,
    suggestions: suggestions,
    generated_at: new Date().toISOString()
  };
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
