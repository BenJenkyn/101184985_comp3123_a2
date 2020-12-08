//https://www.youtube.com/watch?v=IxuqmfO6p28&feature=youtu.be
//This video was used as a reference in the creation of this assignment
import "./App.css";

import React from "react";

import Form from "./Components/FormComponent";
import Weather from "./Components/WeatherComponent";

// import "bootstrap/dist/css/bootstrap.min.css";

// import "weather-icons/css/weather-icons.css";

const apiKey = "259fad1ee0aa289031dd9be690b1df8e";

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,

      curTemp: undefined,
      low: undefined,
      max: undefined,
      description: "",
      feelsLike: undefined,
      icon: undefined,
      error: false,
    };

    this.iconList = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog",
    };
  }

  getIcon(iconList, id) {
    switch (true) {
      case id >= 200 && id <= 232:
        this.setState({ icon: this.iconList.Thunderstorm });
        break;
      case id >= 300 && id <= 321:
        this.setState({ icon: this.iconList.Drizzle });
        break;
      case id >= 500 && id <= 531:
        this.setState({ icon: this.iconList.Rain });
        break;
      case id >= 600 && id <= 622:
        this.setState({ icon: this.iconList.Snow });
        break;
      case id >= 701 && id <= 781:
        this.setState({ icon: this.iconList.Atmosphere });
        break;
      case id === 800:
        this.setState({ icon: this.iconList.Clear });
        break;
      case id >= 801 && id <= 804:
        this.setState({ icon: this.iconList.Clouds });
        break;
      default:
        this.setState({ icon: this.iconList.Clouds });
    }
  }
  getCelcious(temp) {
    return Math.floor(temp - 273.15);
  }

  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;

    let url;
    if (city) {
      url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      let req = await fetch(url);
      console.log(url);
      let res = await req.json();
      console.log(res);
      try {
        this.setState({
          city: `${res.name},${res.sys.country}`,
          curTemp: this.getCelcious(res.main.temp),
          low: this.getCelcious(res.main.temp_min),
          max: this.getCelcious(res.main.temp_max),
          feelsLike: this.getCelcious(res.main.feels_like),
          description: res["weather"][0]["description"],
          error: false,
        });
        this.getIcon(this.iconList, res.weather[0].id);
      } catch (Exception) {
        this.setState({ error: true });
      }
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          curTemp={this.state.curTemp}
          feelsLike={this.state.feelsLike}
          min={this.state.low}
          max={this.state.max}
          icon={this.state.icon}
          description={this.state.description}
        />
      </div>
    );
  }
}

export default App;
