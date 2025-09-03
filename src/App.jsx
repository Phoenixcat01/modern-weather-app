// import { useState } from 'react'
import { useState } from "react";
import "./App.css";

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
                    />
                    <button className="search-button">Search</button>
                </div>

                {loading && <p>Loading</p>}
                {error && <p className="error-message">{error}</p>}

                {weatherData && <div className="weather-data-container"></div>}
            </main>
        </div>
    );
}

export default App;
