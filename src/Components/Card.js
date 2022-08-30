import React from 'react'
import { getWeatherType, today } from '../helpers';

const getDate = (day) => {
  return new Date((day).datetime).toISOString().split('T')[0];
};

const weatherDescription = (day) => {
  if (getDate(day) === today) {
    return <div className='current-forecast'>{getWeatherType(day)}
      <div className="current-forecast-text">
        <h3 className='display-1'>{ Math.round(day.tempmax)} &#176;</h3>
        <p>{day.conditions}</p>
      </div>
    </div>;
  }
  else {
    return (
      <div className="flex-body">
        {getWeatherType(day)}
        <h3 className='display-2'>{Math.round(day.tempmax)} &#176;</h3>
      </div>
    );
  }
}
const Card = ({ day }) => {
  return (
    <div className={`card flex-body `}>
      <p>
        {getDate(day) === today
          ? 'Today'
          : new Date(day.datetime).toLocaleString('default', {
              weekday: 'short',
            })}
      </p>
      {weatherDescription(day)}
    </div>
  );
}

export default Card