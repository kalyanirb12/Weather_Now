# weather-app-starter


---

# Weather App

This is a React-based Weather App that allows users to search for the current weather conditions of a city or country. It fetches weather data from the Open-Meteo API and displays it in an easy-to-read format with weather icons, temperature, humidity, wind speed, visibility, and more.

## Features

- **Location Search**: Search for any city or country to get real-time weather information.
- **Weather Icons**: Displays weather icons based on the current weather conditions.
- **Weather Data**: Shows temperature, feels-like temperature, weather description, humidity, visibility, wind speed, and more.
- **Responsive Design**: Works seamlessly on both mobile and desktop devices.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Axios**: Promise-based HTTP client for making API requests.
- **Open-Meteo API**: Provides free weather data based on latitude and longitude.
- **React Icons**: A library for including icons in the app.

## Setup and Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm or yarn

### Steps to Run the Application

1. Clone this repository:
    ```bash
    git clone https://github.com/your-username/weather-app.git
    ```

2. Navigate to the project folder:
    ```bash
    cd weather-app
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Run the application:
    ```bash
    npm start
    ```

5. Open your browser and go to `http://localhost:3000` to see the app in action.

## How It Works

1. **Location Search**: 
   - The user enters a city or country name in the search bar.
   - Upon submitting the search, the app fetches the geographical coordinates (latitude and longitude) of the location from the Open-Meteo geocoding API.

2. **Weather Data Fetching**:
   - Using the coordinates obtained, the app fetches weather data (including temperature, humidity, wind speed, visibility, etc.) from the Open-Meteo API.

3. **Weather Display**:
   - The weather data is displayed in a user-friendly format, showing current temperature, weather conditions (e.g., sunny, cloudy, rainy), and other details like humidity, visibility, and wind speed.
   - The weather icon updates based on the weather condition (e.g., sunny, cloudy, rainy, etc.).

4. **Error Handling**:
   - If an invalid location is entered or there's an issue with the API requests, appropriate error messages are displayed.

## API Used

- **Open-Meteo API**:
   - Provides free weather forecasts.
   - [Open-Meteo API Documentation](https://open-meteo.com/en/docs)

