const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'crop_advisory.db');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Crop data table (based on your dataset)
  db.run(`
    CREATE TABLE IF NOT EXISTS crop_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sensor_id TEXT NOT NULL,
      sunlight_hours REAL,
      irrigation_type TEXT,
      fertilizer_type TEXT,
      pesticide_amount REAL,
      sowing_date TEXT,
      harvest_date TEXT,
      total_days INTEGER,
      yield_kg_per_plot REAL,
      latitude REAL,
      longitude REAL,
      ndvi_index REAL,
      crop_disease_status TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Weather data table
  db.run(`
    CREATE TABLE IF NOT EXISTS weather_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      date DATE NOT NULL,
      temperature_min REAL,
      temperature_max REAL,
      humidity REAL,
      rainfall REAL,
      wind_speed REAL,
      pressure REAL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Soil health data table
  db.run(`
    CREATE TABLE IF NOT EXISTS soil_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT NOT NULL,
      ph_level REAL,
      nitrogen_level REAL,
      phosphorus_level REAL,
      potassium_level REAL,
      organic_matter REAL,
      moisture_content REAL,
      test_date DATE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Pest and disease data table
  db.run(`
    CREATE TABLE IF NOT EXISTS pest_disease_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      crop_type TEXT NOT NULL,
      pest_name TEXT,
      disease_name TEXT,
      severity TEXT,
      affected_area REAL,
      treatment_recommended TEXT,
      date_reported DATE,
      location TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Advisory recommendations table
  db.run(`
    CREATE TABLE IF NOT EXISTS advisory_recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      farmer_id TEXT,
      crop_type TEXT,
      recommendation_type TEXT,
      title TEXT,
      description TEXT,
      priority TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Database tables created successfully');
});

module.exports = db;
