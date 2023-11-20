import { useState, useEffect } from "react";
import getDay from "./utils/getDay";
import formatForecastData from "./utils/formatForcastData";
import StackedAreaChart from "./Graphs/StackedAreaChart";

function createInitialWeather() {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    return JSON.parse(storedUserData);
  }
  return [];
}

export default function SelectCity() {
  const [weather, setWeather] = useState(createInitialWeather);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(weather));
  }, [weather]);

  function handleSearch(e) {
    setName(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=eaf41e8c9c9a44eea7c114007231011&q=${name}&days=5&aqi=no&alerts=no`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error.message);
      }

      setWeather([data, ...weather]);

      setName("");
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Weather</h1>
      {error && <p>Error:{error}</p>}
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
