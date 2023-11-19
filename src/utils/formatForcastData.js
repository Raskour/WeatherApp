function formatForecastData(rawData) {
  return rawData.map((forecast) => {
    return { maxTemp: forecast.day.maxtemp_c, minTemp: forecast.day.mintemp_c };
  });
}

export default formatForecastData;
