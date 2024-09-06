const express = require("express");
const cors = require("cors");
const currencyRouter = require("./currencyController");
const config = require("./config")

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: [
      "http://localhost:4200", 
      "https://currency-converter-eta-seven.vercel.app",
      "https://currency-converter-qaze.vercel.app"
    ],
  })
);
app.use('/', currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
