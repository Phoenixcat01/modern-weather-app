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

            <main>
                {loading && <p>Loading</p>}
                {error && <p className="error-message">{error}</p>}

                <h2>{weatherData.name}</h2>
                {weatherData && (
                    <div className="weather-content">
                        <div className="current-weather-top">
                            <div className="current-icon-container">
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
                            </div>
                            <div className="current-temp-container">
                                <span className="temperature">
                                    {Math.round(weatherData.main.temp)}
                                </span>
                                <span className="degree-symbol">°</span>
                                {/* <p className="description">
                            {weatherData.weather[0].description}
                        </p> */}
                            </div>
                        </div>

                        <div className="additional-info-row">
                            <div className="additional-icon-item">
                                <i className="wi wi-humidity"></i>
                                <p>{weatherData.main.humidity}%</p>
                            </div>
                            <div className="additional-icon-item">
                                <i className="wi wi-strong-wind"></i>
                                <p>{weatherData.wind.speed} m/s</p>
                            </div>
                        </div>

                        <div className="map-and-controls">
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
                                        activeLayer === "pressure"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Pressure
                                </button>
                                <button
                                    onClick={() =>
                                        setActiveLayer("precipitation")
                                    }
                                    className={
                                        activeLayer === "precipitation"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Precipitation
                                </button>
                            </div>
                            <div className="map-container">
                                <WeatherMap
                                    coords={weatherData.coord}
                                    activeLayer={activeLayer}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
