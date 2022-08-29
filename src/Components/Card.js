import React from 'react'
import { getWeatherType, today } from '../helpers';
const Card = ({ day }) => {
  
  const getDate = new Date(day.datetime).toISOString().split('T')[0];
  return (
    <div className="mx-4">
      <p>
        {getDate === today
          ? 'Today'
          : new Date(day.datetime).toLocaleString('default', {
              weekday: 'short',
            })}
      </p>
      {getWeatherType(day)}
      <p>{day.tempmax} &#176;</p>
    </div>
  );
}

export default Card