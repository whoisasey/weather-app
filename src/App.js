import './App.css';
import React, {useEffect, useState} from 'react'

import { today } from './helpers';
import Card from './Components/Card';

const App=()=> {
  const [data, setData] = useState([]);
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/toronto/next7days?unitGroup=metric&include=days%2Ccurrent&key=${process.env.REACT_APP_API_KEY}&contentType=json`;


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

  // console.log(data);

  // const getWeather = async () => {
  //   try {
  //     let res = await fetch(url);
  //     res = await res.json();
  //     setData(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const getWeatherInputs = ({ target: { dataset } }) => {
  //   setLat(dataset.lat);
  //   setLong(dataset.long);
  //   setTimezone(dataset.timezone);

  // };



  const getToday = (data) => {
    if (data.days !== undefined) {
      return data.days.filter(day => new Date(day.datetime).toISOString().split('T')[0] === today).map((day,i) => {
        return (
          <Card day={day} key={i} />
        );
      });
    }
    
  }
  const displayWeather = (data) => {

    // daily has 3 arrays
    // map over and if the index of each matches each other, render data

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
    <div className="container">
      <h4>Toronto</h4>
      {/* <button onClick={(e)=>getWeatherInputs(e)} data-lat="52.52" data-long="13.41" data-timezone="America%2New_York">New York</button> */}
      {getToday(data)}
      {displayWeather(data)}
    </div>
  );
}

export default App;
