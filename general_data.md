# 🌊 Project Overview

## Project Name

A few options:

### Professional

* **ReefWatch**
* **CoralScope**
* **ReefPulse**


# What is ReefWatch?

**ReefWatch** is a full-stack marine ecosystem monitoring platform that visualizes 
real-world coral reef data and allows researchers to track reef health, biodiversity,
bleaching events, and environmental observations.


# Problem

Coral reefs worldwide are under threat from:

* Climate change
* Coral bleaching
* Ocean acidification
* Pollution
* Biodiversity loss

Researchers and conservationists collect large amounts of reef data, but it is often scattered across different datasets and platforms.

---

# Goal

Create a centralized platform where users can:

* Explore real coral reefs on an interactive map
* View reef metadata
* Monitor bleaching events
* Track species observations
* Analyze reef health trends
* Upload and manage survey data

---

# Data Sources

### Real Reef Data

Source:

* UNEP-WCMC Global Coral Reef Dataset (2018)

Current dataset:



# Tech Stack

## Current

```text
SQLite
Python
VS Code
```

---

## Backend

```text
FastAPI
SQLAlchemy
SQLite
```

---

## Frontend

```text
React
Leaflet
Chart.js
```


# Database Design

## Core Tables

### Reef

Stores real coral reef locations.

```text
ReefID
Name
Latitude
Longitude
Area
VerificationStatus
SurveyMethod
```

---

### Species

Marine organisms.

```text
SpeciesID
ScientificName
CommonName
Category
ConservationStatus
```

---

### Observation

Species sightings.

```text
ObservationID
ReefID
SpeciesID
Date
PopulationCount
```

---

### BleachingEvent

Tracks reef bleaching.

```text
EventID
ReefID
Date
Severity
PercentageAffected
```

---

### User

Researchers and contributors.

```text
UserID
Name
Email
Role
```

---

### Survey

Field surveys.

```text
SurveyID
UserID
ReefID
Date
Notes
```

---

### Photo

Survey photos.

```text
PhotoID
SurveyID
ImageURL
Caption
```

---

# Features (MVP)

## 1. Reef Explorer

Interactive world map.

Users can:

* Zoom
* Pan
* Click reefs

---

## 2. Reef Information Page

Shows:

```text
Name
Location
Area
Health Status
Species Count
```

---

## 3. Species Explorer

Search marine species.

---

## 4. Dashboard

Statistics such as:

```text
Total Reefs
Total Species
Active Bleaching Events
Recent Surveys
```

---

# Future Features

## Reef Health Score

Calculated using:

* Bleaching history
* Species diversity
* Environmental measurements

---

## Heat Maps

Visualize:

* Reef density
* Bleaching severity
* Biodiversity hotspots

---

## Time-Series Analytics

Track reef changes over time.

---

## Citizen Science

Allow divers and researchers to submit observations.

---

# Resume Description

> Built ReefWatch, a full-stack marine ecosystem monitoring platform using real-world coral reef datasets. Designed a normalized relational database, developed APIs for reef and biodiversity data, and created interactive geospatial visualizations to support reef health monitoring and conservation analytics.

---

# End Goal

```text
UNEP Reef Dataset
        ↓
Python ETL
        ↓
SQLite
        ↓
FastAPI
        ↓
React
        ↓
Leaflet Map
        ↓
ReefWatch
```

This moves the project from a simple database exercise into a genuine environmental data platform that showcases databases, APIs, geospatial data, frontend development, and cloud deployment. 🪸🌎🚀

