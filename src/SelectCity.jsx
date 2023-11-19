import { useState, useEffect } from "react";
import getDay from "./utils/getDay";
import formatForecastData from "./utils/formatForcastData";
import StackedAreaChart from "./Graphs/StackedAreaChart";
import CloudIcon from "./Icons/Cloud";
import SunIcon from "./Icons/Sun";
import RainIcon from "./Icons/Rain";

export default function SelectCity() {
  const [weather, setWeather] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSearch(e) {
    setName(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=eaf41e8c9c9a44eea7c114007231011&q=${name}&days=5&aqi=no&alerts=no`
    );

    const data = await res.json();

    setWeather([data, ...weather]);
    setLoading(false);
    setName("");
  }

  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Search</label>
        <input
          type="text"
          value={name}
          onChange={handleSearch}
          autoComplete="true"
        />
        <button>{loading ? "Loading..." : "Add"}</button>
      </form>

      {weather && (
        <>
          <ul>
            {weather.map((cityWeather, index) => (
              <li key={index}>
                <h2>
                  {cityWeather.location.name}, {cityWeather.location.region}
                </h2>
                <strong>{cityWeather.current.temp_c} °C </strong>{" "}
                <img
                  src={cityWeather.current.condition.icon}
                  alt={cityWeather.current.condition.text}
                />
                <section>
                  <h2>Forecasting</h2>
                  <ul>
                    {cityWeather.forecast.forecastday.map((forecast) => (
                      <li key={forecast.date}>
                        {getDay(forecast.date)}{" "}
                        <img
                          src={forecast.day.condition.icon}
                          alt={forecast.day.condition.text}
                        />{" "}
                        {forecast.day.maxtemp_c}°C&nbsp;
                        {forecast.day.mintemp_c}°C
                      </li>
                    ))}
                  </ul>
                  <div style={{ maxWidth: 600, height: 400 }}>
                    <StackedAreaChart
                      data={formatForecastData(
                        cityWeather.forecast.forecastday
                      )}
                    />
                  </div>
                </section>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
