import { Card } from "react-bootstrap";
import { FaThermometerHalf } from "react-icons/fa";
import dateFormat from "dateformat";

export default function Forecast({ weather }) {
  const currentDate = new Date();

  return (
    <div>
      {weather.daily.slice(0, 5).map((weatherData, index) => (
        <Card
          key={String(index)}
          style={{
            width: "15rem",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            margin: "0 auto",
            marginBottom: 20,
            boxShadow: "5px 5px 15px 5px #000000",
            display: "inline-block"
          }}>
          <Card.Img variant="top" src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
          <Card.Body>
            <Card.Title>
              {dateFormat(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + index),
                "dddd, mmmm dS, yyyy"
              )}
            </Card.Title>
            <p>{weatherData.weather[0].description}</p>
            <h2>
              <FaThermometerHalf size={30} color="black" />
              {` ${Math.round(weatherData.temp.day)}°`}
            </h2>
            <br />
            {`Humidity: ${weatherData.humidity}%`}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
