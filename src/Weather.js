import dateFormat from "dateformat";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

export default function Weather({ weather, location }) {
  return (
    <>
      <h2>{location.city}</h2>
      <p>{dateFormat(new Date(), "dddd, mmmm dS, yyyy")}</p>
      <CurrentWeather weather={weather} />
      <Forecast weather={weather} />
    </>
  );
}
