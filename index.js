const express = require("express");
const currencyRouter = require("./server/currencyController");
const config = require("./server/config");
const cors = require("cors");
const path = require("path");
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
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).send(err); // Handle any errors sending the file
    }
  });
};


app.get("/", serveIndexHtml); // Serve index.html for any route not handled by API
app.get("*", serveIndexHtml); // Serve index.html for any route not handled by API

// Start the server
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
