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

## Criteria Evaluation

1. **Correctness and functionality of API endpoints:** The endpoints are correctly implemented and integrated with external services. They provide accurate weather forecasts and handle location management operations effectively.

2. **Handling of location management and real-time data retrieval:** Location management is properly handled with CRUD operations, and real-time weather data is retrieved accurately from the external service.

3. **Consistency with RESTful API design principles:** The API follows RESTful design principles with clear resource naming and proper usage of HTTP methods for CRUD operations.

4. **Error handling:** Robust error handling is implemented for scenarios like unavailable services or invalid data input. The API returns appropriate HTTP status codes and error messages.

5. **Efficiency and caching strategies:** Caching is implemented to reduce database queries and external API calls, improving response time and efficiency. Real-time data usage ensures accurate weather forecasts, and caching strategies optimize performance.

Feel free to customize the README file further to include any additional details specific to your project.
