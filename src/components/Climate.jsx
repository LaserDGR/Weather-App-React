import React, { useEffect, useState } from 'react';
import axios from 'axios'

const Climate = () => {

const [climate, setClimate] = useState({});
const [transform, setTransform] = useState(true)

useEffect(() => {
  navigator.geolocation.getCurrentPosition(success);
  function success(pos) {
    const crd = pos.coords;
  
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  
  
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d5e0e6b905334b8dd9c3b0648562e767`)
  .then(res => setClimate(res.data))
  }
}, [])

console.log(climate)

  return (
    <div className='container'>
      <div className='textContainer'>
      <h1>Weather App</h1>
      <h2><i className="fa-sharp fa-solid fa-globe"></i> {climate.sys?.country}</h2>
      <h2><i className="fa-solid fa-magnifying-glass-location"></i> {climate.name}</h2>
      <img className='imgContainer' src={`http://openweathermap.org/img/wn/${climate.weather?.[0].icon}.png`} alt="" />
      <h2>{climate.weather?.[0].description}</h2>
      <h2><i className="fa-solid fa-temperature-low"></i> {transform?(climate.main?.temp-273).toFixed(2) : (climate.main?.temp-273).toFixed(2)*9/5+32}{transform?" °C":" °F"}</h2>
      <h2><i className="fa-solid fa-droplet"></i> {climate.main?.humidity}</h2>
      <h2>Pressure: {climate.main?.pressure}</h2>
      <h2><i className="fa-solid fa-wind"></i> {climate.wind?.speed}</h2>
      <button onClick={() => {setTransform(!transform)}}>°C & °F / Units</button>
      </div>
    </div>
  );
};

export default Climate;