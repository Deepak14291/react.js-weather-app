import { useRef, useState } from "react";
function App() {
  return (
    <>
      <Navbar />
      <Weather />
      <Footer />
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
      <div className="mt-6 flex justify-center gap-2	">
        <label className="content-center mr-2">Enter the city: </label>
        <input type="text" ref={cityRef} />
        <button className="ml-6 p-2 bg-slate-400 px-8" onClick={handleFetchWeather}>Search</button>
      </div>

      <div className="mt-14 grid justify-center grid-cols-12">
        <div className="col-start-5 col-end-9 col-span-4 bg-slate-400 justify-items-center py-14">
          <p>City name: {city ? city : ""} </p>
          <p className="py-5">Temperature: {weather ? weather : ""} °C</p>
        </div>
      </div>
    </>
  );
}


function Navbar() {
  return (
    <h3 className="bg-slate-400 text-2xl py-6 px-4">Weather Forecast</h3>
  );
}

function Footer() {
  return (
    <p className="bg-slate-400 py-6 px-4 fixed bottom-0 w-full text-center">Created by Deepak Kodi</p>
  );
}

export default App;
