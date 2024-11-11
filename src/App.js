import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";
import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
  BsWind,
  BsDroplet,
} from "react-icons/bs";

const App = () => {
  const [location, setLocation] = useState("Pune");
  const [searchedLocation, setSearchedLocation] = useState("Pune");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("");

  const weatherDescriptions = {
    // (Your weather descriptions here)
  };

  const getWeatherIcon = (code) => {
    // (Your weather icon logic here)
  };

  const fetchWeather = async () => {
    if (!searchedLocation) return;

    setLoading(true);
    setError(null);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchedLocation}&count=1&language=en&format=json`;
      const geoResponse = await axios.get(geoUrl);

      if (geoResponse.data.results && geoResponse.data.results.length > 0) {
        const { latitude, longitude, country } = geoResponse.data.results[0];
        setCountry(country);

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,apparent_temperature,weathercode,visibility,relative_humidity_2m,windspeed_10m`;
        const weatherResponse = await axios.get(weatherUrl);

        if (weatherResponse.data.hourly) {
          setWeatherData({
            temperature: weatherResponse.data.hourly.temperature_2m[0],
            feelsLike: weatherResponse.data.hourly.apparent_temperature[0],
            weatherCode: weatherResponse.data.hourly.weathercode[0],
            description:
              weatherDescriptions[weatherResponse.data.hourly.weathercode[0]] ||
              "No description",
            visibility: weatherResponse.data.hourly.visibility[0],
            humidity: weatherResponse.data.hourly.relative_humidity_2m[0],
            windSpeed: weatherResponse.data.hourly.windspeed_10m[0],
          });
        } else {
          setError("Weather data unavailable. Please try again.");
        }
      } else {
        setError("Location not found. Please enter a valid city or country.");
      }
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (location.trim() !== "") {
      setSearchedLocation(location);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [searchedLocation]);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  return (
    <div className="w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0">
      {error && !loading && (
        <div className="w-full text-center bg-red-500 text-white py-3">
          {error}
        </div>
      )}

      <form
        className="h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8"
        onSubmit={handleSearchClick}
      >
        <div className="h-full relative flex items-center justify-between p-2">
          <input
            className="flex-1 bg-transparent outline-none placeholder:text-white text-[15px] font-light pl-6 h-full"
            type="text"
            placeholder="Search by city or country"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            className="bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 rounded-full flex justify-center items-center transition"
            type="submit"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>

      <div className="w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6">
        {loading ? (
          <div className="w-full text-center">
            <div className="spinner-border text-white" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : weatherData ? (
          <div className="flex items-center gap-x-5">
            <div className="text-[87px]">
              {getWeatherIcon(weatherData.weatherCode)}
            </div>
            <div className="flex flex-col">
              <div className="text-xl">
                {month} {day}, {year}
              </div>
              <div className="text-2xl font-semibold">
                {searchedLocation}, {country}
              </div>
            </div>
          </div>
        ) : (
          <p>Enter a location to get weather information.</p>
        )}

        {weatherData && (
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[44px] leading-none font-light">
                {weatherData.temperature}°C
              </div>
            </div>
            <div className="capitalize text-center">
              {weatherData.description}
            </div>
          </div>
        )}

        {weatherData && (
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsEye />
                </div>
                <div className="ml-2">
                  Visibility: {weatherData.visibility / 1000} km
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsThermometer />
                </div>
                <div className="ml-2">
                  Feels like: {weatherData.feelsLike}°C
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsDroplet />
                </div>
                <div className="ml-2">Humidity: {weatherData.humidity}%</div>
              </div>
              <div className="flex items-center gap-x-2">
                <div className="text-[20px]">
                  <BsWind />
                </div>
                <div className="ml-2">Wind: {weatherData.windSpeed} km/h</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
