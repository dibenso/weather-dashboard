require("isomorphic-fetch");
const fs = require("fs");
const router = require("express").Router();

router.get("/api/autocomplete/:city", async (req, res) => {
  const { city } = req.params;
  const cities = JSON.parse(fs.readFileSync("./cities.json")).filter(cityData =>
    cityData.city.toLowerCase().startsWith(city.toLowerCase())
  );

  res.json(cities);
});

router.get("/api/weather/:lat/:lng", async (req, res) => {
  const { lat, lng } = req.params;

  try {
    const weather = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lng}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
    ).then(response => response.json());

    res.json(weather);
  } catch (error) {
    res.sendStatus(500);

    throw error;
  }
});

module.exports = router;
