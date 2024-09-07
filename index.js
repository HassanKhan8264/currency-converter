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
const serveIndexHtml = async (req, res) => {
  try {
    const filePath = path.join(angularAppPath, "index.html");
    const htmlData = await fs.promises.readFile(filePath, 'utf8');
    res.send(htmlData);
  } catch (err) {
    console.error('Error reading index.html:', err);
    res.status(500).send('An error occurred while loading the page.');
  }
};


app.get("/", serveIndexHtml); // Serve index.html for root route
app.get("*", serveIndexHtml); // Serve index.html for any other route

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
