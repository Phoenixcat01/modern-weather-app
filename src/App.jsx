// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import WeatherMap from "./components/WeatherMap";

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeLayer, setActiveLayer] = useState("clouds");

    const fetchWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            if (!response.ok) {
                throw new Error("City not found or API error.");
            }
            const data = await response.json();
            setWeatherData(data);
        } catch (err) {
            setError(err.message);
            setWeatherData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        if (e.key === "Enter" || e.type === "click") {
            fetchWeather();
        }
    };

    return (
        <div className="app-container">
            <header>
                <h1>Modern Weather App</h1>
            </header>

            <main>
                <div className="search-box">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Enter City name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyUp={handleSearch}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                {loading && <p>Loading</p>}
                {error && <p className="error-message">{error}</p>}

                {weatherData && (
                    <div className="weather-data-container">
                        <h2>{weatherData.name}</h2>
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                            alt={weatherData.weather[0].description}
                            className="weather-icon"
                            onError={(e) => {
                                console.log(
                                    "Failed to load weather icon:",
                                    e.target.src
                                );
                            }}
                        />
                        <p className="temperature">
                            {Math.round(weatherData.main.temp)}°C
                        </p>
                        <p className="description">
                            {weatherData.weather[0].description}
                        </p>
                        <div className="extra-info">
                            <div className="info-item">
                                <p className="info-value">
                                    {weatherData.main.humidity}%
                                </p>
                                <p className="info-label">Humidity</p>
                            </div>
                            <div className="info-item">
                                <p className="info-value">
                                    {weatherData.wind.speed} m/s
                                </p>
                                <p className="info-label">Wind Speed</p>
                            </div>
                        </div>
                        <div className="layer-controls">
                            <button
                                onClick={() => setActiveLayer("clouds")}
                                className={
                                    activeLayer === "clouds" ? "active" : ""
                                }
                            >
                                Clouds
                            </button>
                            <button
                                onClick={() => setActiveLayer("temp")}
                                className={
                                    activeLayer === "temp" ? "active" : ""
                                }
                            >
                                Temperature
                            </button>
                            <button
                                onClick={() => setActiveLayer("wind")}
                                className={
                                    activeLayer === "wind" ? "active" : ""
                                }
                            >
                                Wind
                            </button>
                            <button
                                onClick={() => setActiveLayer("pressure")}
                                className={
                                    activeLayer === "pressure" ? "active" : ""
                                }
                            >
                                Pressure
                            </button>
                        </div>
                        <div className="map-container">
                            <WeatherMap
                                coords={weatherData.coord}
                                activeLayer={activeLayer}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
