const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");
const cors = require('cors')

const app = express();


// // Define allowed origins
app.use(
  cors({
    origin: [
      "http://localhost:4200",  // Local development
      "https://currency-converter-eta-seven.vercel.app", // Allowed origin for your frontend
      "https://currency-converter-qaze.vercel.app" // Another allowed origin
    ],
    methods: ["GET", "POST"],  // Allowed HTTP methods
  })
);


// Use the currency router
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
