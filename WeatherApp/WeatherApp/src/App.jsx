import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [isThereLocation, setIsThereLocation] = useState(true);

  const fetchLocation = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${
          import.meta.env.VITE_WEATHER_API
        }&q=${location}&days=7&aqi=yes&alerts=yes`
      );

      setWeatherData(response.data), console.log(response);
    } catch (error) {
      setWeatherData(null);
      setIsThereLocation(false);
      console.log(error);
    }
  };

  const handleLocationChange = (event) => {
    if (event.key === 'Enter') {
      setIsThereLocation(true);
      fetchLocation();
    }
  };
  return (
    <>
      <div className="app-container">
        <h1 className="app-title" id="test">
          Hava Durumu Uygulaması
        </h1>
        <div className="input-container">
          <input
            className="location-input"
            type="text"
            placeholder="Şehir giriniz.."
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={handleLocationChange}
          />
        </div>

        {!isThereLocation && (
          <h2 className="location-error">Şehir bulunamadı...</h2>
        )}
      </div>
      {weatherData && (
        <div className="weather-container">
          {weatherData.forecast.forecastday.map((day) => (
            <div key={day.date} className="day-container">
              <h2 className="date">{day.date}</h2>
              <img
                className="weather-icon"
                src={day.day.condition.icon}
                alt={day.day.condition.text}
              />
              <p className="temperature">{day.day.avgtemp_c} C</p>
              <p className="temperature">{day.day.condition.text}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
