import './App.css';
import React, {useEffect, useState} from 'react'
import clouds from './assets/icons8-cloud-48.png'
import rain from './assets/icons8-rainfall-48.png'
import sun from './assets/icons8-sun-48.png'

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
  }, []);

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

  const getWeatherType = (day) => {
    // console.log(day);
    if (day.icon === 'partly-cloudy-day') {
      return (<img src={ clouds}alt="" />)
    }
    if (day.icon === 'rain') {
      return (<img src={ rain} alt="" />)
    }
    if (day.icon === 'clear-day') {
      return (<img src={ sun} alt="" />)
    }
  }


  const getToday = (data) => {
    const today = new Date().toISOString().split('T')[0];
    if (data.days !== undefined) {
      return data.days.filter(day => new Date(day.datetime).toISOString().split('T')[0] === today).map(day => {
        return (
          <div>
            <p>Today</p>
            <p>{day.tempmax} C</p>
            {getWeatherType(day)}
          </div>
        );
      });
    }
    
  }
  const displayWeather = (data) => {

    // daily has 3 arrays
    // map over and if the index of each matches each other, render data

    if (data.days !== undefined) {
      return data.days.slice(2,6).map(day => {
        return (
          <div>
            <p>{new Date(day.datetime).toLocaleString('default', { weekday: 'long' })}</p>
            <p>{day.tempmax} C</p>
            {getWeatherType(day)}
          </div>
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
