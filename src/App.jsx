// import { useState } from 'react'
import { useState } from "react";
import "./App.css";

const API_KEY = "79bdf20e7915ce42a622a8e00e584291";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                        <p className="temperature">
                            {Math.round(weatherData.main.temp)}°C
                        </p>
                        <p className="description">
                            {weatherData.weather[0].description}
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;
