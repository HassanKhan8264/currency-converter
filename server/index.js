const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");

const app = express();
const cors = require('cors')

app.use(cors());

// // Define allowed origins
const allowedOrigins = [
  "http://localhost:4200",
  "https://currency-converter-eta-seven.vercel.app",
  "https://currency-converter-qaze.vercel.app"
];

// Use CORS middleware
app.use(
  cors(allowedOrigins)
);

// Use the currency router
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
