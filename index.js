const express = require("express");
const currencyRouter = require("./server/currencyController");
const config = require("./server/config");
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require('fs');

// Enable CORS
app.use(cors());
app.use("/", currencyRouter);

// API routes
app.use(express.static(path.join(__dirname, "client/dist")));

// After all other routes fail, serve index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});


// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

