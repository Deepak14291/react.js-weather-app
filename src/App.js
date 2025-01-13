import { useRef, useState } from "react";
import wallpaper from "./wallpaper.jpg"
function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Weather />
      {/* <Footer /> */}
    </>
  );
}

function Weather() {
  const [weather, setWeather] = useState("");
  const [city, setCity] = useState("");
  const cityRef = useRef("");
  const api = process.env.REACT_APP_WEATHER_API_KEY;

  function handleFetchWeather() {
    console.log(api);
    setCity(cityRef.current?.value);
    if (cityRef.current?.value === "") {
      return alert("Enter a valid city name!!");
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current?.value}&APPID=${api}`;
    setWeather(fetchData(url));
  }
  async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    if (data.message == "city not found") {
      return alert("Enter a valid city name!!");
    }
    const temp = data.main.temp;
    const temperatureInCelsius = kelvinToCelsius(temp)
    return temperatureInCelsius;
  }

  function kelvinToCelsius(temperature) {
    const celsiusTemp = Math.round(temperature - 273.15);
    return celsiusTemp;
  }

  return (
    <>
      <div className="bg-[url('wallpaper.jpg')] h-screen pt-6">
        <div className="mt-6 flex justify-center gap-2	">
          <label className="content-center mr-2 text-white">Enter the city: </label>
          <input type="text" ref={cityRef} />
          <button className="ml-6 p-2 bg-gray-50 px-8" onClick={handleFetchWeather}>Search</button>
        </div>

        <div className="pt-14 grid justify-center grid-cols-12 grid-rows-6 h-1/2 ">
          <div className="text-white rounded-md h-full col-start-5 col-end-9 col-span-4 row-start-1 row-end-7 row-span-6 backdrop-blur-sm bg-gray-50/20 justify-items-center py-14">
            <p>City name: {city ? city : ""} </p>
            <p className="py-5">Temperature: {weather ? weather : ""} °C</p>
          </div>
        </div>

        <div className="text-white flex justify-between fixed bottom-0 py-4 px-4 w-full">
          <p>Developed by Deepak Kodi</p>
          <p>Photo by Nabil Naidu on Unsplash</p>
        </div>
      </div>
    </>
  );
}


// function Navbar() {
//   return (
//     <h3 className="bg-slate-400 text-2xl py-6 px-4">Weather Forecast</h3>
//   );
// }

// function Footer() {
//   return (
//     <p className="bg-slate-400 py-6 px-4 fixed bottom-0 w-full text-center">Created by Deepak Kodi</p>
//   );
// }

export default App;
