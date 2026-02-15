import { useState } from 'react'
import axios from 'axios'
import Weatherfeeling from './Weatherfeeling'
import WeatherDetails from './WeatherDetails'
const API_URL = import.meta.env.VITE_API_BASE_URL;


function App() {
  const [city, setCity] = useState("")
  const [weatherData, setWeatherData] = useState({})
  const [Error, setError] = useState("")

  const getWeather = async (event) => {


    try {
      setError("")
      if (event.key === 'Enter') {
        const result = await axios.get(`${API_URL}/weather`, {
          params: { city }
        })
        console.log(result.data)
        setWeatherData(result.data)
        setCity("")
      }
    } catch (err) {
      console.error("Error fetching weather:", err.response?.data || err.message);

      if (err.response?.status === 404) {
        setError("City not found. Please try again.");
      }
      else {
        setError("Unable to fetch the weather data. Please try again later.");
      }
      setWeatherData({});
    }
  }
  function handleInputChange(event) {
    const { value } = event.target
    setCity(value)
  }

  return (
    <div className="relative w-screen min-h-screen bg-black/40 
                before:content-[''] before:absolute before:inset-0 
                before:bg-[url('/images/sunset.jpeg')] before:bg-cover before:bg-center before:bg-repeat before:z-[-1]">
      <div className='flex flex-col justify-center items-center gap-10'>
        <div className='flex flex-col justify-centre items-centre gap-2 '>
          <div className='flex justify-center items-center lg:mt-10 mt-20'>
            <input className='p-3 text-[16px] text-white border border-[rgba(255,255,255,0.8)] rounded-[16px]'
              type="text" placeholder='Enter Location'
              onChange={handleInputChange}
              value={city}
              onKeyDown={getWeather}
            />
          </div>
          <div className='mt-10 mr-8 sn:mr-10 flex flex-col justify-center items-center gap-4'>
            <p className='text-[1.5rem] text-white font-bold text-center'>{weatherData?.sys?.country}</p>
            <h4 className='text-[3rem] text-white font-thin text-center'>{weatherData?.name}</h4>
            {Error && <p className='text-red-400 text-[1.5rem] font-semibold text-center mt-2'>{Error}</p>}
            {weatherData?.main ? <h1 className='text-[4rem] text-white text-center'>{weatherData.main.temp.toFixed()}°C</h1>
              : null}
          </div>
        </div>
        <div className='flex flex-row sm:flex-col justify-center gap-12 mr-2 items-center'>
          <div>
            <p className='text-4xl'>{Weatherfeeling[weatherData.weather?.[0]?.main]}</p>
            {weatherData.weather ? <p className='text-white font-bold text-2xl'>{weatherData.weather[0].main}</p>
              : null}
          </div>
          {weatherData.name === undefined ?
            <p className='text-white font-bold leading-10 mr-10'>Sunny innit?</p>
            :
            <div className='flex flex-col sm:flex-row sm:w-fit sm:mr-2 sm:gap-28 sm:p-8  justify-center items-center gap-4 text-white w-40 border  border-[rgba(255,255,255,0.8)] p-2 rounded-3xl  bg-[rgba(255,255,255,0.06)]'>
              <WeatherDetails weatherData={weatherData.main?.humidity} data="Humidity" />
              <WeatherDetails weatherData={weatherData.main?.feels_like.toFixed()} data="Feels like" />
              <WeatherDetails weatherData={weatherData.wind?.speed.toFixed()} data="Wind Speed" />
            </div>}
        </div>
      </div>
    </div>
  )
}

export default App
