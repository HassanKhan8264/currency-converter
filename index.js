const express = require("express");
const currencyRouter = require("./server/currencyController");
const config = require("./server/config");
const cors = require("cors");
const path = require("path");
const fs = require('fs');
const app = express();

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

// Route to serve index.html
app.get("/", serveIndexHtml); 
app.get("*", serveIndexHtml);

// Start the server
const port = config.PORT || 3000; // Ensure fallback port for Vercel
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
