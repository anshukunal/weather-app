import React, { useState } from "react";
import "./App.css";
import { useEffect } from "react";

const key = "e6866a809a16417df0626d41941211a4";

const App = () => {
  const [weather, setWeather] = useState();
  const [searchWeather, setSearchWeather] = useState("");
  const [getWeather, setGetWeather] = useState(searchWeather);
  const [condition, setCondition] = useState();

  useEffect(() => {
    if (searchWeather === "") return;

    const weatherData = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${getWeather}&units=metric&appid=${key}`
        );

        if (!res.ok) throw new Error("Not a country");

        const data = await res.json();

        setWeather(data);

        setCondition(data.weather[0].main);
      } catch (err) {
        console.error(err.message);
      }
    };
    weatherData();
  }, [getWeather, condition]);

  function handelClick() {
    setGetWeather(searchWeather);
  }

  function onEnter(e) {
    if (e.key === "Enter") {
      setGetWeather(searchWeather);
    }
  }

  return (
    <div className="main">
      <div className="input-container">
        <input
          type="text"
          value={searchWeather}
          onChange={(e) => setSearchWeather(e.target.value)}
          placeholder="Search weather"
          onKeyDown={onEnter}
        />
        <button onClick={handelClick}>
          <img src="./images/search.png" alt="" />
        </button>
      </div>

      {weather === undefined ? (
        ""
      ) : (
        <>
          <div className="weather-temp">
            <div className="weather-img-container">
              <img src={`./images/${condition}.png`} alt="" />
            </div>
            <h2>{weather.name}</h2>
            <div className="temp-condition">
              <p>{Math.floor(weather.main.temp)}°C</p>
              <p>{weather.weather[0].main}</p>
            </div>
          </div>
          <div className="weather-detalis">
            <div className="weather-info-container">
              <div className="img-container">
                <img src="./images/humidity.png" alt="" />
              </div>
              <div className="weather-info-text">
                <p className="weather-text">
                  {weather.main.humidity}%
                  <br />
                  <span>Humidity</span>
                </p>
              </div>
            </div>
            <div className="weather-info-container">
              <div className="img-container">
                <img src="./images/wind.png" alt="" />
              </div>

              <div className="weather-info-text">
                <p className="weather-text">
                  {weather.wind.speed} km/h <br />
                  <span>Wind Speed</span>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
