const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("build", { extensions: ["html"] }));
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(routes);

app.listen(PORT, () => console.log(`🚀 Listening on PORT ${PORT}`));
