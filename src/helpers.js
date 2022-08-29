import clouds from './assets/icons8-cloud-48.png';
import rain from './assets/icons8-rainfall-48.png';
import sun from './assets/icons8-sun-48.png';

export  const today = new Date().toISOString().split('T')[0];

export const getWeatherType = (day) => {
  // console.log(day);
  if (day.icon === 'partly-cloudy-day') {
    return <img src={clouds} alt="" />;
  }
  if (day.icon === 'rain') {
    return <img src={rain} alt="" />;
  }
  if (day.icon === 'clear-day') {
    return <img src={sun} alt="" />;
  }
};
