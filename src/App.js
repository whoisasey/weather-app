import './App.css';
import React, {useEffect, useState} from 'react'
import Card from './Components/Card';

const cities = [
  'Toronto',
  'Bogota',
  'Paris'
]

const App = () => {
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


const getWeatherInputs = ({ target  }) => {
  setLocation(target.textContent);
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
      <div className="d-flex">
        {cities.map(((city, i) => (
        <h4 onClick={(e) => getWeatherInputs(e)} key={i} className="mx-4">{ city}</h4>
        )))}
      </div>
      {getToday(data)}
      <div className="d-flex">{displayWeather(data)}</div>
    </div>
  );
}

export default App;
