const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");

const app = express();
const cors = require('cors')


// // Define allowed origins
app.use(
  cors({
    origin: [
      "http://localhost:4200",
      "https://currency-converter-eta-seven.vercel.app",
      "https://currency-converter-qaze.vercel.app",
    ],
    credentials: true, // Include credentials if needed
  })
);


// Use the currency router
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
