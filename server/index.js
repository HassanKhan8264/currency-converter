const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");
const cors = require('cors')

const app = express();


// // Define allowed origins
const corsOptions = {
  origin: ['http://localhost:4200',],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
