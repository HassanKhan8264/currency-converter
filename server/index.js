const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");
const cors = require('cors')

const app = express();


app.use(cors());
app.use("/", currencyRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
