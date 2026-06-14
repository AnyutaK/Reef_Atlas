# Reef Atlas
***An Interactive Full-Stack Geospatial Exploration Platform for Global Coral Reefs***

Reef Atlas is a modern full-stack geospatial web application designed for environmental scientists, researchers, and marine enthusiasts to explore, monitor, and analyze coral reef locations across the globe. By visualizing complex spatial datasets onto an intuitive interface, Reef Atlas transforms raw coordinate data into a responsive,
## Features

### Interactive Global Reef Map
* Map visualization using Leaflet
* Dynamic reef markers sized according to reef area
* Hover effects and detailed reef information popups
* Smooth map navigation with zoom and pan support
* Glowing reef markers to represent bioluminescent algae

### Reef Search
* Search reefs by Name
* Search suggestions with autocomplete
* Fly-to-location functionality
* Focus on individual reef records

### Regional Analytics
* Total visible reefs within current map view
* Average reef area calculations
* Average reef health score calculations
* Largest visible reef identification

### Reef Health Assessment
Reefs are categorized into health grades based on health score:

| Score | Grade |
|---------|---------|
| 80+ | Very Good |
| 60-79 | Good |
| 40-59 | Fair |
| 20-39 | Poor |
| 0-19 | Critical |

### Loading States
* Search loading indicators
* Map data loading indicators
* Responsive UI feedback during data retrieval

### Reef Information
Each reef popup displays:
* Reef name
* Reef ID
* Geographic coordinates
* Area (km²)
* Health score
* Bleaching risk
* Verification status
* Survey method

## Tech Stack
### Frontend
- React
- React Leaflet
- Leaflet
- JavaScript
- CSS
  
### Backend
- FastAPI
- Python
  
### Database
- SQLite
- SQL
  
### Other
- REST API Architecture
- Git
- GitHub

## Architecture

```text
 React Frontend
      ↓
 REST API Requests
      ↓
 FastAPI Backend
      ↓
 SQLite Database
      ↓
 Reef Dataset
```
### File Structure ###
Reef_Atlas/
├── .vscode/
│   └── settings.json
├── backend/
│   ├── __pycache__/
│   ├── database.py
│   └── main.py
├── frontend/
│   ├── node_modules/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── scripts/
│   ├── Reef/
│   ├── coral_reef.db
│   └── import_reefs.py
├── .gitignore
└── README.md

## Installation

### Clone Repository
```text
git clone https://github.com/yourusername/reef-atlas.git
cd reef_atlas
```
### Backend

```text
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on:
```text
http://127.0.0.1:8000
```
### Frontend
``` text
cd frontend
npm install
npm run dev
```
Frontend runs on:
```text
http://localhost:5173
```
## Technical Skills Demonstrated
### Frontend Development
-React
-Component-based UI design
-State management with React Hooks
-Interactive geospatial visualization
-Responsive interface development
### Backend Development
- FastAPI
- REST API development
- Request handling and data processing
-Backend–frontend integration
### Database Management
-SQLite
-SQL querying
-Data preprocessing and validation
-Structured data storage
### Geospatial Development
-Leaflet mapping
-Coordinate-based visualization
-Spatial filtering
-Viewport-based data loading
-Dynamic map interactions
### Software Engineering
-Full-stack application development
-Client-server architecture
-API design
-Modular code organization
-Git version control

## Project Highlights
-Visualized thousands of coral reef records on an interactive global map.
-Implemented viewport-based spatial filtering to improve performance.
-Built real-time reef search with autocomplete suggestions.
-Developed fly-to navigation for rapid location discovery.
-Generated live regional analytics from currently visible reef data.
-Integrated React, FastAPI, SQLite, and Leaflet into a complete full-stack application.
## Performance & Scalability
### Performance Optimizations
-Spatial filtering to load only reefs within the current map bounds
-Dynamic data fetching based on viewport changes
-Search suggestions for efficient reef lookup
-Marker sizing based on reef area for improved visual clarity
-Lightweight REST API responses using FastAPI
-Responsive map rendering with Leaflet
### Scalability Considerations
-Modular React component structure
-Separation of frontend, backend, and database layers
-REST API architecture for future client integrations
-Database-backed reef storage allowing dataset expansion
-Geospatial query design suitable for migration to larger databases such as PostgreSQL
### Maintainability
-Component-based React architecture
-Reusable mapping and navigation components
-Clear separation between UI, API, and data layers
-Consistent REST endpoint design
-Easily extensible reef attribute model
-Version controlled with Git and GitHub
## Notes 
* The data of the coral reefs(location) is taken from UNEP World Conservation Monitoring Centre database ver.2018 available online.
* To improve map accuracy and application performance, reef entries with incomplete or missing data were removed during preprocessing.Consequently, the displayed dataset is a curated subset of the original source data and may not include every known reef location worldwide.
* Known Issue: Visible-region statistics may require a map movement after clearing a search result to trigger a refresh.
* Bleaching Risk and Reef Health Score are synthetic attributes generated for demonstration and visualization purposes.
* The Reef Health Assessment parameters are taken from healthyreefs.org and are based on extensive data from the Atlantic and Gulf Rapid Reef Assessment (AGRRA) database.
## Future Improvements
### Phase 1: User Experience & Performance
-Reef clustering to improve visualization in high-density regions
-Advanced search filters (health score, bleaching risk, area, survey method)
-Improved statistics panel 
-Marker virtualization for smoother rendering at larger scales
-Mobile-responsive redesign
### Phase 2: Geospatial Analysis
-Heatmap visualization of reef density
-Region-based reef analytics
-Interactive reef comparison tools
-Geographic filtering by country, ocean, or marine region
### Phase 3: Environmental Insights
-Historical reef monitoring and trend visualization
-Sea surface temperature overlays
-Coral bleaching event tracking
-Environmental risk indicators
-Reef health change analysis over time
### Phase 4: Data Expansion
-Integration of additional marine conservation datasets
-Support for multiple reef data sources
-User-uploaded reef datasets
