const express = require("express");
const currencyRouter = require("./server/currencyController");
const config = require("./server/config");
const cors = require("cors");
const path = require("path");
const app = express();
const fs = require('fs');

// Enable CORS
app.use(cors());

// API routes
app.use("/", currencyRouter);

// Correct path to Angular application
const angularAppPath = path.join(__dirname, "./client/dist");
app.use(express.static(angularAppPath));

// Serve index.html for all other routes to handle client-side routing
const serveIndexHtml = (req, res) => {
  const filePath = path.join(angularAppPath, "index.html");
  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('Error reading index.html:', err);
      return res.status(500).send('An error occurred while loading the page.');
    }
    res.send(htmlData); // Send the HTML content as the response
  });
};

app.get("/", serveIndexHtml); // Serve index.html for root route
app.get("*", serveIndexHtml); // Serve index.html for any other route

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
