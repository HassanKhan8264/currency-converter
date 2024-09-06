const express = require("express");
const cors = require("cors");
const currencyRouter = require("./currencyController");
const config = require("./config")

const app = express();

app.use(cors());
app.use('/', currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
