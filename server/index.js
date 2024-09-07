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

// Serve the Angular application
const angularAppPath = path.join(__dirname, "client/dist");
app.use(express.static(angularAppPath));

// Serve index.html for all other routes
const serveIndexHtml = (req, res) => {
  const filePath = path.join(angularAppPath, "index.html");
  res.sendFile(filePath); // Correctly send index.html
};

app.get("/", serveIndexHtml);
app.get("*", serveIndexHtml);

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
