import React, { useState } from 'react'
import axios from 'axios'
import './App.css'
import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiNightClear, WiRaindrop, WiCloud, WiSunrise, WiSunset, WiDayRain, WiNightRain } from 'react-icons/wi';
import Navbar from './assets/component/Navbar';
import Footer from './assets/component/Footer';
      
const App = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)

  const getWeather = () => {
    if (!city) return;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=643e3f9d465c8cca491101ad8436f87c&units=metric`)
      .then(function (response) {
        setWeather(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <Navbar city={weather ? weather.name : ''} country={weather ? weather.sys.country : ''} />
      <div className="weather-container">
        <h1>WEATHER</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Check Weather</button>
        {weather && (
          <div className="weather-info">
            <p className="city-name">
              City: {weather.name}, {weather.sys.country}
            </p>
            <p className="condition">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                style={{ verticalAlign: 'middle', width: '40px', height: '40px', marginRight: '8px' }}
              />
              {weather.weather[0].description}
            </p>
            <p className={`day-night${(() => { const now = Math.floor(Date.now() / 1000); return now > weather.sys.sunrise && now < weather.sys.sunset ? '' : ' night'; })()}`}>
              {(() => {
                const now = Math.floor(Date.now() / 1000);
                if (now > weather.sys.sunrise && now < weather.sys.sunset) {
                  return <WiDaySunny style={{ color: '#fbbf24', fontSize: '2rem', verticalAlign: 'middle', marginRight: '8px' }} />;
                } else {
                  return <WiNightClear style={{ color: '#3b82f6', fontSize: '2rem', verticalAlign: 'middle', marginRight: '8px' }} />;
                }
              })()}
              {(() => {
                const now = Math.floor(Date.now() / 1000);
                return now > weather.sys.sunrise && now < weather.sys.sunset ? 'Day' : 'Night';
              })()}
            </p>
            <p className="temperature">
              <WiBarometer style={{ color: '#ff6f61', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Temperature: {weather.main.temp} °C
            </p>
            <p className="feels-like">
              <WiBarometer style={{ color: '#ffb703', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Feels Like: {weather.main.feels_like} °C
            </p>
            <p className="humidity">
              <WiHumidity style={{ color: '#219ebc', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Humidity: {weather.main.humidity} %
            </p>
            <p className="wind">
              <WiStrongWind style={{ color: '#00b4d8', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Wind Speed: {weather.wind.speed} m/s
            </p>
            <p className="pressure">
              <WiBarometer style={{ color: '#adb5bd', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Pressure: {weather.main.pressure} hPa
            </p>
            <p className="visibility">
              <WiCloud style={{ color: '#495057', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Visibility: {weather.visibility} m
            </p>
            {weather.rain ? (
              <p>
                <WiRaindrop style={{ color: '#3b82f6', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
                Rain: {weather.rain['1h'] || weather.rain['3h']} mm
              </p>
            ) : (
              weather.weather[0].main.toLowerCase().includes('rain') && (
                <p>
                  <WiRaindrop style={{ color: '#3b82f6', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
                  Rain chance
                </p>
              )
            )}
            <p className="sunrise">
              <WiSunrise style={{ color: '#fb8500', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>
            <p className="sunset">
              <WiSunset style={{ color: '#fb8500', fontSize: '1.5rem', verticalAlign: 'middle', marginRight: '8px' }} />
              Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default App