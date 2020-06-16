import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';

const App = () => {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, long) => {
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: process.env.REACT_APP_OPEN_WHEATHER_KEY,
        lang: 'pt',
        units: 'metric'
      }
    });
    setWeather(res.data);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

  if (location === false) {
    return (
      <div>
        <h3 className="weather__title">
          Por favor, habilite sua localização para utilizar o app
        </h3>
      </div>
    )
  } else if (weather === false) {
    return (
      <div>
        <h3 className="weather__title">
          Estamos carregando o app.
        </h3>
      </div>
    )
  } else {
    return (
      <div className="weather">
        <h3 className="weather__data--strong">
          {weather['name']} - {weather['sys']['country']}
        </h3>
        <h3 className="weather__title">
          Condições climaticas ({weather['weather'][0]['description']})
          </h3>
        <ul className="weather__data">
          <li className="weather__data--temp">
            <span>Temperatura atual: 
            <span className="weather__data--result">
                {weather.main.temp}°C
              </span>
            </span>
          </li>
          <div className="weather__data--ocilation">
            <span>
              Max:
              <span className="weather__data--result">
              {weather.main.temp_max + 7}°C
                </span>
            </span>
            <span>Min:
              <span className="weather__data--result">
              {weather.main.temp_min - 3}°C
                </span>
            </span>
          </div>
        </ul>
        <ul className="weather__data">
          <li>
            Pressão: {weather['main']['pressure']} hpa
            </li>
          <li>
            Umidade: {weather['main']['humidity']}%
            </li>
        </ul>
      </div >
    );
  }
}
export default App; 