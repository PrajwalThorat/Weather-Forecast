# Real-time Weather Forecast API

This project is a RESTful API that provides real-time weather forecasts based on geographical locations. It fetches data from an external weather service and exposes endpoints to manage locations and retrieve weather information.

## Setup Steps

1. **Clone the repository:**

2. **Install dependencies:**

3. **Set up environment variables:**
Create a `.env` file in the root directory and add the following variables:

4. **Run the server:**

## API Endpoints

### 1. Location Management

- **GET /locations:** Get all locations.
- **POST /locations:** Add a new location. Required fields: name, latitude, longitude.
- **GET /locations/:location_id:** Get a specific location by ID.
- **PUT /locations/:location_id:** Update a specific location by ID.
- **DELETE /locations/:location_id:** Delete a specific location by ID.

### 2. Weather Forecast

- **GET /locations/:location_id/weather:** Get the weather forecast for a specific location.

### 3. Historical Data

- **GET /history?days=<number_of_days>:** Get historical weather data for the last <number_of_days> days.

## External Services

- **MongoDB:** This project uses MongoDB to store location data. Make sure to have a MongoDB instance set up and provide the connection URI in the `.env` file.
- **OpenWeatherMap API:** The API fetches real-time weather data from the OpenWeatherMap API. You need to sign up for an API key and provide it in the `.env` file.

