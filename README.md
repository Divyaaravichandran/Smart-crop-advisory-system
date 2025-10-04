# Smart Crop Advisory System

A comprehensive web application designed to help small and marginal farmers make informed decisions about their crops through data-driven insights and recommendations.

## Features

### 🌱 Data Integration
- **Weather Forecasts**: Real-time temperature, rainfall, humidity data
- **Soil Health Monitoring**: pH levels, nitrogen, phosphorus, potassium analysis
- **Crop Yield Tracking**: Historical yield data with disease status monitoring
- **Pest & Disease Alerts**: Early warning system for crop protection

### 🤖 Advisory System
- **Crop Recommendations**: AI-powered suggestions based on soil and weather conditions
- **Planting Schedules**: Optimal timing recommendations
- **Fertilizer Guidance**: Soil-specific nutrient recommendations
- **Pest Management**: Integrated pest and disease control strategies

### 📱 Multiple UI Designs
- **Card-based Layout**: Clean, organized dashboard with key metrics
- **Grid Layout with Sidebar**: Professional interface with detailed analytics
- **Mobile-first Design**: Optimized for smartphone usage by farmers

### 🌍 Localization Support
- **English**: Full interface in English
- **Hindi**: Complete Hindi translation for regional farmers
- **Easy Language Switching**: Toggle between languages seamlessly

## Tech Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful, customizable icons
- **Recharts**: Data visualization library

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **SQLite**: Lightweight database
- **CORS**: Cross-origin resource sharing

### Development Tools
- **Concurrently**: Run multiple processes simultaneously
- **ESLint**: Code linting and formatting

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-crop-advisory-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev:full
   ```

   This command will start both the backend server (port 3001) and frontend development server (port 3000).

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Alternative Setup (Windows)

For Windows users, you can use the provided batch script:

```bash
setup.bat
```

### Alternative Setup (Linux/Mac)

For Unix-based systems, use the shell script:

```bash
chmod +x setup.sh
./setup.sh
```

## Project Structure

```
smart-crop-advisory-system/
├── app/                          # Next.js app directory
│   ├── components/               # React components
│   │   ├── cards/               # Dashboard card components
│   │   ├── charts/              # Data visualization components
│   │   ├── DashboardVariant1.tsx # Card-based layout
│   │   ├── DashboardVariant2.tsx # Grid layout with sidebar
│   │   └── DashboardVariant3.tsx # Mobile-first design
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Main dashboard page
│   └── providers.tsx            # Context providers
├── server/                      # Backend server
│   ├── database.js              # SQLite database setup
│   ├── dummyData.js             # Sample data generation
│   └── index.js                 # Express server
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
└── README.md                    # This file
```

## API Endpoints

### Weather Data
- `GET /api/weather/current` - Current weather conditions
- `GET /api/weather/forecast` - Weather forecast (7 days)

### Soil Health
- `GET /api/soil/health` - Current soil health metrics

### Crop Yield
- `GET /api/crops/yield` - Historical yield data

### Pest & Disease
- `GET /api/pests-diseases` - Pest and disease alerts

### Advisory
- `GET /api/advisory/recommendations` - Get recommendations
- `POST /api/advisory/recommendations` - Create new recommendation
- `GET /api/advisory/suggestions` - AI-powered crop suggestions

## Usage

### Dashboard Navigation
1. **Language Toggle**: Click the globe icon to switch between English and Hindi
2. **UI Variants**: Use the "UI Variants" menu to switch between different layouts
3. **Mobile View**: The third variant is optimized for mobile devices

### Data Interpretation
- **Weather Cards**: Show current temperature, humidity, and rainfall
- **Soil Health**: Displays pH levels and nutrient concentrations with optimal ranges
- **Yield Data**: Shows latest and average crop yields with disease status
- **Pest Alerts**: Highlights current pest and disease threats
- **Recommendations**: Provides actionable farming advice

### Mobile Experience
The mobile-first design (Variant 3) features:
- Collapsible sections for easy navigation
- Touch-friendly interface
- Optimized for small screens
- Quick access to essential information

## Customization

### Adding New Data Sources
1. Update the database schema in `server/database.js`
2. Modify the API endpoints in `server/index.js`
3. Update the frontend components to display new data

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Use Tailwind CSS classes for component styling

### Localization
- Add new translations in `app/providers.tsx`
- Update the `translations` object with new language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## Future Enhancements

- [ ] Real-time weather API integration
- [ ] Machine learning models for crop prediction
- [ ] Mobile app development
- [ ] Offline functionality
- [ ] Multi-language support expansion
- [ ] Advanced analytics dashboard
- [ ] Farmer community features
- [ ] Integration with IoT sensors

---

**Built with ❤️ for farmers worldwide**
