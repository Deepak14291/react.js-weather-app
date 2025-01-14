import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import Modal from "./Modal";

export default function Weather() {
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();
    const [weather, setWeather] = useState();
    const [city, setCity] = useState("");
    const cityRef = useRef("");
    const api = process.env.REACT_APP_WEATHER_API_KEY;
    var imgCode;
    let image;

    function handleFetchWeather() {
        setCity(cityRef.current?.value);
        if (cityRef.current?.value === "") {
            return alert("Enter a valid city name!!");
        }

        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityRef.current?.value}&APPID=${api}`;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityRef.current?.value}&appid=${api}`;

        fetchData(url);
        // setWeather(fetchData(url));
    }

    async function fetchData(url) {
        const res = await fetch(url);
        const data = await res.json();
        if (data.message == "city not found") {
            dispatch(openModal());
            // return alert("Enter a valid city name!!");
            return;
        }


        setWeather(data);

        // console.log(data.city.name);
        // console.log(data);
        // temp = data.list[0].main.temp;
        // console.log(data.list[0].main.temp);
        // console.log(data.list[0].weather[0].description);
        // console.log(data.list[0].weather[0].description);

        // const today = data.list[0].weather[0].description;
        // const imageCode = data.list[0].weather[0].icon;
        // const image = `https://openweathermap.org/img/wn/${imageCode}@2x.png`;

        const temp = data.list[0].main.temp;
        const temperatureInCelsius = kelvinToCelsius(temp)
        return temperatureInCelsius;
    }

    function kelvinToCelsius(temperature) {
        const celsiusTemp = Math.round(temperature - 273.15);
        return celsiusTemp;
    }
    imgCode = weather?.list[0].weather[0].icon;
    image = `https://openweathermap.org/img/wn/${imgCode}@4x.png`;

    return (
        <>
            <div className="bg-[url('wallpaper.jpg')] h-screen pt-6">
                <div className="text-zinc-300 ml-8 text-2xl tracking-wide py-4 px-10 bg-gray-900/20 backdrop-blur-sm inline-block">
                    <p>Weather Vista</p>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="gap-2 bg-gray-900/20 backdrop-blur-sm py-8 px-10">
                        <label className="content-center mr-2  text-zinc-300">Enter the city: </label>
                        <input type="text" ref={cityRef} className="bg-gray-300 focus:outline-none" />
                        <button className="ml-6 p-2 bg-gray-300 px-8 hover:bg-gray-900/70 hover:text-zinc-300" onClick={() => handleFetchWeather()}>Search</button>
                    </div>
                </div>
                {isOpen ? <Modal /> :
                    city &&
                    <div className="mt-10 grid justify-center grid-cols-12 grid-rows-6 h-1/2">
                        <div className="text-zinc-100 rounded-md h-full col-start-4 col-end-10 col-span-4 row-start-1 row-end-7 row-span-6 backdrop-blur-sm bg-gray-900/20 justify-items-center pt-10">
                            <p>City: <span className="capitalize text-lg font-semibold">{city ? city : ""} </span> </p>
                            {/* <p> {console.log(weather)}</p> */}
                            <div className="mt-10 flex w-full justify-around">
                                <div>
                                    <p className="py-5"> {weather?.list[0].main.temp ? <span className="text-8xl font-extrabold	"> {kelvinToCelsius(weather.list[0].main.temp)} °C</span> : ""} </p>
                                </div>
                                <div className="ml-5 flex flex-col justify-center text-center">
                                    <p> {weather?.list[0].weather[0].description ? <span className="capitalize">{weather.list[0].weather[0].description} </span> : ""} </p>
                                    <p> {imgCode ? <img src={image} alt="weather icon"></img> : ""}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className=" text-zinc-300 flex justify-between fixed bottom-0 py-4 px-4 w-full text-sm">
                    <p className="backdrop-blur-sm bg-gray-900/20 p-6 text-zinc-300 self-end">Designed and Developed by Deepak Kodi</p>
                    <div className="backdrop-blur-sm text-zinc-300 p-6 bg-gray-900/20">
                        <p>Credits: </p>
                        <p>Photo by Nabil Naidu on Unsplash</p>
                        <a href="https://www.flaticon.com/free-icons/weather" title="weather icons">Weather icons created by Freepik - Flaticon</a>
                    </div>
                </div>
            </div >
        </>
    );
}
