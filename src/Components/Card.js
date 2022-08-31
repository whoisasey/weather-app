import React from 'react'
import { getWeatherType } from '../helpers';

const weatherDescription = (day, i) => {
  if (i === 0) {
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
const Card = ({ day, index }) => {
  return (
    <div className={`card flex-body `}>
      <p>
        {index === 0
          ? 'Today'
          : new Date(day.datetime).toLocaleString('default', {
              weekday: 'short',
            })}
      </p>
      {weatherDescription(day, index)}
    </div>
  );
}

export default Card