import React from 'react'
import { getWeatherType, today } from '../helpers';
const Card = ({ day }) => {
  
  const getDate = new Date(day.datetime).toISOString().split('T')[0];
  return (
    <div>
      <p>
        {getDate === today
          ? 'Today'
          : new Date(day.datetime).toLocaleString('default', {
              weekday: 'long',
            })}
      </p>
      <p>{day.tempmax} C</p>
      {getWeatherType(day)}
    </div>
  );
}

export default Card