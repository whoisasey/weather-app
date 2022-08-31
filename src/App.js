import './css/styles.css'
import React, {useEffect, useState} from 'react'
import Card from './Components/Card';

const  cities = [
  'Vancouver',
  'Bogotá',
  'London'
]

const App = () => {
  const [active, setActive] = useState(cities[0])
  const [location, setLocation] = useState(cities[0])
  const [data, setData] = useState([]);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?unitGroup=metric&include=days%2Ccurrent&key=${process.env.REACT_APP_API_KEY}&contentType=json`;


  useEffect(() => {
    const getWeather = async () => {
      try {
        let res = await fetch(url);
        res = await res.json();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    getWeather();
  }, [url]);


  // set location of display and active class
  const getWeatherInputs = ( { target  }, city) => {
    setLocation(target.textContent);
    setActive(city)
  };


  // get todays weather
  const getToday = (data) => {
    if (data.days !== undefined) {
      return data.days.slice(0, 1).map((day, i) => {
        return (
          <Card day={day} key={i} index={i} />
        );
      });
    }
  }

  // get 4-day forecast
  const displayWeather = (data) => {
    if (data.days !== undefined) {
      return data.days.slice(2,6).map((day, i) => {
        return (
          <Card day={day} key={i} />
        ) 
      });
    }
  };

  return (
    <div className="container flex-body">
      <div className="cities">
        {cities.map((city, i) => (
          <h2
            onClick={(e) => getWeatherInputs(e, city)}
            key={i}
            className={`city-header ${active === city && 'fw-bold' ? 'fw-bold' : ''}`}>
            {city}
          </h2>
        ))}
      </div>
      <div className="border">
        {getToday(data)}
        <div className="forecast">{displayWeather(data)}</div>
      </div>
    </div>
  );
}

export default App;
