import { Card } from "react-bootstrap";
import { FaThermometerHalf, FaWind } from "react-icons/fa";

function uvIndexColor(uvIndex) {
  if (uvIndex <= 3) return "rgba(0, 120, 6, 0.6)";
  if (uvIndex <= 6) return "rgba(208, 119, 0, 0.6)";

  return "rgba(208, 0, 0, 0.6)";
}

export default function CurrentWeather({ weather }) {
  return (
    <Card
      style={{
        width: "15rem",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        margin: "0 auto",
        marginBottom: 50,
        boxShadow: "5px 5px 15px 5px #000000"
      }}>
      <Card.Img variant="top" src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} />
      <Card.Body>
        <Card.Title>{weather.current.weather[0].description}</Card.Title>
        <h2>
          <FaThermometerHalf size={30} color="black" />
          {` ${Math.round(weather.current.temp)}°`}
        </h2>
        <br />
        {`Humidity: ${weather.current.humidity}%`}
        <br />
        <FaWind size={20} color="black" />
        {` ${weather.current.wind_speed} MPH`}
        <br />
        {`UV Index: ${weather.current.uvi}`}
        <div
          style={{
            display: "inline-block",
            height: 15,
            width: 15,
            backgroundColor: uvIndexColor(weather.current.uvi),
            marginLeft: 10
          }}
        />
      </Card.Body>
    </Card>
  );
}
