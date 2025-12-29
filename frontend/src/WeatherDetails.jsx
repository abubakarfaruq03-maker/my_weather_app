import React from "react";
function WeatherDetails({ weatherData, data}) {
    if (!weatherData) return null;
    return (
         <div className="flex flex-col gap-1 align-center justify-center items-center">
      <p className="font-light sm:leading-10 leading-4 text-2xl">
        {weatherData}
      </p>
      <p className="sm:font-bold sm:text-[1.5rem] text-[1.2rem]">
        {data}
      </p>
    </div>
    )
}
export default WeatherDetails;