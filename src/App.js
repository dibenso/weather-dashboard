import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loader from "react-loader-spinner";
import Search from "./Search";
import Weather from "./Weather";

function App() {
  const [location, setLocation] = useState(JSON.parse(localStorage.getItem("location")));
  const [weatherData, setWeatherData] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(async () => {
    if (location)
      try {
        setFetching(true);

        const { lat, lng } = location;
        const response = await fetch(`http://localhost:8080/api/weather/${lat}/${lng}`);

        setFetching(false);
        setWeatherData(await response.json());
        setError(null);
      } catch {
        setFetching(false);
        setError("Unable to retrieve weather data");
      }
  }, [location]);

  return (
    <>
      <Container fluid style={{ textAlign: "center" }}>
        <h1 className="display-3">Weather Dashboard</h1>
        {error && error}
        <Search setLocation={setLocation} />
        {fetching && (
          <>
            <Loader type="Puff" color="black" height={100} width={100} />
            <h2>Retrieving Weather Data...</h2>
          </>
        )}
        {weatherData && <Weather weather={weatherData} location={location} />}
      </Container>
    </>
  );
}

export default App;
