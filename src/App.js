import './App.css';
import React, {useEffect, useState} from 'react'
import Card from './Components/Card';

const cities = [
  'Toronto',
  'Bogota',
  'Paris'
]

const App = () => {
  const [active, setActive] = useState(false)
  const [location, setLocation] = useState('Toronto')
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


const getWeatherInputs = ( { target  }, city) => {
  setLocation(target.textContent);
  // console.log(city);
  setActive(!active)
  };


  const getToday = (data) => {
    if (data.days !== undefined) {

      return data.days.slice(0,1).map((day, i) => {
        return (
          <Card day={day} key={i} />
        );
      });
    }
    
  }
  const displayWeather = (data) => {

    if (data.days !== undefined) {
      return data.days.slice(2,6).map((day, i) => {
        return (
          <Card day={day} key={i} />
        )
        
      }
      );
    }
  };
  return (
    <div className="container d-flex just-content-center align-items-center flex-column mt-4">
      <div className="d-flex my-4">
        {cities.map((city, i) => (
          <h2 onClick={(e)=>getWeatherInputs(e, city)} key={i} className={`mx-4 ${active == city && 'fw-bold'}`}>
            {city}
          </h2>
        ))}
      </div>
      <div className="border border-white rounded">
        {getToday(data)}
        <div className="d-flex forecast">{displayWeather(data)}</div>
      </div>
    </div>
  );
}

export default App;
