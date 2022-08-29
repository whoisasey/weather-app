import React from 'react'
import { getWeatherType, today } from '../helpers';

const getDate = (day) => {
  return new Date((day).datetime).toISOString().split('T')[0];
};

const weatherDescription = (day) => {
  if (getDate(day) === today) {
    return <div className='d-flex align-items-center'>{getWeatherType(day)}
      <div className="d-flex flex-column p-3">
        <h3 className='display-4'>{ Math.round(day.tempmax)} &#176;</h3>
        <p>{day.conditions}</p>
      </div>
    </div>;
  }
  else {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center">
        {getWeatherType(day)}
        <h3 className='display-6'>{Math.round(day.tempmax)} &#176;</h3>
      </div>
    );
  }
}
const Card = ({ day }) => {
  return (
    <div className={`p-4 mt-4 d-flex flex-column align-items-center justify-content-center ${getDate(day) !== today ? 'border-top border-white': null  }`}>
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