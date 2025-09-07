import { MapContainer, TileLayer, WMSTileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * WeatherMap component to display a map with a weather layer.
 * @param {object} props - The component props.
 * @param {object} props.coords - The coordinates of the city.
 */
const WeatherMap = ({ coords }) => {
    const position = [coords.lat, coords.lon];
    const cloudsLayerUrl = `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${API_KEY}`;

    return (
        <MapContainer
            center={position}
            zoom={10}
            style={{ height: "400px", width: "100%", marginTop: "20px" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <TileLayer url={cloudsLayerUrl} />
        </MapContainer>
    );
};

export default WeatherMap;
