import React, { useState } from "react";
import    "./index.css"

const api = { 
  key : "08f88738e4105a50798d446c18c32ec4",
  base : "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState("");
  const [weather,setWeather] = useState({});

  const search = event =>{
    if(event.key === "Enter"){
      fetch (`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  }

  const dataBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "June", "August", "September", "October", "November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div>
      <main>
        <h1 style={{color:"white", fontSize:"50px"}}>WEATHER APİ</h1>
      <div className="search-box">
        <input type="text"
          className="search-bar" 
          placeholder="Search..." 
          onChange={e =>setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />
      </div>
      { (typeof weather.main != "undefined") ? (
      <div>
        <div className="location-box">
          <div className="location">
            {weather.name},{weather.sys.country}
          </div>
          <div className="date">{dataBuilder(new Date())}</div>
        </div>

        <div className="weather-box"> 
            <div className="temp">
              {Math.round(weather.main.temp)}°C 
            </div>
            <div className="weather">
                {weather.weather[0].main}
            </div>
        </div>
        </div>
        ) : ("")}
      </main>
      </div>
  );
}

export default App;
