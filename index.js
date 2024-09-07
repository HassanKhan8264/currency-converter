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
      return res.status(500).send('An error occurred while loading the page.');
    }
  });
};


app.get("/", serveIndexHtml); // Serve index.html for any route not handled by API
app.get("*", serveIndexHtml); // Serve index.html for any route not handled by API

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
