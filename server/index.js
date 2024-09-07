const express = require("express");
const currencyRouter = require("./currencyController");
const config = require("./config");
const cors = require("cors");
const path = require("path");
const app = express();

// Enable CORS
app.use(cors());

// API routes
app.use("/", currencyRouter);

// Correct path to Angular application
const angularAppPath = path.join(__dirname, "../client/dist/currency_converter");

// Serve static files from Angular build directory
app.use(express.static(angularAppPath));

// Serve index.html for all other routes to handle client-side routing
const serveIndexHtml = (req, res) => {
  const filePath = path.join(angularAppPath, "index.html");
  res.sendFile(filePath); // Correctly send index.html
};

app.get("*", serveIndexHtml); // Serve index.html for any route not handled by API

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
